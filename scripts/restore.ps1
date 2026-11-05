<#
.SYNOPSIS
    vPC - remet Windows comme avant l'installation.

.DESCRIPTION
    Relit la sauvegarde faite par install.ps1 (%LOCALAPPDATA%\vPC\sauvegarde) et remet
    les réglages d'origine : thème, couleurs, barre des tâches, fond d'écran, curseurs,
    thème du menu clic droit. Propose ensuite de désinstaller les applications ajoutées.

.PARAMETER Auto
    Ne pose pas de questions (les applications installées sont conservées).
#>
[CmdletBinding()]
param([switch]$Auto)

. (Join-Path $PSScriptRoot 'common.ps1')
$script:AutoMode = [bool]$Auto

try {
    Write-Banner 'Restauration des réglages d''origine'
    Assert-Windows
    if (-not (Import-Backup)) {
        Write-Warn "Aucune sauvegarde vPC trouvée ($script:BackupFile)."
        Write-Host '  Il n''y a rien à restaurer.'
        return
    }
    Write-Host "  Sauvegarde du $($script:BackupMeta.created)" -ForegroundColor DarkGray
    if (-not (Ask-YesNo 'Remettre tous les réglages comme avant vPC ?')) { return }

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
    Write-Ok "$ok réglage(s) remis comme avant"
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
    if ($wallpaper -and [VPC.Native]::SystemParametersInfo($script:SPI_SETDESKWALLPAPER, 0, $wallpaper, $script:SPIF_UPDATE_AND_SEND)) {
        Write-Ok "Fond d'écran d'origine remis"
    } elseif ($script:BackupRegistry.Contains('Control Panel\Desktop|WallPaper')) {
        Write-Warn "Fond d'écran d'origine introuvable : choisis-en un dans Paramètres > Personnalisation."
    }

    # ---- Curseurs ---------------------------------------------------------
    [void][VPC.Native]::SystemParametersInfo($script:SPI_SETCURSORS, 0, $null, $script:SPIF_UPDATE_AND_SEND)
    Write-Ok 'Curseurs d''origine remis'

    # ---- Menu clic droit --------------------------------------------------
    $theme  = $script:BackupMeta.nilesoftTheme
    $target = $script:BackupMeta.nilesoftTarget
    if ($theme -and $target -and (Test-Path -LiteralPath $theme) -and (Test-Path -LiteralPath $target)) {
        Write-Step 'Remise du thème Nilesoft d''origine (fenêtre administrateur)...'
        if (Copy-FileElevated $theme $target) { Write-Ok 'Thème du menu clic droit remis' }
        else { Write-Warn "Copie refusée : copie à la main $theme vers $target" }
    }

    # ---- Applications -----------------------------------------------------
    $packages = @($script:BackupMeta.installedPackages)
    $remaining = @()
    if ($packages.Count -gt 0) {
        Write-Title 'Applications installées par vPC'
        $packages | ForEach-Object { Write-Host "   - $_" }
        if ((Test-Winget) -and (Ask-YesNo 'Les désinstaller aussi ?' $false)) {
            foreach ($id in $packages) {
                Write-Step "Désinstallation de $id..."
                & winget uninstall --id $id --exact --silent --accept-source-agreements | Out-Host
                if ($LASTEXITCODE -eq 0) { Write-Ok "$id désinstallé" }
                else { Write-Warn "$id : à désinstaller à la main (Paramètres > Applications)."; $remaining += $id }
            }
        } else {
            $remaining = $packages
            Write-Host '  Applications conservées (désinstallables via Paramètres > Applications).' -ForegroundColor DarkGray
        }
    }

    # ---- Finitions --------------------------------------------------------
    Send-SettingChange
    Restart-Explorer

    # La sauvegarde est archivée : une prochaine installation repartira de l'état actuel.
    $stamp = Get-Date -Format 'yyyyMMdd-HHmmss'
    Rename-Item -LiteralPath $script:BackupFile -NewName "sauvegarde-restauree-$stamp.json" -ErrorAction SilentlyContinue
    if ($remaining.Count -gt 0) {
        # On garde la trace des applis encore présentes pour une prochaine restauration.
        $script:BackupRegistry = [ordered]@{}
        $script:BackupMeta.wallpaperCopy = $null
        $script:BackupMeta.nilesoftTheme = $null
        $script:BackupMeta.nilesoftTarget = $null
        $script:BackupMeta.installedPackages = $remaining
        Save-Backup
    }
    foreach ($dir in @('curseurs', 'fonds')) {
        Remove-Item -LiteralPath (Join-Path $script:StateDir $dir) -Recurse -Force -ErrorAction SilentlyContinue
    }

    Write-Title 'Terminé'
    Write-Host '  Windows est revenu à son apparence d''avant vPC.'
    Write-Host '  Si une couleur paraît encore bizarre, déconnecte-toi puis reconnecte-toi.'
    Write-Host ''
} catch {
    Write-Host ''
    Write-Err $_.Exception.Message
    exit 1
}
