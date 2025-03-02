import homeViewLocales from '~/views/home/locales/zh-CN'
import notFoundViewLocales from '~/views/not-found/locales/zh-CN'
import userCenterViewLocales from '~/views/user-center/locales/zh-CN'
import userLoginViewLocales from '~/views/user-login/locales/zh-CN'
import banHistoryViewLocales from '~/views/ban-history/locales/zh-CN'

export default {
  'global.create': '创建',
  'global.cancel': '取消',
  'global.confirm.yes': '确定',
  'global.confirm.no': '取消',
  'global.delete': '删除',
  'global.edit': '编辑',
  'global.refresh': '刷新',
  'global.copy': '复制',
  'global.form.submit': '提交',
  'global.form.empty': '清空',

  'global.peerFlags.flags.P': 'μtp',
  'global.peerFlags.flags.d': '您：期待下载╱他：拒绝上传',
  'global.peerFlags.flags.D': '您：期待下载╱他：同意上传',
  'global.peerFlags.flags.u': '他：期待下载╱您：拒绝上传',
  'global.peerFlags.flags.U': '他：期待下载╱您：同意上传',
  'global.peerFlags.flags.K': '您：不想下载╱他：同意上传',
  'global.peerFlags.flags.?': '他：不想下载╱您：同意上传',
  'global.peerFlags.flags.O': '多传者优先',
  'global.peerFlags.flags.S': '下载者突然停止',
  'global.peerFlags.flags.I': '传入连接',
  'global.peerFlags.flags.H': '来自 DHT 的下载者',
  'global.peerFlags.flags.X': '来自 PEX 的下载者',
  'global.peerFlags.flags.L': '来自 LSD 的下载者',
  'global.peerFlags.flags.E': '加密的流量',
  'global.peerFlags.flags.e': '加密握手',

  'global.enums.StringCompareMethod.tips.CONTAINS': '包含',
  'global.enums.StringCompareMethod.tips.NOT_CONTAINS': '不包含',
  'global.enums.StringCompareMethod.tips.EQUALS': '匹配',
  'global.enums.StringCompareMethod.tips.NOT_EQUALS': '不匹配',
  'global.enums.StringCompareMethod.tips.STARTS_WITH': '开头为...',
  'global.enums.StringCompareMethod.tips.NOT_STARTS_WITH': '开头不为...',
  'global.enums.StringCompareMethod.tips.ENDS_WITH': '结尾为...',
  'global.enums.StringCompareMethod.tips.NOT_ENDS_WITH': '结尾不为...',

  'global.enums.NumberCompareMethod.tips.LESS_THAN': '小于（＜）',
  'global.enums.NumberCompareMethod.tips.LESS_THAN_EQUAL': '小于等于（≤）',
  'global.enums.NumberCompareMethod.tips.GREATER_THAN': '大于（＞）',
  'global.enums.NumberCompareMethod.tips.GREATER_THAN_EQUAL': '大于等于（≥）',
  'global.enums.NumberCompareMethod.tips.EQUAL': '等于（＝）',

  'footer.settings': '设置',
  'footer.settings.selectLanguage': '选择语言',
  'footer.info.webuiVersion': 'WebUI 版本',
  'footer.info.lastBuildTime': '最后构建时间',

  'header.router.home': '首页',
  'header.router.banHistory': '封禁历史',
  'header.router.submissionRecords': '提交记录',
  'header.router.featureDiscovery': '特征发现',
  'header.router.tracker': 'Tracker',
  'header.router.user': '用户',
  'header.router.user.userCenter': '用户中心',
  'header.router.user.login': '登录',
  'header.router.user.logout': '登出会话',

  ...homeViewLocales,
  ...notFoundViewLocales,
  ...userCenterViewLocales,
  ...userLoginViewLocales,
  ...banHistoryViewLocales
}
