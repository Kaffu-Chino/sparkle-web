import { createI18n } from 'vue-i18n'
import en from './en-US'
import cn from './zh-CN'

const i18n = createI18n<false>({
  // something vue-i18n options here ...
  legacy: false,
  locale: 'en-US',
  messages: {
    'zh-CN': cn,
    'en-US': en
  }
})

export default i18n
