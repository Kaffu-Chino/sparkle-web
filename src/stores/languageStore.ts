import { usePreferredLanguages, useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import { computed } from 'vue'

export const useLanguageStore = defineStore('language', () => {
  const savedLanguage = useStorage<string | null>('language', null, undefined)
  const systemLanguage = usePreferredLanguages()

  const language = computed(() => {
    const lang = savedLanguage.value || systemLanguage.value[0]
    if (lang == 'en') {
      return 'en-US'
    }
    return lang
  })

  function setSavedLanguage(lang: string) {
    if (!lang) {
      savedLanguage.value = null
    } else {
      savedLanguage.value = lang
    }
  }
  return { savedLanguage, systemLanguage, language, setSavedLanguage }
})
