<#
.SYNOPSIS
  PawConnect Local Web Server (PowerShell HttpListener)
  No external dependencies required (No Node.js / Python needed).
#>

$port = 8080
$rootPath = $PSScriptRoot

# Ensure port is open or find fallback
for ($i = 0; $i -lt 5; $i++) {
    try {
        $listener = New-Object System.Net.HttpListener
        $prefix = "http://localhost:$port/"
        $listener.Prefixes.Add($prefix)
        $listener.Start()
        break
    } catch {
        $port++
    }
}

if (-not $listener.IsListening) {
    Write-Host "Could not start server. Please check port permissions." -ForegroundColor Red
    exit 1
}

$url = "http://localhost:$port/"
Write-Host "==========================================================" -ForegroundColor Green
Write-Host " 🐾 PawConnect Local Server Running at: $url" -ForegroundColor Cyan
Write-Host " 100% Free Community Pet Adoption & Lost/Found Network" -ForegroundColor Yellow
Write-Host " Press CTRL+C in this window to stop the server" -ForegroundColor Gray
Write-Host "==========================================================" -ForegroundColor Green

# Open in default browser
Start-Process $url

# MIME types dictionary
$mimeTypes = @{
    ".html" = "text/html; charset=utf-8"
    ".htm"  = "text/html; charset=utf-8"
    ".css"  = "text/css; charset=utf-8"
    ".js"   = "application/javascript; charset=utf-8"
    ".json" = "application/json; charset=utf-8"
    ".png"  = "image/png"
    ".jpg"  = "image/jpeg"
    ".jpeg" = "image/jpeg"
    ".svg"  = "image/svg+xml"
    ".ico"  = "image/x-icon"
}

try {
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        $relativePath = $request.Url.LocalPath.TrimStart('/')
        if ([string]::IsNullOrWhiteSpace($relativePath) -or $relativePath -eq "/") {
            $relativePath = "index.html"
        }

        # Prevent directory traversal
        $relativePath = $relativePath -replace '\.\.', ''
        $filePath = Join-Path $rootPath $relativePath

        if (Test-Path -Path $filePath -PathType Leaf) {
            $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
            $contentType = if ($mimeTypes.ContainsKey($ext)) { $mimeTypes[$ext] } else { "application/octet-stream" }
            
            $response.ContentType = $contentType
            $response.AddHeader("Access-Control-Allow-Origin", "*")
            $response.StatusCode = 200

            $bytes = [System.IO.File]::ReadAllBytes($filePath)
            $response.ContentLength64 = $bytes.Length
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
            $response.StatusCode = 404
            $errBytes = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found")
            $response.ContentLength64 = $errBytes.Length
            $response.OutputStream.Write($errBytes, 0, $errBytes.Length)
        }

        $response.Close()
    }
} finally {
    $listener.Stop()
    $listener.Close()
    Write-Host "PawConnect Server stopped." -ForegroundColor Yellow
}
