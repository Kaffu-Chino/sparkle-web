import homeViewLocales from '~/views/home/locales/zh-CN'
import notFoundViewLocales from '~/views/not-found/locales/zh-CN'
import userCenterViewLocales from '~/views/user-center/locales/zh-CN'
import userLoginViewLocales from '~/views/user-login/locales/zh-CN'

export default {
  'global.create': '创建',
  'global.cancel': '取消',
  'global.confirm.yes': '确定',
  'global.confirm.no': '取消',
  'global.delete': '删除',
  'global.edit': '编辑',
  'global.refresh': '刷新',

  'footer.settings': '设置',
  'footer.settings.selectLanguage': '选择语言',
  'footer.info.webuiVersion': 'WebUI 版本',
  'footer.info.lastBuildTime': '最后构建时间',

  'header.router.home': '首页',
  'header.router.banRecords': '封禁记录',
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
  ...userLoginViewLocales
}
