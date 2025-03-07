/**
 * 将flags字符串转换为描述map(i18n变量)
 * @param flags - flags字符串
 * @returns 描述map{key, value：i18n翻译变量}
 */
function convertFlagsToDescripMap(flags: string) {
  return flags
    .split(' ')
    .map((flag) => ({ key: flag, value: 'global.peerFlags.flags.' + flag.trim() }))
}

export { convertFlagsToDescripMap }
