Add-Type -AssemblyName System.Drawing

$srcPath = (Resolve-Path "public/images/ARDDevStudioLogo.png").Path
$srcBmp = [System.Drawing.Bitmap]::FromFile($srcPath)

$targetW = 1200
$targetH = 630

$outBmp = New-Object System.Drawing.Bitmap $targetW, $targetH
$g = [System.Drawing.Graphics]::FromImage($outBmp)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality

$bgCorner = $srcBmp.GetPixel(10, 10)
$bgColor = [System.Drawing.Color]::FromArgb(255, $bgCorner.R, $bgCorner.G, $bgCorner.B)
$g.Clear($bgColor)

$drawSize = 630
$drawX = [int](($targetW - $drawSize) / 2) # 285
$drawY = 0

$rect = New-Object System.Drawing.Rectangle $drawX, $drawY, $drawSize, $drawSize
$g.DrawImage($srcBmp, $rect)

$blendW = 30
for ($i = 0; $i -lt $blendW; $i++) {
    $alpha = [int](255 * (1 - ($i / $blendW)))
    $blendPen = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb($alpha, $bgColor.R, $bgColor.G, $bgColor.B)), 1
    $g.DrawLine($blendPen, ($drawX + $i), 0, ($drawX + $i), $targetH)
    $g.DrawLine($blendPen, ($drawX + $drawSize - 1 - $i), 0, ($drawX + $drawSize - 1 - $i), $targetH)
    $blendPen.Dispose()
}

$g.Dispose()

# Save PNG (lossless 1200x630)
$pngPath = (Join-Path (Get-Location) "public/images/ARDDevStudioLogo-preview.png")
$outBmp.Save($pngPath, [System.Drawing.Imaging.ImageFormat]::Png)
Write-Host "Generated PNG: $pngPath"

# Save JPG (compressed 1200x630 for messaging crawlers like WhatsApp, Telegram, Messenger)
$jpgPath = (Join-Path (Get-Location) "public/images/ARDDevStudioLogo-preview.jpg")
$outBmp.Save($jpgPath, [System.Drawing.Imaging.ImageFormat]::Jpeg)
Write-Host "Generated JPG: $jpgPath"

# Also create a compressed square version (800x800)
$sqSize = 800
$sqBmp = New-Object System.Drawing.Bitmap $sqSize, $sqSize
$sqG = [System.Drawing.Graphics]::FromImage($sqBmp)
$sqG.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$sqG.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$sqG.DrawImage($srcBmp, (New-Object System.Drawing.Rectangle 0, 0, $sqSize, $sqSize))
$sqG.Dispose()

$sqPath = (Join-Path (Get-Location) "public/images/ARDDevStudioLogo-square.png")
$sqBmp.Save($sqPath, [System.Drawing.Imaging.ImageFormat]::Png)
Write-Host "Generated Square: $sqPath"

$outBmp.Dispose()
$sqBmp.Dispose()
$srcBmp.Dispose()
