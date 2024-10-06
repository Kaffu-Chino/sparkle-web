const exportToCSVFile = (data: Record<string, any>[]) => {
  // 检查数据是否为空
  if (data.length === 0) {
    console.error('没有提供数据')
    return
  }

  // 从第一个对象获取表头
  const headers = Object.keys(data[0])
  const csvRows = [
    headers.join(','), // 将表头作为第一行添加
    ...data.map((row) => {
      return headers.map((header) => JSON.stringify(row[header])).join(',')
    })
  ]
  const csvString = csvRows.join('\n')
  // 创建Blob对象
  return new Blob([csvString], { type: 'text/csv;charset=utf-8;' })
}

export { exportToCSVFile }
