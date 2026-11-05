<#
.SYNOPSIS
    vPC - donne à Windows 10/11 un look façon macOS.

.DESCRIPTION
    Applique, au choix :
      - mode sombre/clair, accent bleu Apple, transparence, barre des tâches épurée
      - un fond d'écran vPC
      - les curseurs macOS (projet open source apple_cursor)
      - un menu clic droit façon macOS (Nilesoft Shell)
      - une barre de menus en haut + un dock en bas (Seelen UI)
      - l'aperçu rapide avec la barre Espace (QuickLook)
      - une recherche façon Spotlight (PowerToys)

    Tout ce qui est modifié est sauvegardé dans %LOCALAPPDATA%\vPC\sauvegarde
    et peut être annulé avec Restaurer.bat.

.PARAMETER Auto
    Accepte tous les choix par défaut sans poser de questions.

.PARAMETER Mode
    Sombre ou Clair (sinon la question est posée).
#>
[CmdletBinding()]
param(
    [switch]$Auto,
    [ValidateSet('Sombre', 'Clair')] [string]$Mode
)

. (Join-Path $PSScriptRoot 'common.ps1')
$script:AutoMode = [bool]$Auto

# --------------------------------------------------------------------------
# Étapes
# --------------------------------------------------------------------------

function Get-RgbBytes([string]$Hex) {
    $h = $Hex.TrimStart('#')
    return , [byte[]]@([Convert]::ToByte($h.Substring(0, 2), 16),
                     [Convert]::ToByte($h.Substring(2, 2), 16),
                     [Convert]::ToByte($h.Substring(4, 2), 16))
}

function Get-Mix([byte[]]$Rgb, [byte[]]$Target, [double]$Amount) {
    $out = New-Object byte[] 3
    for ($i = 0; $i -lt 3; $i++) {
        $out[$i] = [byte][Math]::Round($Rgb[$i] + ($Target[$i] - $Rgb[$i]) * $Amount)
    }
    return , $out
}

function Get-Abgr([byte[]]$Rgb) {
    # Format DWORD utilisé par Windows pour les couleurs d'accent : 0xAABBGGRR
    return [BitConverter]::ToInt32([byte[]]@($Rgb[0], $Rgb[1], $Rgb[2], 0xFF), 0)
}

function Set-AppleTheme([bool]$Dark) {
    Write-Title 'Thème, couleurs et barre des tâches'

    $personalize = 'Software\Microsoft\Windows\CurrentVersion\Themes\Personalize'
    Set-UserReg $personalize 'AppsUseLightTheme'    ([int](-not $Dark))
    Set-UserReg $personalize 'SystemUsesLightTheme' ([int](-not $Dark))
    Set-UserReg $personalize 'EnableTransparency'   1
    Set-UserReg $personalize 'ColorPrevalence'      0      # pas de couleur d'accent sur Démarrer / barre des tâches
    Write-Ok ("Mode {0} + effets de transparence" -f $(if ($Dark) { 'sombre' } else { 'clair' }))

    # Accent bleu macOS (#007AFF) et ses nuances.
    $blue   = Get-RgbBytes '#007AFF'
    $white  = [byte[]]@(255, 255, 255)
    $black  = [byte[]]@(0, 0, 0)
    $shades = @(
        (Get-Mix $blue $white 0.55), (Get-Mix $blue $white 0.35), (Get-Mix $blue $white 0.18),
        $blue,
        (Get-Mix $blue $black 0.15), (Get-Mix $blue $black 0.38), (Get-Mix $blue $black 0.60),
        (Get-RgbBytes '#FF9F0A')
    )
    $palette = New-Object System.Collections.Generic.List[byte]
    foreach ($s in $shades) { $palette.AddRange([byte[]]$s); $palette.Add(0) }

    $accent = 'Software\Microsoft\Windows\CurrentVersion\Explorer\Accent'
    Set-UserReg $accent 'AccentPalette'    ([byte[]]$palette.ToArray()) ([Microsoft.Win32.RegistryValueKind]::Binary)
    Set-UserReg $accent 'AccentColorMenu'  (Get-Abgr $blue)
    Set-UserReg $accent 'StartColorMenu'   (Get-Abgr $shades[5])

    $dwm = 'Software\Microsoft\Windows\DWM'
    $argb = [BitConverter]::ToInt32([byte[]]@($blue[2], $blue[1], $blue[0], 0xC4), 0)   # 0xAARRGGBB
    Set-UserReg $dwm 'AccentColor'           (Get-Abgr $blue)
    Set-UserReg $dwm 'ColorizationColor'     $argb
    Set-UserReg $dwm 'ColorizationAfterglow' $argb
    Set-UserReg $dwm 'ColorPrevalence'       0                # barres de titre neutres, comme sur Mac
    Try-SetUserReg 'Control Panel\Desktop' 'AutoColorization' 0 | Out-Null
    Write-Ok "Couleur d'accent bleu Apple"

    # Barre des tâches épurée (utile aussi si tu n'installes pas le dock).
    $advanced = 'Software\Microsoft\Windows\CurrentVersion\Explorer\Advanced'
    Try-SetUserReg 'Software\Microsoft\Windows\CurrentVersion\Search' 'SearchboxTaskbarMode' 0 | Out-Null
    Try-SetUserReg $advanced 'ShowTaskViewButton' 0 | Out-Null
    Try-SetUserReg $advanced 'ShowCopilotButton'  0 | Out-Null
    if (Test-Windows11) {
        Try-SetUserReg $advanced 'TaskbarAl' 1 | Out-Null     # icônes centrées
        Try-SetUserReg $advanced 'TaskbarMn' 0 | Out-Null     # bouton Conversation
        if (-not (Try-SetUserReg $advanced 'TaskbarDa' 0)) {  # Widgets (parfois verrouillé par Windows)
            Write-Warn 'Bouton Widgets : verrouillé par Windows. Retire-le à la main (clic droit sur la barre des tâches > Paramètres).'
        }
    } else {
        Try-SetUserReg 'Software\Microsoft\Windows\CurrentVersion\Feeds' 'ShellFeedsTaskbarViewMode' 2 | Out-Null
    }
    Write-Ok 'Barre des tâches épurée (recherche, vue des tâches et widgets masqués)'
}

function Set-VpcWallpaper([string]$FileName) {
    Write-Title "Fond d'écran"
    $source = Join-Path $script:RepoRoot "wallpapers\$FileName"
    if (-not (Test-Path -LiteralPath $source)) { throw "Fichier introuvable : $source" }

    $dir = Join-Path $script:StateDir 'fonds'
    New-Item -ItemType Directory -Path $dir -Force | Out-Null
    $dest = Join-Path $dir $FileName
    Copy-Item -LiteralPath $source -Destination $dest -Force

    # Copie de sécurité du fond actuel (une seule fois).
    $transcoded = Join-Path $env:APPDATA 'Microsoft\Windows\Themes\TranscodedWallpaper'
    if (-not $script:BackupMeta.wallpaperCopy -and (Test-Path -LiteralPath $transcoded)) {
        New-Item -ItemType Directory -Path $script:BackupDir -Force | Out-Null
        $copy = Join-Path $script:BackupDir 'fond-original.jpg'
        Copy-Item -LiteralPath $transcoded -Destination $copy -Force
        $script:BackupMeta.wallpaperCopy = $copy
        Save-Backup
    }

    $desktop = 'Control Panel\Desktop'
    Save-RegOriginal $desktop 'WallPaper'
    Set-UserReg $desktop 'WallpaperStyle' '10' ([Microsoft.Win32.RegistryValueKind]::String)   # Remplir
    Set-UserReg $desktop 'TileWallpaper'  '0'  ([Microsoft.Win32.RegistryValueKind]::String)
    if (-not [VPC.Native]::SystemParametersInfo($script:SPI_SETDESKWALLPAPER, 0, $dest, $script:SPIF_UPDATE_AND_SEND)) {
        throw "Windows a refusé de changer le fond d'écran."
    }
    Write-Ok "Fond d'écran appliqué ($FileName)"
}

function Install-MacCursors {
    Write-Title 'Curseurs macOS'
    $urls = @(
        'https://github.com/ful1e5/apple_cursor/releases/download/v2.0.1/macOS-Windows.zip',
        'https://github.com/ful1e5/apple_cursor/releases/latest/download/macOS-Windows.zip'
    )
    $tmp = Join-Path $env:TEMP ('vpc-curseurs-' + [Guid]::NewGuid().ToString('N'))
    New-Item -ItemType Directory -Path $tmp -Force | Out-Null
    try {
        [Net.ServicePointManager]::SecurityProtocol = [Net.ServicePointManager]::SecurityProtocol -bor [Net.SecurityProtocolType]::Tls12
        $zip = Join-Path $tmp 'macOS-Windows.zip'
        $downloaded = $false
        foreach ($url in $urls) {
            try {
                Write-Step 'Téléchargement des curseurs (github.com/ful1e5/apple_cursor)...'
                Invoke-WebRequest -Uri $url -OutFile $zip -UseBasicParsing
                $downloaded = $true
                break
            } catch { Write-Warn "Échec avec $url" }
        }
        if (-not $downloaded) { throw 'Impossible de télécharger les curseurs (connexion internet ?).' }

        $extract = Join-Path $tmp 'x'
        Expand-Archive -LiteralPath $zip -DestinationPath $extract -Force
        $folder = Get-ChildItem -LiteralPath $extract -Directory -Recurse |
            Where-Object { $_.Name -eq 'macOS-Regular-Windows' } | Select-Object -First 1
        if (-not $folder) {
            $folder = Get-ChildItem -LiteralPath $extract -Directory -Recurse |
                Where-Object { Get-ChildItem -LiteralPath $_.FullName -Filter '*.cur' -File } | Select-Object -First 1
        }
        if (-not $folder) { throw "Archive de curseurs inattendue : aucun fichier .cur trouvé." }

        $dest = Join-Path $script:StateDir 'curseurs\macOS'
        New-Item -ItemType Directory -Path $dest -Force | Out-Null
        Get-ChildItem -LiteralPath $folder.FullName -File |
            Where-Object { $_.Extension -in '.cur', '.ani' } |
            Copy-Item -Destination $dest -Force

        # Rôle Windows -> nom du fichier dans l'archive apple_cursor
        $map = [ordered]@{
            Arrow       = @('Pointer');       Help      = @('Help')
            AppStarting = @('Work');          Wait      = @('Busy')
            Crosshair   = @('Cross');         IBeam     = @('Text')
            NWPen       = @('Handwriting');   No        = @('Unavailiable', 'Unavailable')
            SizeNS      = @('Vert');          SizeWE    = @('Horz')
            SizeNWSE    = @('Dng1', 'Dgn1');  SizeNESW  = @('Dng2', 'Dgn2')
            SizeAll     = @('Move');          UpArrow   = @('Alternate')
            Hand        = @('Link');          Pin       = @('Pin')
            Person      = @('Person')
        }
        $files = Get-ChildItem -LiteralPath $dest -File
        $cursors = 'Control Panel\Cursors'
        $count = 0
        foreach ($role in $map.Keys) {
            $file = $null
            foreach ($name in $map[$role]) {
                $file = $files | Where-Object { $_.BaseName -eq $name } | Select-Object -First 1
                if ($file) { break }
            }
            if ($file) {
                Set-UserReg $cursors $role $file.FullName ([Microsoft.Win32.RegistryValueKind]::ExpandString)
                $count++
            }
        }
        if ($count -eq 0) { throw 'Aucun curseur reconnu dans l archive.' }
        Set-UserReg $cursors ''              'macOS (vPC)' ([Microsoft.Win32.RegistryValueKind]::String)
        Set-UserReg $cursors 'Scheme Source' 1
        [void][VPC.Native]::SystemParametersInfo($script:SPI_SETCURSORS, 0, $null, $script:SPIF_UPDATE_AND_SEND)
        Write-Ok "Curseurs macOS appliqués ($count curseurs)"
    } finally {
        Remove-Item -LiteralPath $tmp -Recurse -Force -ErrorAction SilentlyContinue
    }
}

function Install-WingetPackage([string]$Id, [string]$Label) {
    if (Test-PackageInstalled $Id) {
        Write-Ok "$Label est déjà installé"
        return $true
    }
    Write-Step "Installation de $Label (winget)... une fenêtre de confirmation Windows peut s'ouvrir."
    # | Out-Host : la sortie de winget s'affiche sans polluer la valeur renvoyée par la fonction.
    & winget install --id $Id --exact --source winget --silent --accept-package-agreements --accept-source-agreements | Out-Host
    $code = $LASTEXITCODE
    if ($code -eq 0 -or (Test-PackageInstalled $Id)) {
        if ($script:BackupMeta.installedPackages -notcontains $Id) {
            $script:BackupMeta.installedPackages = @($script:BackupMeta.installedPackages) + $Id
            Save-Backup
        }
        Write-Ok "$Label installé"
        return $true
    }
    Write-Err ("Échec de l'installation de $Label (code winget {0})." -f $code)
    return $false
}

function Install-MacContextMenu {
    Write-Title 'Menu clic droit façon macOS (Nilesoft Shell)'
    if (-not (Install-WingetPackage 'Nilesoft.Shell' 'Nilesoft Shell')) { return $false }

    $dir = Find-NilesoftDir
    if (-not $dir) {
        Write-Warn "Nilesoft Shell est installé mais son dossier est introuvable : thème non appliqué."
        return $false
    }
    $target = Join-Path $dir 'imports\theme.nss'
    if (-not (Test-Path -LiteralPath $target)) {
        Write-Warn "Fichier $target absent (version de Nilesoft inattendue) : thème non appliqué."
        return $false
    }

    # Sauvegarde du thème d'origine (une seule fois).
    if (-not $script:BackupMeta.nilesoftTheme) {
        New-Item -ItemType Directory -Path $script:BackupDir -Force | Out-Null
        $copy = Join-Path $script:BackupDir 'nilesoft-theme.nss'
        Copy-Item -LiteralPath $target -Destination $copy -Force
        $script:BackupMeta.nilesoftTheme = $copy
        $script:BackupMeta.nilesoftTarget = $target
        Save-Backup
    }

    $source = Join-Path $script:RepoRoot 'config\nilesoft\theme.nss'
    Write-Step 'Copie du thème macOS (fenêtre administrateur)...'
    if (Copy-FileElevated $source $target) {
        Write-Ok 'Menu clic droit macOS appliqué'
        return $true
    }
    Write-Warn "Copie refusée. Tu peux copier à la main config\nilesoft\theme.nss vers $target"
    return $false
}

# --------------------------------------------------------------------------
# Programme principal
# --------------------------------------------------------------------------

try {
    Write-Banner 'Un Windows qui ressemble à macOS'
    Assert-Windows
    [void](Import-Backup)
    $isWin11 = Test-Windows11
    Write-Host ('  Système détecté : Windows {0} (build {1})' -f $(if ($isWin11) { '11' } else { '10' }), [Environment]::OSVersion.Version.Build) -ForegroundColor DarkGray

    # ---- Questions --------------------------------------------------------
    Write-Title 'Tes choix'
    if ($Mode) { $dark = ($Mode -eq 'Sombre') }
    else { $dark = ((Ask-Choice 'Apparence :' @('Sombre (conseillé)', 'Clair') 1) -eq 1) }

    $wallpapers = @(
        @{ File = 'vpc-nuit.jpg';   Label = 'Nuit   - vagues violettes' },
        @{ File = 'vpc-jour.jpg';   Label = 'Jour   - vagues pastel' },
        @{ File = 'vpc-aurore.jpg'; Label = 'Aurore - dégradé flou' }
    )

    $doTheme     = Ask-YesNo 'Thème : accent bleu Apple, transparence, barre des tâches épurée ?'
    $doWallpaper = Ask-YesNo "Changer le fond d'écran ?"
    $wallpaper   = $null
    if ($doWallpaper) {
        $defaultWp = if ($dark) { 1 } else { 2 }
        $wallpaper = $wallpapers[(Ask-Choice "Quel fond d'écran ?" ($wallpapers | ForEach-Object { $_.Label }) $defaultWp) - 1].File
    }
    $doCursors   = Ask-YesNo 'Curseurs de souris macOS ?'

    $hasWinget = Test-Winget
    $doMenu = $doDock = $doQuickLook = $doSpotlight = $false
    if ($hasWinget) {
        $doMenu      = Ask-YesNo 'Menu clic droit façon macOS (Nilesoft Shell) ?'
        $doDock      = Ask-YesNo 'Barre de menus en haut + dock en bas (Seelen UI) ?'
        $doQuickLook = Ask-YesNo "Aperçu rapide d'un fichier avec la barre Espace (QuickLook) ?"
        $doSpotlight = Ask-YesNo 'Recherche façon Spotlight (PowerToys, ~250 Mo) ?'
    } else {
        Write-Warn "winget est absent : les applications (dock, menu clic droit...) ne peuvent pas être installées."
        Write-Warn "Installe « Programme d'installation d'application » depuis le Microsoft Store puis relance vPC."
    }

    if (-not ($doTheme -or $doWallpaper -or $doCursors -or $doMenu -or $doDock -or $doQuickLook -or $doSpotlight)) {
        Write-Host ''
        Write-Host '  Rien à faire. À bientôt !'
        return
    }
    if (-not $script:AutoMode) {
        Write-Host ''
        if (-not (Ask-YesNo 'On y va ?')) { return }
    }

    # ---- Application ------------------------------------------------------
    $results = [ordered]@{}
    function Invoke-Step([string]$Name, [scriptblock]$Action) {
        try {
            $r = & $Action
            $results[$Name] = -not (@($r) -contains $false)
        } catch {
            Write-Err "$Name : $($_.Exception.Message)"
            $results[$Name] = $false
        }
    }

    if ($doTheme)     { Invoke-Step 'Thème'            { Set-AppleTheme $dark } }
    if ($doWallpaper) { Invoke-Step "Fond d'écran"     { Set-VpcWallpaper $wallpaper } }
    if ($doCursors)   { Invoke-Step 'Curseurs'         { Install-MacCursors } }
    if ($doMenu)      { Invoke-Step 'Menu clic droit'  { Install-MacContextMenu } }
    if ($doDock) {
        Invoke-Step 'Dock + barre de menus' {
            Write-Title 'Dock et barre de menus (Seelen UI)'
            Install-WingetPackage 'Seelen.SeelenUI' 'Seelen UI'
        }
    }
    if ($doQuickLook) {
        Invoke-Step 'Aperçu rapide' {
            Write-Title 'Aperçu rapide (QuickLook)'
            Install-WingetPackage 'QL-Win.QuickLook' 'QuickLook'
        }
    }
    if ($doSpotlight) {
        Invoke-Step 'Spotlight' {
            Write-Title 'Recherche façon Spotlight (PowerToys)'
            Install-WingetPackage 'Microsoft.PowerToys' 'PowerToys'
        }
    }

    Write-Title 'Finitions'
    Send-SettingChange
    if ($doTheme -or $doMenu) { Restart-Explorer }
    if ($doDock -and $results['Dock + barre de menus']) {
        if (Start-InstalledApp 'Seelen UI*') { Write-Ok 'Seelen UI lancé' }
        else { Write-Warn 'Lance « Seelen UI » depuis le menu Démarrer.' }
    }
    if ($doQuickLook -and $results['Aperçu rapide']) { [void](Start-InstalledApp 'QuickLook*') }
    if ($doSpotlight -and $results['Spotlight'])     { [void](Start-InstalledApp 'PowerToys*') }

    # ---- Résumé -----------------------------------------------------------
    Write-Title 'Résumé'
    foreach ($k in $results.Keys) {
        if ($results[$k]) { Write-Ok $k } else { Write-Err "$k (voir les messages plus haut)" }
    }
    Write-Host ''
    Write-Host '  Astuces :' -ForegroundColor Cyan
    if ($doQuickLook) { Write-Host '   - Sélectionne un fichier et appuie sur Espace pour un aperçu rapide.' }
    if ($doSpotlight) { Write-Host '   - Win + Alt + Espace ouvre la recherche PowerToys (Command Palette).' }
    if ($doDock)      { Write-Host '   - Clic droit sur le dock ou la barre du haut > Paramètres pour régler Seelen UI.' }
    Write-Host '   - Certaines couleurs ne changent complètement qu''après une déconnexion / reconnexion.'
    Write-Host '   - Pour tout annuler : double-clique sur Restaurer.bat.'
    Write-Host ''
} catch {
    Write-Host ''
    Write-Err $_.Exception.Message
    Write-Host '  Rien de grave : ce qui a déjà été modifié peut être annulé avec Restaurer.bat.' -ForegroundColor DarkGray
    exit 1
}
