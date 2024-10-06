<template>
  <el-row>
    <el-col :xs="24" :sm="4">
      <el-space class="footer-main" direction="vertical" alignment="left">
        <h4>{{ t('footer.settings') }}</h4>
        <el-dropdown trigger="click">
          <el-link>
            <el-icon class="el-icon--left" size="18px">
              <i-material-symbols-translate />
            </el-icon>
            {{ t('footer.settings.selectLanguage') }}({{ locale.valueOf() }})
          </el-link>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item
                v-for="(localeItem, key) in switchableLocales"
                :key="key"
                @click="changeLanguage(localeItem.code)"
                >{{ localeItem.name }}</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-space>
    </el-col>
    <el-col :xs="24" :sm="4">
      <el-space class="footer-main" direction="vertical" alignment="left">
        <el-space direction="vertical" alignment="left" :size="0" fill>
          <el-text size="small">{{ t('footer.info.webuiVersion') }}</el-text>
          <el-text type="info" size="small">{{ webUIVersion }}</el-text>
        </el-space>
        <el-space direction="vertical" alignment="left" :size="0" fill>
          <el-text size="small">{{ t('footer.info.lastBuildTime') }}</el-text>
          <el-text type="info" size="small">{{ lastBuildTime }}</el-text>
        </el-space>
      </el-space>
    </el-col>
  </el-row>
</template>
<script lang="ts" setup>
import { dayjs } from 'element-plus'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useSwitchLocalePath } from 'vue-i18n-routing'
import { useLanguageStore } from '~/stores/languageStore'
import { switchableLocales } from '~/router'

const webUIVersion = __APP_VERSION__
const lastBuildTime = dayjs(__LAST_BUILD_TIME__).format('YYYY-MM-DD HH:mm:ss')

const { t, locale } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const router = useRouter()
const languageStore = useLanguageStore()

function changeLanguage(selectedLanguage: string) {
  if (locale.value !== selectedLanguage) {
    locale.value = selectedLanguage
    languageStore.setSavedLanguage(selectedLanguage)
    router.push(switchLocalePath(selectedLanguage)).catch((err) => {
      console.error('Navigation error:', err)
    })
  }
}
</script>
<style lang="scss" scoped>
h4 {
  font-size: 18px;
  margin: 0 0 10px;
}

.el-row {
  color: var(--el-text-color-regular);
  .el-col {
    padding: 20px 0;
  }
  .el-dropdown {
    background-color: var(--el-color-primary-light-9);
    border-radius: 0.2em;
    padding: 0.5em;
  }
}
</style>
