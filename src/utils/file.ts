function formatFileSize(bytes: number, decimals = 2) {
  if (bytes === -1) return 'N/A' // 如果不支持，请使用 -1 值填充
  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  if (i >= sizes.length) return 'Too large'
  if (i < 0) return bytes + ' Bytes'
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

function formatSpeedSize(bytesPerSecond: number, decimals = 2) {
  if (bytesPerSecond === -1) return 'N/A' // 如果不支持，请使用 -1 值填充
  return formatFileSize(bytesPerSecond, decimals) + '/s'
}

export { formatFileSize, formatSpeedSize }
