<template>
  <el-drawer v-model="showDrawer" size="50%" :append-to-body="true" :destroy-on-close="true">
    <template #header>
      <h3>
        {{
          isCreateApp
            ? t('userCenterView.userAppsTable.createUserApplication')
            : t('userCenterView.editableUserAppDrawer.title.editUserApplication')
        }}
      </h3>
    </template>
    <el-form
      ref="userApplicationFormRef"
      size="large"
      label-width="auto"
      label-position="top"
      :model="userApplicationForm"
      :rules="rules"
    >
      <el-form-item v-if="!isCreateApp" :label="t('userCenterView.userAppsTable.appId')">
        <el-input v-model="userApplicationForm.appId" disabled />
      </el-form-item>
      <el-form-item :label="t('userCenterView.userAppsTable.comment')" prop="comment">
        <el-input type="textarea" v-model="userApplicationForm.comment" />
      </el-form-item>
      <el-form-item>
        <el-button @click="closeDrawer">{{ t('global.cancel') }}</el-button>
        <el-button
          @click="
            isCreateApp ? submitCreate(userApplicationFormRef) : submitEdit(userApplicationFormRef)
          "
          type="primary"
          >{{ isCreateApp ? t('global.create') : t('global.edit') }}</el-button
        >
      </el-form-item>
    </el-form>
  </el-drawer>
  <UserAppInfoDrawer
    ref="createdUserAppInfoDrawerRef"
    @closed="closeDrawer()"
    @error:export-csv="handleExportCsvError"
  />
</template>

<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus'
import { ref, reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import { createUserApp, editUserAppByAppId } from '~/api/userApplication'
import UserAppInfoDrawer from './userAppInfoDrawer.vue'

const userApplicationFormRef = ref<FormInstance>()
const createdUserAppInfoDrawerRef = ref<InstanceType<typeof UserAppInfoDrawer>>()

const { t } = useI18n()
const isCreateApp = ref(false)
const showDrawer = ref(false)

interface UserApplicationForm {
  appId: string
  comment: string
}

const userApplicationForm = reactive<UserApplicationForm>({
  appId: '',
  comment: ''
})

const rules = reactive<FormRules<UserApplicationForm>>({
  comment: [
    {
      required: true,
      message: 'Please input Comment',
      trigger: 'blur'
    }
  ]
})

const emit = defineEmits(['create', 'update', 'error', 'error:internalComponents'])

function openDrawer(isCreate: boolean, appId?: string, comment?: string) {
  showDrawer.value = true
  isCreateApp.value = isCreate
  if (appId && comment) {
    userApplicationForm.appId = appId
    userApplicationForm.comment = comment
  } else {
    userApplicationForm.appId = ''
    userApplicationForm.comment = ''
  }
}

function closeDrawer() {
  showDrawer.value = false
}

defineExpose({
  openDrawer,
  closeDrawer
})

const submitCreate = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (valid) {
      const resp = (await createUserApp({ comment: userApplicationForm.comment })).data
      if (!resp.success) {
        emit('error', resp.message)
        closeDrawer()
      } else {
        createdUserAppInfoDrawerRef.value?.openDrawer(true, resp.data)
        emit('create', resp.data)
      }
    }
  })
}

const submitEdit = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (valid) {
      const resp = (
        await editUserAppByAppId(userApplicationForm.appId, {
          comment: userApplicationForm.comment
        })
      ).data
      if (!resp.success) {
        emit('error', resp.message)
      } else {
        emit('update', resp.data)
      }
    }
  })
}

const handleExportCsvError = (message: string) => {
  emit('error:internalComponents', message)
}
</script>
