import homeViewLocales from '~/views/home/locales/en-US'
import notFoundViewLocales from '~/views/not-found/locales/en-US'
import userCenterViewLocales from '~/views/user-center/locales/en-US'
import userLoginViewLocales from '~/views/user-login/locales/en-US'

export default {
  'global.create': 'Create',
  'global.cancel': 'Cancel',
  'global.confirm.yes': 'Yes',
  'global.confirm.no': 'No',
  'global.delete': 'Delete',
  'global.edit': 'Edit',
  'global.refresh': 'Refresh',

  'footer.settings': 'Settings',
  'footer.settings.selectLanguage': 'Select Language',
  'footer.info.webuiVersion': 'WebUI Version',
  'footer.info.lastBuildTime': 'Last Build Time',

  'header.router.home': 'Home',
  'header.router.banHistory': 'Ban History',
  'header.router.submissionRecords': 'Submission Records',
  'header.router.featureDiscovery': 'Feature Discovery',
  'header.router.tracker': 'Tracker',
  'header.router.user': 'User',
  'header.router.user.userCenter': 'User Center',
  'header.router.user.login': 'Login',
  'header.router.user.logout': 'Logout',

  ...homeViewLocales,
  ...notFoundViewLocales,
  ...userCenterViewLocales,
  ...userLoginViewLocales
}
