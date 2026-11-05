<#
.SYNOPSIS
    vPC - remet Windows comme avant l'installation.

.DESCRIPTION
    1. Désinstalle les applications ajoutées par vPC (dock/barre du haut, menu clic droit,
       aperçu rapide, PowerToys). Une question par application ; par défaut « oui » pour
       celles que vPC a installées, « non » pour celles qui étaient peut-être déjà là.
    2. Remet les réglages d'origine sauvegardés par install.ps1 : thème, couleurs,
       barre des tâches, fond d'écran, curseurs, thème du menu clic droit.
    3. Réaffiche la barre des tâches Windows (Seelen UI la cache).

    On peut relancer ce script autant de fois que nécessaire.

.PARAMETER Auto
    Ne pose pas de questions : réponses par défaut partout.
#>
[CmdletBinding()]
param([switch]$Auto)

. (Join-Path $PSScriptRoot 'common.ps1')
$script:AutoMode = [bool]$Auto

function Restore-Settings {
    # ---- Registre ---------------------------------------------------------
    Write-Title 'Réglages Windows'
    $ok = 0; $failed = 0
    foreach ($e in $script:BackupRegistry.Values) {
        $key = $null
        try {
            $key = [Microsoft.Win32.Registry]::CurrentUser.CreateSubKey($e.subKey)
            if ($e.exists) {
                $kind = [Microsoft.Win32.RegistryValueKind]$e.kind
                if ($kind -eq [Microsoft.Win32.RegistryValueKind]::Binary) {
                    $value = [byte[]][Convert]::FromBase64String([string]$e.value)
                } elseif ($kind -eq [Microsoft.Win32.RegistryValueKind]::DWord) {
                    $value = ConvertTo-DWord $e.value
                } elseif ($kind -eq [Microsoft.Win32.RegistryValueKind]::QWord) {
                    $value = [long]$e.value
                } elseif ($kind -eq [Microsoft.Win32.RegistryValueKind]::MultiString) {
                    $value = [string[]]@($e.value)
                } else {
                    $value = [string]$e.value
                }
                $key.SetValue([string]$e.name, $value, $kind)
            } else {
                $key.DeleteValue([string]$e.name, $false)
            }
            $ok++
        } catch {
            $failed++
        } finally {
            if ($key) { $key.Close() }
        }
    }
    if ($ok)     { Write-Ok "$ok réglage(s) remis comme avant" }
    if ($failed) { Write-Warn "$failed réglage(s) verrouillé(s) par Windows n'ont pas pu être remis." }

    # ---- Fond d'écran -----------------------------------------------------
    $desktop = [Microsoft.Win32.Registry]::CurrentUser.OpenSubKey('Control Panel\Desktop')
    $original = if ($desktop) { [string]$desktop.GetValue('WallPaper', '') } else { '' }
    if ($desktop) { $desktop.Close() }
    $wallpaper = $null
    if ($original -and ($original -notlike '*TranscodedWallpaper*') -and (Test-Path -LiteralPath $original)) {
        $wallpaper = $original
    } elseif ($script:BackupMeta.wallpaperCopy -and (Test-Path -LiteralPath $script:BackupMeta.wallpaperCopy)) {
        $wallpaper = $script:BackupMeta.wallpaperCopy
    }
    if ($script:BackupRegistry.Contains('Control Panel\Desktop|WallPaper')) {
        if ($wallpaper -and [VPC.Native]::SystemParametersInfo($script:SPI_SETDESKWALLPAPER, 0, $wallpaper, $script:SPIF_UPDATE_AND_SEND)) {
            Write-Ok "Fond d'écran d'origine remis"
        } else {
            Write-Warn "Fond d'écran d'origine introuvable : choisis-en un dans Paramètres > Personnalisation."
        }
    }

    # ---- Curseurs ---------------------------------------------------------
    if ($script:BackupRegistry.Contains('Control Panel\Cursors|Arrow')) {
        [void][VPC.Native]::SystemParametersInfo($script:SPI_SETCURSORS, 0, $null, $script:SPIF_UPDATE_AND_SEND)
        Write-Ok 'Curseurs d''origine remis'
    }

    # ---- Thème du menu clic droit (si Nilesoft Shell est gardé) -----------
    $theme  = $script:BackupMeta.nilesoftTheme
    $target = $script:BackupMeta.nilesoftTarget
    if ($theme -and $target -and (Test-Path -LiteralPath $theme) -and (Test-Path -LiteralPath $target)) {
        Write-Step 'Remise du thème Nilesoft d''origine (fenêtre administrateur)...'
        if (Copy-FileElevated $theme $target) { Write-Ok 'Thème du menu clic droit remis' }
        else { Write-Warn "Copie refusée : copie à la main $theme vers $target" }
    }
}

try {
    Write-Banner 'Restauration : retour au Windows d''avant vPC'
    Assert-Windows
    $hasBackup = Import-Backup
    if ($hasBackup) {
        Write-Host "  Sauvegarde vPC du $($script:BackupMeta.created)" -ForegroundColor DarkGray
    } else {
        Write-Host '  Aucune sauvegarde de réglages trouvée : je vérifie seulement les applications.' -ForegroundColor DarkGray
    }
    $recorded = @($script:BackupMeta.installedPackages)

    # ---- Questions --------------------------------------------------------
    $hasSettings = $hasBackup -and ($script:BackupRegistry.Count -gt 0 -or $script:BackupMeta.wallpaperCopy -or $script:BackupMeta.nilesoftTheme)
    $restoreSettings = $false
    if ($hasSettings) {
        Write-Title 'Réglages'
        $restoreSettings = Ask-YesNo 'Remettre thème, couleurs, fond d''écran et curseurs comme avant vPC ?'
    }

    $installedNow = @()
    $toRemove = @()
    $appsChecked = Test-Winget
    Write-Title 'Applications'
    if ($appsChecked) {
        Write-Step 'Recherche des applications installées par vPC...'
        foreach ($app in $script:VpcApps) {
            if (-not (Test-PackageInstalled $app.Id)) { continue }
            $installedNow += $app.Id
            $byVpc = $recorded -contains $app.Id
            $question = if ($byVpc) { "Désinstaller $($app.Name) ?" }
                        else { "Désinstaller $($app.Name) ? (il était peut-être déjà là avant vPC)" }
            if (Ask-YesNo $question $byVpc) { $toRemove += $app }
        }
        if ($installedNow.Count -eq 0) { Write-Ok 'Aucune application vPC n''est installée.' }
    } else {
        Write-Warn 'winget est absent : désinstalle les applications à la main (Paramètres > Applications > Applications installées).'
    }

    if (-not $restoreSettings -and $toRemove.Count -eq 0) {
        Write-Host ''
        Write-Host '  Rien à faire.'
        return
    }

    # ---- Désinstallation --------------------------------------------------
    $removed = @()
    foreach ($app in $toRemove) {
        Write-Step "Désinstallation de $($app.Name)... une fenêtre de confirmation Windows peut s'ouvrir."
        foreach ($name in $app.Processes) {
            Get-Process -Name $name -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
        }
        & winget uninstall --id $app.Id --exact --silent --accept-source-agreements | Out-Host
        if (Test-PackageInstalled $app.Id) {
            Write-Warn "$($app.Name) est toujours là : désinstalle-le dans Paramètres > Applications > Applications installées."
        } else {
            Write-Ok "$($app.Name) désinstallé"
            $removed += $app.Id
        }
    }
    if ($removed -contains 'QL-Win.QuickLook') { Remove-DesktopShortcut 'QuickLook' }

    # ---- Réglages ---------------------------------------------------------
    if ($restoreSettings) { Restore-Settings }

    # ---- Finitions --------------------------------------------------------
    Write-Title 'Finitions'
    Send-SettingChange
    Restart-Explorer
    if ($removed -contains 'Seelen.SeelenUI') {
        Start-Sleep -Seconds 2
        if ((Show-NativeTaskbar) -gt 0) { Write-Ok 'Barre des tâches Windows réaffichée' }
        else { Write-Warn 'Barre des tâches introuvable : redémarre le PC.' }
    }

    # ---- Mise à jour de la sauvegarde -------------------------------------
    # On garde la trace des applis vPC encore installées, pour pouvoir relancer la restauration.
    $remaining = @($recorded | Where-Object { $removed -notcontains $_ -and (-not $appsChecked -or $installedNow -contains $_) })
    if ($hasBackup) {
        if ($restoreSettings) {
            $stamp = Get-Date -Format 'yyyyMMdd-HHmmss'
            Rename-Item -LiteralPath $script:BackupFile -NewName "sauvegarde-restauree-$stamp.json" -ErrorAction SilentlyContinue
            foreach ($dir in @('curseurs', 'fonds')) {
                Remove-Item -LiteralPath (Join-Path $script:StateDir $dir) -Recurse -Force -ErrorAction SilentlyContinue
            }
            if ($remaining.Count -gt 0) {
                $script:BackupRegistry = [ordered]@{}
                $script:BackupMeta.wallpaperCopy = $null
                $script:BackupMeta.nilesoftTheme = $null
                $script:BackupMeta.nilesoftTarget = $null
                $script:BackupMeta.installedPackages = $remaining
                Save-Backup
            }
        } else {
            $script:BackupMeta.installedPackages = $remaining
            Save-Backup
        }
    }

    Write-Title 'Terminé'
    Write-Host '  Windows est revenu à son apparence d''avant vPC.'
    if ($removed -contains 'Nilesoft.Shell') {
        Write-Host '  Si le menu clic droit n''a pas encore changé, redémarre le PC.'
    }
    Write-Host '  Si une couleur paraît encore bizarre, déconnecte-toi puis reconnecte-toi.'
    Write-Host ''
} catch {
    Write-Host ''
    Write-Err $_.Exception.Message
    exit 1
}
