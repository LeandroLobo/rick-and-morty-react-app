param(
  [Parameter(Mandatory = $true)]
  [string]$SourceApkPath
)

$appJsonPath = Join-Path $PSScriptRoot "..\\app.json"
$appJsonPath = [System.IO.Path]::GetFullPath($appJsonPath)
$appConfig = Get-Content -LiteralPath $appJsonPath -Raw | ConvertFrom-Json
$version = $appConfig.expo.version

if ([string]::IsNullOrWhiteSpace($version)) {
  throw "Version not found in app.json"
}

$destinationDir = Join-Path $PSScriptRoot "..\\.workspace\\apks"
$destinationDir = [System.IO.Path]::GetFullPath($destinationDir)
$destinationFile = Join-Path $destinationDir ("rickandmortywiki_v_{0}.apk" -f $version)

if (-not (Test-Path -LiteralPath $SourceApkPath)) {
  throw "APK not found: $SourceApkPath"
}

New-Item -ItemType Directory -Force -Path $destinationDir | Out-Null
Copy-Item -LiteralPath $SourceApkPath -Destination $destinationFile -Force

Write-Output "Saved APK to: $destinationFile"
