$port = 8080
$listener = New-Object System.Net.HttpListener
$prefix = "http://localhost:$port/"
$listener.Prefixes.Add($prefix)

try {
    $listener.Start()
} catch {
    $port = 8081
    $prefix = "http://localhost:$port/"
    $listener = New-Object System.Net.HttpListener
    $listener.Prefixes.Add($prefix)
    $listener.Start()
}

Write-Host "YES EDU Local Server running at $prefix"
Write-Host "Serving files from: $PSScriptRoot"

$mimeTypes = @{
    ".html" = "text/html; charset=utf-8"
    ".css"  = "text/css; charset=utf-8"
    ".js"   = "application/javascript; charset=utf-8"
    ".svg"  = "image/svg+xml"
    ".png"  = "image/png"
    ".jpg"  = "image/jpeg"
    ".jpeg" = "image/jpeg"
    ".ico"  = "image/x-icon"
    ".json" = "application/json"
    ".woff" = "font/woff"
    ".woff2"= "font/woff2"
    ".ttf"  = "font/ttf"
}

$baseDir = if ($PSScriptRoot) { $PSScriptRoot } else { (Get-Location).Path }

try {
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        try {
            $request = $context.Request
            $response = $context.Response

            $rawUrl = $request.Url.LocalPath
            if ($rawUrl -eq "/" -or [string]::IsNullOrEmpty($rawUrl)) {
                $rawUrl = "/index.html"
            }

            $decodedUrl = [System.Uri]::UnescapeDataString($rawUrl).TrimStart('/')
            $decodedUrl = $decodedUrl -replace '/', '\'
            $filePath = Join-Path $baseDir $decodedUrl

            if (Test-Path $filePath -PathType Leaf) {
                $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
                $mime = if ($mimeTypes.ContainsKey($ext)) { $mimeTypes[$ext] } else { "application/octet-stream" }
                $bytes = [System.IO.File]::ReadAllBytes($filePath)
                $response.ContentType = $mime
                $response.ContentLength64 = $bytes.Length
                $response.StatusCode = 200
                $response.OutputStream.Write($bytes, 0, $bytes.Length)
            } else {
                $response.StatusCode = 404
                $msg = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found: $decodedUrl")
                $response.ContentType = "text/plain"
                $response.ContentLength64 = $msg.Length
                $response.OutputStream.Write($msg, 0, $msg.Length)
            }
        } catch {
            # Catch client disconnections or I/O aborts gracefully without killing server
        } finally {
            try {
                if ($response) { $response.Close() }
            } catch {}
        }
    }
} finally {
    try {
        $listener.Stop()
        $listener.Close()
    } catch {}
}

