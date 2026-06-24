Add-Type -AssemblyName 'System.IO.Compression.FileSystem'
$path = 'c:\PROJECTS\velora\src\assets\products\catalogue1.docx'
$zip = [System.IO.Compression.ZipFile]::OpenRead($path)
$entry = $zip.Entries | Where-Object { $_.FullName -eq 'word/document.xml' }
$stream = $entry.Open()
$reader = New-Object System.IO.StreamReader($stream)
$xml = $reader.ReadToEnd()
$reader.Close()
$zip.Dispose()
$text = ($xml -replace '<[^>]+>', '') -replace '\s+', ' '
Write-Output $text
