<template>
  <el-drawer
    v-model="showDrawer"
    size="50%"
    :append-to-body="true"
    :close-on-click-modal="false"
    @closed="handleClosed"
  >
    <template #header>
      <h3>
        {{
          isCreateApp
            ? t('userCenterView.userAppInfoDrawer.title.createUserApp', {
                comment: userAppData?.comment
              })
            : t('userCenterView.userAppInfoDrawer.title.resetAppSecret', {
                comment: userAppData?.comment
              })
        }}
      </h3>
    </template>
    <el-space direction="vertical" alignment="start">
      <el-alert
        :title="t('userCenterView.userAppInfoDrawer.alert.warningDescription')"
        type="warning"
        :closable="false"
        show-icon
        ><el-descriptions direction="horizontal" :column="1" size="large" border>
          <el-descriptions-item :label="t('userCenterView.userAppsTable.appId')">{{
            userAppData?.appId
          }}</el-descriptions-item>
          <el-descriptions-item :label="t('userCenterView.userAppsTable.appSecret')">{{
            userAppData?.appSecret
          }}</el-descriptions-item>
        </el-descriptions>
      </el-alert>
      <el-space>
        <el-button @click="exportToCSVEvent" type="primary" text
          ><el-icon size="large" class="el-icon--left"><ElDownload /></el-icon>
          {{ t('userCenterView.userAppInfoDrawer.downloadCSV') }}
        </el-button>
      </el-space>
    </el-space>
  </el-drawer>
</template>
<script setup lang="ts">
import { Download as ElDownload } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import type { IUserApplicationVerbose } from '~/api/models/userApplicationVerbose'
import { exportToCSVFile } from '~/utils/csvTools'
const { t } = useI18n()

const showDrawer = ref(false)
const userAppData = ref<null | IUserApplicationVerbose>(null)
const isCreateApp = ref(false)

function openDrawer(isCreate: boolean, userApp: IUserApplicationVerbose) {
  showDrawer.value = true
  isCreateApp.value = isCreate
  userAppData.value = userApp
}

const exportToCSVEvent = () => {
  if (userAppData.value) {
    const exportData = { appId: userAppData.value.appId, appSecret: userAppData.value.appSecret }
    const csvBlob = exportToCSVFile([exportData])
    // 创建下载链接
    if (csvBlob) {
      const downloadLink = document.createElement('a')
      downloadLink.href = URL.createObjectURL(csvBlob)
      downloadLink.download = `${exportData.appId}.csv`
      // 模拟点击下载链接
      downloadLink.click()
    } else {
      emit('error:exportCsv', t('userCenterView.userAppInfoDrawer.exportCSV.error'))
    }
  }
}

defineExpose({
  openDrawer
})

const emit = defineEmits(['closed', 'error:exportCsv'])
const handleClosed = () => {
  emit('closed')
}
</script>
