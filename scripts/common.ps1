# vPC - fonctions partagées par install.ps1 et restore.ps1
# Ce fichier est chargé avec ". $PSScriptRoot\common.ps1" ; il ne fait rien tout seul.

$ErrorActionPreference = 'Stop'
$ProgressPreference = 'SilentlyContinue'   # sinon Invoke-WebRequest est très lent sous PowerShell 5.1
# winget écrit en UTF-8 : sans ça, ses messages accentués s'affichent mal dans PowerShell 5.1.
try { [Console]::OutputEncoding = New-Object System.Text.UTF8Encoding $false } catch { }

$script:RepoRoot   = Split-Path -Parent $PSScriptRoot
$script:StateDir   = Join-Path $env:LOCALAPPDATA 'vPC'
$script:BackupDir  = Join-Path $script:StateDir 'sauvegarde'
$script:BackupFile = Join-Path $script:BackupDir 'sauvegarde.json'

# --------------------------------------------------------------------------
# Affichage
# --------------------------------------------------------------------------

function Write-Banner([string]$Subtitle) {
    Write-Host ''
    Write-Host '   __   __  ____    ____ ' -ForegroundColor Cyan
    Write-Host '   \ \ / / |  _ \  / ___|' -ForegroundColor Cyan
    Write-Host '    \ V /  | |_) || |    ' -ForegroundColor Cyan
    Write-Host '     \_/   |  __/ | |___ ' -ForegroundColor Cyan
    Write-Host '           |_|     \____|' -ForegroundColor Cyan
    Write-Host ''
    Write-Host "   $Subtitle" -ForegroundColor White
    Write-Host ''
}

function Write-Title([string]$Text) {
    Write-Host ''
    Write-Host "  $Text" -ForegroundColor Cyan
    Write-Host ('  ' + ('-' * $Text.Length)) -ForegroundColor DarkGray
}

function Write-Step([string]$Text) { Write-Host "  -> $Text" -ForegroundColor Gray }
function Write-Ok([string]$Text)   { Write-Host "  [OK] $Text" -ForegroundColor Green }
function Write-Warn([string]$Text) { Write-Host "  [!]  $Text" -ForegroundColor Yellow }
function Write-Err([string]$Text)  { Write-Host "  [X]  $Text" -ForegroundColor Red }

function Ask-YesNo([string]$Question, [bool]$Default = $true) {
    if ($script:AutoMode) { return $Default }
    $hint = if ($Default) { '[O/n]' } else { '[o/N]' }
    while ($true) {
        $answer = Read-Host "  $Question $hint"
        if ([string]::IsNullOrWhiteSpace($answer)) { return $Default }
        switch -Regex ($answer.Trim().ToLowerInvariant()) {
            '^(o|oui|y|yes)$' { return $true }
            '^(n|non|no)$'    { return $false }
        }
        Write-Host '  Réponds par o (oui) ou n (non).' -ForegroundColor DarkGray
    }
}

function Ask-Choice([string]$Question, [string[]]$Options, [int]$Default = 1) {
    if ($script:AutoMode) { return $Default }
    Write-Host "  $Question"
    for ($i = 0; $i -lt $Options.Count; $i++) {
        Write-Host ('     {0}. {1}' -f ($i + 1), $Options[$i])
    }
    while ($true) {
        $answer = Read-Host "  Ton choix [$Default]"
        if ([string]::IsNullOrWhiteSpace($answer)) { return $Default }
        $n = 0
        if ([int]::TryParse($answer.Trim(), [ref]$n) -and $n -ge 1 -and $n -le $Options.Count) { return $n }
        Write-Host "  Tape un chiffre entre 1 et $($Options.Count)." -ForegroundColor DarkGray
    }
}

# --------------------------------------------------------------------------
# Windows
# --------------------------------------------------------------------------

function Assert-Windows {
    if ($env:OS -ne 'Windows_NT') { throw 'vPC fonctionne uniquement sous Windows 10 ou 11.' }
    $build = [Environment]::OSVersion.Version.Build
    if ($build -lt 17763) { throw "Windows trop ancien (build $build). Il faut Windows 10 version 1809 ou plus récent." }
}

function Test-Windows11 { return ([Environment]::OSVersion.Version.Build -ge 22000) }

if (-not ('VPC.Native' -as [type])) {
    Add-Type -Namespace VPC -Name Native -MemberDefinition @'
[DllImport("user32.dll", CharSet = CharSet.Unicode, SetLastError = true)]
public static extern bool SystemParametersInfo(uint uiAction, uint uiParam, string pvParam, uint fWinIni);

[DllImport("user32.dll", CharSet = CharSet.Unicode, SetLastError = true)]
public static extern IntPtr SendMessageTimeout(IntPtr hWnd, uint Msg, UIntPtr wParam, string lParam,
                                               uint fuFlags, uint uTimeout, out UIntPtr lpdwResult);
'@
}

$script:SPI_SETDESKWALLPAPER = 0x0014
$script:SPI_SETCURSORS       = 0x0057
$script:SPIF_UPDATE_AND_SEND = 0x03     # SPIF_UPDATEINIFILE | SPIF_SENDCHANGE

function Send-SettingChange {
    # Prévient les applications que le thème / les couleurs ont changé.
    $result = [UIntPtr]::Zero
    foreach ($area in @('ImmersiveColorSet', 'WindowsThemeElement', $null)) {
        [void][VPC.Native]::SendMessageTimeout([IntPtr]0xffff, 0x001A, [UIntPtr]::Zero, $area, 0x0002, 3000, [ref]$result)
    }
}

function Restart-Explorer {
    Write-Step "Redémarrage de l'Explorateur Windows (l'écran va clignoter une seconde)..."
    Get-Process -Name explorer -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
    # Windows relance l'Explorateur tout seul ; on ne le relance nous-mêmes que s'il ne revient pas.
    for ($i = 0; $i -lt 20; $i++) {
        Start-Sleep -Milliseconds 500
        if (Get-Process -Name explorer -ErrorAction SilentlyContinue) { return }
    }
    Start-Process -FilePath (Join-Path $env:WINDIR 'explorer.exe')
}

function Invoke-Elevated([string]$Command) {
    # Lance une petite commande PowerShell en administrateur (une fenêtre UAC s'affiche).
    # Renvoie le code de sortie, ou -1 si l'utilisateur a refusé.
    $encoded = [Convert]::ToBase64String([Text.Encoding]::Unicode.GetBytes($Command))
    try {
        $p = Start-Process -FilePath 'powershell.exe' -Verb RunAs -WindowStyle Hidden -Wait -PassThru `
            -ArgumentList @('-NoProfile', '-ExecutionPolicy', 'Bypass', '-EncodedCommand', $encoded)
        return $p.ExitCode
    } catch {
        return -1
    }
}

function ConvertTo-PSLiteral([string]$Text) { return "'" + ($Text -replace "'", "''") + "'" }

function Copy-FileElevated([string]$Source, [string]$Destination) {
    $cmd = "try { Copy-Item -LiteralPath $(ConvertTo-PSLiteral $Source) -Destination $(ConvertTo-PSLiteral $Destination) -Force -ErrorAction Stop; exit 0 } catch { exit 1 }"
    return ((Invoke-Elevated $cmd) -eq 0)
}

# --------------------------------------------------------------------------
# Sauvegarde (pour pouvoir tout annuler avec Restaurer.bat)
# --------------------------------------------------------------------------

$script:BackupRegistry = [ordered]@{}
$script:BackupMeta = @{
    created           = (Get-Date).ToString('s')
    wallpaperCopy     = $null
    nilesoftTheme     = $null
    nilesoftTarget    = $null
    installedPackages = @()
}

function Import-Backup {
    if (-not (Test-Path -LiteralPath $script:BackupFile)) { return $false }
    $data = Get-Content -LiteralPath $script:BackupFile -Raw -Encoding UTF8 | ConvertFrom-Json
    foreach ($entry in @($data.registry | Where-Object { $_ })) {
        $script:BackupRegistry["$($entry.subKey)|$($entry.name)"] = $entry
    }
    if ($data.created)        { $script:BackupMeta.created = $data.created }
    if ($data.wallpaperCopy)  { $script:BackupMeta.wallpaperCopy = $data.wallpaperCopy }
    if ($data.nilesoftTheme)  { $script:BackupMeta.nilesoftTheme = $data.nilesoftTheme }
    if ($data.nilesoftTarget) { $script:BackupMeta.nilesoftTarget = $data.nilesoftTarget }
    $script:BackupMeta.installedPackages = @($data.installedPackages | Where-Object { $_ })
    return $true
}

function Save-Backup {
    if (-not (Test-Path -LiteralPath $script:BackupDir)) {
        New-Item -ItemType Directory -Path $script:BackupDir -Force | Out-Null
    }
    $obj = [ordered]@{
        created           = $script:BackupMeta.created
        registry          = @($script:BackupRegistry.Values)
        wallpaperCopy     = $script:BackupMeta.wallpaperCopy
        nilesoftTheme     = $script:BackupMeta.nilesoftTheme
        nilesoftTarget    = $script:BackupMeta.nilesoftTarget
        installedPackages = @($script:BackupMeta.installedPackages)
    }
    $obj | ConvertTo-Json -Depth 6 | Set-Content -LiteralPath $script:BackupFile -Encoding UTF8
}

function Save-RegOriginal([string]$SubKey, [string]$Name) {
    # Mémorise la valeur d'origine (une seule fois : relancer l'installateur ne l'écrase pas).
    $id = "$SubKey|$Name"
    if ($script:BackupRegistry.Contains($id)) { return }
    $entry = [ordered]@{ subKey = $SubKey; name = $Name; exists = $false; kind = $null; value = $null }
    $key = [Microsoft.Win32.Registry]::CurrentUser.OpenSubKey($SubKey)
    if ($key) {
        try {
            if ($key.GetValueNames() -contains $Name) {
                $kind = $key.GetValueKind($Name)
                $value = $key.GetValue($Name, $null, [Microsoft.Win32.RegistryValueOptions]::DoNotExpandEnvironmentNames)
                if ($kind -eq [Microsoft.Win32.RegistryValueKind]::Binary) {
                    $value = [Convert]::ToBase64String([byte[]]$value)
                }
                $entry.exists = $true
                $entry.kind = $kind.ToString()
                $entry.value = $value
            }
        } finally { $key.Close() }
    }
    $script:BackupRegistry[$id] = [pscustomobject]$entry
    Save-Backup
}

function ConvertTo-DWord($Value) {
    # Les DWORD > 0x7FFFFFFF doivent être passés en Int32 négatif à l'API .NET.
    $n = [long]$Value
    if ($n -lt 0) { return [int]$n }
    return [BitConverter]::ToInt32([BitConverter]::GetBytes([uint32]$n), 0)
}

function Set-UserReg {
    param(
        [Parameter(Mandatory)] [string]$SubKey,
        [Parameter(Mandatory)] [AllowEmptyString()] [string]$Name,
        [Parameter(Mandatory)] $Value,
        [Microsoft.Win32.RegistryValueKind]$Kind = [Microsoft.Win32.RegistryValueKind]::DWord
    )
    Save-RegOriginal $SubKey $Name
    if ($Kind -eq [Microsoft.Win32.RegistryValueKind]::DWord) { $Value = ConvertTo-DWord $Value }
    $key = [Microsoft.Win32.Registry]::CurrentUser.CreateSubKey($SubKey)
    try { $key.SetValue($Name, $Value, $Kind) } finally { $key.Close() }
}

function Try-SetUserReg {
    # Même chose, mais certaines valeurs sont verrouillées par Windows : on ignore l'erreur.
    param([string]$SubKey, [string]$Name, $Value,
          [Microsoft.Win32.RegistryValueKind]$Kind = [Microsoft.Win32.RegistryValueKind]::DWord)
    try { Set-UserReg -SubKey $SubKey -Name $Name -Value $Value -Kind $Kind; return $true }
    catch { return $false }
}

# --------------------------------------------------------------------------
# Applications (winget)
# --------------------------------------------------------------------------

# Applications que vPC peut installer (utilisé par la restauration pour les retirer).
$script:VpcApps = @(
    [pscustomobject]@{ Id = 'Seelen.SeelenUI';     Name = 'Seelen UI (dock + barre du haut)';     Processes = @('seelen-ui', 'slu') }
    [pscustomobject]@{ Id = 'Nilesoft.Shell';      Name = 'Nilesoft Shell (menu clic droit)';     Processes = @() }
    [pscustomobject]@{ Id = 'QL-Win.QuickLook';    Name = 'QuickLook (aperçu avec Espace)';       Processes = @('QuickLook') }
    [pscustomobject]@{ Id = 'Microsoft.PowerToys'; Name = 'PowerToys (recherche, Peek, etc.)';    Processes = @() }
)

function Test-Winget { return [bool](Get-Command winget -ErrorAction SilentlyContinue) }

function Test-PackageInstalled([string]$Id) {
    & winget list --id $Id --exact --accept-source-agreements *> $null
    return ($LASTEXITCODE -eq 0)
}

function Start-InstalledApp([string]$NamePattern) {
    # Lance une application via son raccourci du menu Démarrer (marche pour les apps classiques et Store).
    for ($i = 0; $i -lt 10; $i++) {
        try {
            $app = Get-StartApps | Where-Object { $_.Name -like $NamePattern } | Select-Object -First 1
            if ($app) {
                Start-Process -FilePath "shell:AppsFolder\$($app.AppID)"
                return $true
            }
        } catch { }
        Start-Sleep -Seconds 1
    }
    return $false
}

function Show-NativeTaskbar {
    # Seelen UI met la barre des tâches Windows en « masquage automatique » et la cache.
    # Il ne la remet que s'il se ferme proprement : après une désinstallation, on la remet nous-mêmes.
    if (-not ('VPC.Taskbar' -as [type])) {
        Add-Type -TypeDefinition @'
using System;
using System.Runtime.InteropServices;
namespace VPC {
    public static class Taskbar {
        [StructLayout(LayoutKind.Sequential)]
        struct RECT { public int Left, Top, Right, Bottom; }

        [StructLayout(LayoutKind.Sequential)]
        struct APPBARDATA {
            public uint cbSize; public IntPtr hWnd; public uint uCallbackMessage;
            public uint uEdge; public RECT rc; public IntPtr lParam;
        }

        [DllImport("shell32.dll")]
        static extern UIntPtr SHAppBarMessage(uint dwMessage, ref APPBARDATA pData);
        [DllImport("user32.dll", CharSet = CharSet.Unicode)]
        static extern IntPtr FindWindowEx(IntPtr parent, IntPtr after, string cls, string title);
        [DllImport("user32.dll")]
        static extern bool ShowWindow(IntPtr hWnd, int nCmdShow);

        public static int ShowAll() {
            const uint ABM_SETSTATE = 0x0A;
            const int ABS_ALWAYSONTOP = 0x02;   // = pas de masquage automatique
            const int SW_SHOW = 5;
            int count = 0;
            foreach (string cls in new[] { "Shell_TrayWnd", "Shell_SecondaryTrayWnd" }) {
                IntPtr h = IntPtr.Zero;
                while ((h = FindWindowEx(IntPtr.Zero, h, cls, null)) != IntPtr.Zero) {
                    APPBARDATA d = new APPBARDATA();
                    d.cbSize = (uint)Marshal.SizeOf(typeof(APPBARDATA));
                    d.hWnd = h;
                    d.lParam = (IntPtr)ABS_ALWAYSONTOP;
                    SHAppBarMessage(ABM_SETSTATE, ref d);
                    ShowWindow(h, SW_SHOW);
                    count++;
                }
            }
            return count;
        }
    }
}
'@
    }
    return [VPC.Taskbar]::ShowAll()
}

function Remove-DesktopShortcut([string]$Name) {
    foreach ($folder in @([Environment]::GetFolderPath('Desktop'), [Environment]::GetFolderPath('CommonDesktopDirectory'))) {
        if (-not $folder) { continue }
        $lnk = Join-Path $folder "$Name.lnk"
        if (Test-Path -LiteralPath $lnk) { Remove-Item -LiteralPath $lnk -Force -ErrorAction SilentlyContinue }
    }
}

function Find-NilesoftDir {
    $candidates = New-Object System.Collections.Generic.List[string]
    foreach ($base in @($env:ProgramFiles, ${env:ProgramFiles(x86)}, $env:ProgramW6432)) {
        if ($base) { $candidates.Add((Join-Path $base 'Nilesoft Shell')) }
    }
    foreach ($root in @('HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall',
                        'HKLM:\SOFTWARE\WOW6432Node\Microsoft\Windows\CurrentVersion\Uninstall',
                        'HKCU:\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall')) {
        Get-ChildItem -Path $root -ErrorAction SilentlyContinue | ForEach-Object {
            $p = Get-ItemProperty -Path $_.PSPath -ErrorAction SilentlyContinue
            if ($p -and ($p.PSObject.Properties.Name -contains 'DisplayName') -and $p.DisplayName -like 'Nilesoft Shell*' -and
                ($p.PSObject.Properties.Name -contains 'InstallLocation') -and $p.InstallLocation) {
                $candidates.Add($p.InstallLocation.TrimEnd('\'))
            }
        }
    }
    foreach ($dir in $candidates) {
        if (Test-Path -LiteralPath (Join-Path $dir 'shell.nss')) { return $dir }
    }
    return $null
}
