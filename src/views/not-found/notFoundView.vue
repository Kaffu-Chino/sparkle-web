<template>
  <el-result icon="error" :title="t('notFoundView.title')" :sub-title="t('notFoundView.subtitle')">
    <template #extra>
      <el-button type="primary" @click="goBackHome">{{ t('notFoundView.button.back') }}</el-button>
    </template>
  </el-result>
</template>
<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { useLocalePath } from 'vue-i18n-routing'
import { useRouter } from 'vue-router'

const { t } = useI18n()
const router = useRouter()
const localePath = useLocalePath()

const goBackHome = () => {
  router.push(localePath('/'))
}
</script>
