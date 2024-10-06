<template>
  <el-card shadow="never">
    <template #header>
      <el-space style="justify-content: space-between; display: flex">
        <el-space>
          {{ t('userCenterView.userAppsTable.title') }}
          <el-button :title="t('global.refresh')" @click="fetchData" text circle>
            <el-icon size="large"><ElRefresh /></el-icon>
          </el-button>
        </el-space>
        <el-space>
          <el-button size="large" type="primary" @click="openCreateUserAppDrawer" plain>
            <el-icon size="large" class="el-icon--left"><ElPlus /></el-icon
            >{{ t('userCenterView.userAppsTable.createUserApplication') }}
          </el-button>
        </el-space>
      </el-space>
    </template>
    <el-table :data="results" style="width: 100%" v-loading="loading">
      <template #empty> </template>
      <el-table-column prop="id" :label="t('userCenterView.userAppsTable.recordId')" width="100" />
      <el-table-column
        sortable
        prop="createdAt"
        :label="t('userCenterView.userAppsTable.createdAt')"
        width="140"
        :formatter="
          (_row: any, _column: any, cellValue: any) => {
            return dayjs(cellValue).format('YYYY-MM-DD HH:mm')
          }
        "
      />
      <el-table-column prop="appId" :label="t('userCenterView.userAppsTable.appId')" width="300" />
      <el-table-column
        prop="comment"
        :label="t('userCenterView.userAppsTable.comment')"
        min-width="500"
      />
      <el-table-column
        fixed="right"
        :label="t('userCenterView.userAppsTable.operations')"
        min-width="150"
      >
        <template #default="scope">
          <el-popconfirm
            :confirm-button-text="t('global.confirm.yes')"
            :cancel-button-text="t('global.confirm.no')"
            :icon="ElInfoFilled"
            icon-color="#626AEF"
            :title="t('userCenterView.userAppsTable.column.resetAppSecret.popConfirm')"
            @confirm="confirmResetUserAppEvent(scope.row)"
          >
            <template #reference>
              <el-button
                :title="t('userCenterView.userAppsTable.column.resetAppSecret')"
                type="warning"
                circle
                ><el-icon><ElReset /></el-icon
              ></el-button>
            </template>
          </el-popconfirm>
          <el-button
            :title="t('global.edit')"
            @click="openEditUserAppDrawer(scope.row)"
            type="info"
            circle
            ><el-icon><ElEdit /></el-icon
          ></el-button>

          <el-popconfirm
            :confirm-button-text="t('global.confirm.yes')"
            :cancel-button-text="t('global.confirm.no')"
            :icon="ElInfoFilled"
            icon-color="#626AEF"
            :title="t('userCenterView.userAppsTable.column.delete.popConfirm')"
            @confirm="confirmDeleteEvent(scope.row)"
          >
            <template #reference>
              <el-button :title="t('global.delete')" type="danger" circle>
                <el-icon><ElDelete /></el-icon>
              </el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
  <EditableUserAppDrawer
    ref="editableUserAppDrawerRef"
    @create="handleCreate"
    @update="handleUpdate"
    @error="handleError"
    @error:internal-components="handleInternalComponentsError"
  />
  <UserAppInfoDrawer ref="userAppInfoDrawerRef" @error:export-csv="handleInternalComponentsError" />
</template>

<script lang="ts" setup>
import { dayjs } from 'element-plus'
import {
  Refresh as ElRefresh,
  Edit as ElEdit,
  Plus as ElPlus,
  Delete as ElDelete,
  RefreshRight as ElReset,
  InfoFilled as ElInfoFilled
} from '@element-plus/icons-vue'
import { onMounted, ref } from 'vue'

import { useI18n } from 'vue-i18n'
import type { IUserApplication } from '~/api/models/userApplication'
import {
  deleteUserAppByAppId,
  listUserApps,
  resetUserAppSecretByAppId
} from '~/api/userApplication'
import EditableUserAppDrawer from './editableUserAppDrawer.vue'
import UserAppInfoDrawer from './userAppInfoDrawer.vue'
const { t } = useI18n()

const loading = ref<boolean>(false)
const results = ref<null | IUserApplication[]>(null)
const editableUserAppDrawerRef = ref<InstanceType<typeof EditableUserAppDrawer>>()
const userAppInfoDrawerRef = ref<InstanceType<typeof UserAppInfoDrawer>>()

const fetchData = async () => {
  loading.value = true
  results.value = (await listUserApps()).data.data
  loading.value = false
}

const confirmDeleteEvent = async (row: IUserApplication) => {
  if (results.value) {
    let resp = (await deleteUserAppByAppId(row.appId)).data
    if (resp.success) {
      ElMessage.success(t('userCenterView.userAppsTable.column.delete.success'))
    }
  }
  fetchData()
}

const openCreateUserAppDrawer = () => {
  editableUserAppDrawerRef.value?.openDrawer(true)
}

const openEditUserAppDrawer = (row: IUserApplication) => {
  editableUserAppDrawerRef.value?.openDrawer(false, row.appId, row.comment)
}

const confirmResetUserAppEvent = async (row: IUserApplication) => {
  let resp = (await resetUserAppSecretByAppId(row.appId)).data
  if (resp.success) {
    userAppInfoDrawerRef.value?.openDrawer(false, resp.data)
  }
}

const handleCreate = (newApp: IUserApplication) => {
  if (results.value) {
    results.value.push(newApp)
  } else {
    results.value = [newApp]
  }
  editableUserAppDrawerRef.value?.closeDrawer()
}

const handleUpdate = (editedApp: IUserApplication) => {
  ElMessage.success(t('userCenterView.userAppsTable.column.edit.success'))
  if (results.value) {
    const index = results.value.findIndex((app) => app.appId === editedApp.appId)
    if (index !== -1) {
      results.value[index] = editedApp
    }
  }
  editableUserAppDrawerRef.value?.closeDrawer()
}

const handleError = () => {
  editableUserAppDrawerRef.value?.closeDrawer()
}

const handleInternalComponentsError = (message: string) => {
  ElNotification.error(message)
}

onMounted(() => {
  fetchData()
})
</script>
