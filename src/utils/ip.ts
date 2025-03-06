function formatHostAddress(hostIp: string, hostPort: number): string {
  const ipv4Regex =
    /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])$/
  if (ipv4Regex.test(hostIp)) {
    return `${hostIp}:${hostPort}`
  } else {
    return `[${hostIp}]:${hostPort}`
  }
}

export { formatHostAddress }
