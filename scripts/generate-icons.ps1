Add-Type -AssemblyName System.Drawing

$srcPath = (Resolve-Path "public/images/ARDDevStudioCircleLogo.png").Path
$srcImage = [System.Drawing.Image]::FromFile($srcPath)

function Resize-Image($targetWidth, $targetHeight, $destPath) {
    $bmp = New-Object System.Drawing.Bitmap $targetWidth, $targetHeight
    $graphics = [System.Drawing.Graphics]::FromImage($bmp)
    $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $graphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
    $graphics.Clear([System.Drawing.Color]::Transparent)

    $rect = New-Object System.Drawing.Rectangle 0, 0, $targetWidth, $targetHeight
    $graphics.DrawImage($srcImage, $rect)
    $graphics.Dispose()

    $bmp.Save($destPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $bmp.Dispose()
    Write-Host "Generated: $destPath ($targetWidth x $targetHeight)"
}

Resize-Image 192 192 (Join-Path (Get-Location) "public/images/icon-192.png")
Resize-Image 512 512 (Join-Path (Get-Location) "public/images/icon-512.png")
Resize-Image 180 180 (Join-Path (Get-Location) "public/images/apple-touch-icon.png")

$srcImage.Dispose()
