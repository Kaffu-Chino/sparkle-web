<template>
  <el-card class="form-card" shadow="never">
    <template #header>
      <el-text size="large">{{ t('clientDiscoveryView.searchForm.title') }}</el-text>
    </template>
    <el-form
      label-position="right"
      label-width="160px"
      ref="clientDiscoveryFormRef"
      :rules="rules"
      :model="clientDiscoveryForm"
      scroll-to-error
    >
      <el-divider>
        {{ t('clientDiscoveryView.searchForm.sections.timeInfomation') }}
      </el-divider>
      <el-row :gutter="16">
        <el-col :xs="24" :sm="20" :md="16" :lg="12" :xl="8">
          <el-form-item
            :label="t('clientDiscoveryView.searchForm.formItems.foundAtTimeRange')"
            prop="dateTimeRange"
          >
            <!-- shortcuts不能放script里多国语言切换会失效 -->
            <el-date-picker
              type="datetimerange"
              :shortcuts="[
                {
                  text: t(
                    'clientDiscoveryView.searchForm.formItems.foundAtTimeRange.shortcuts.12hours'
                  ),
                  value: () => {
                    const end = new Date()
                    const start = new Date()
                    start.setHours(start.getHours() - 12)
                    return [start, end]
                  }
                },
                {
                  text: t(
                    'clientDiscoveryView.searchForm.formItems.foundAtTimeRange.shortcuts.24hours'
                  ),
                  value: () => {
                    const end = new Date()
                    const start = new Date()
                    start.setHours(start.getHours() - 24)
                    return [start, end]
                  }
                },
                {
                  text: t(
                    'clientDiscoveryView.searchForm.formItems.foundAtTimeRange.shortcuts.7days'
                  ),
                  value: () => {
                    const end = new Date()
                    const start = new Date()
                    start.setDate(start.getDate() - 7)
                    return [start, end]
                  }
                },
                {
                  text: t(
                    'clientDiscoveryView.searchForm.formItems.foundAtTimeRange.shortcuts.14days'
                  ),
                  value: () => {
                    const end = new Date()
                    const start = new Date()
                    start.setDate(start.getDate() - 14)
                    return [start, end]
                  }
                },
                {
                  text: t(
                    'clientDiscoveryView.searchForm.formItems.foundAtTimeRange.shortcuts.30days'
                  ),
                  value: () => {
                    const end = new Date()
                    const start = new Date()
                    start.setDate(start.getDate() - 30)
                    return [start, end]
                  }
                }
              ]"
              v-model="clientDiscoveryForm.foundAtTimeRange"
              @change="
                (val: Array<Date>) => {
                  if (val != null) {
                    clientDiscoveryForm.foundAtTimeFrom = dayjs(val[0]).valueOf()
                    clientDiscoveryForm.foundAtTimeTo = dayjs(val[1]).valueOf()
                  }
                }
              "
            />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="20" :md="16" :lg="12" :xl="8">
          <el-form-item
            :label="t('clientDiscoveryView.searchForm.formItems.lastSeenAtTimeRange')"
            prop="dateTimeRange"
          >
            <!-- shortcuts不能放script里多国语言切换会失效 -->
            <el-date-picker
              type="datetimerange"
              :shortcuts="[
                {
                  text: t(
                    'clientDiscoveryView.searchForm.formItems.lastSeenAtTimeRange.shortcuts.12hours'
                  ),
                  value: () => {
                    const end = new Date()
                    const start = new Date()
                    start.setHours(start.getHours() - 12)
                    return [start, end]
                  }
                },
                {
                  text: t(
                    'clientDiscoveryView.searchForm.formItems.lastSeenAtTimeRange.shortcuts.24hours'
                  ),
                  value: () => {
                    const end = new Date()
                    const start = new Date()
                    start.setHours(start.getHours() - 24)
                    return [start, end]
                  }
                },
                {
                  text: t(
                    'clientDiscoveryView.searchForm.formItems.lastSeenAtTimeRange.shortcuts.7days'
                  ),
                  value: () => {
                    const end = new Date()
                    const start = new Date()
                    start.setDate(start.getDate() - 7)
                    return [start, end]
                  }
                },
                {
                  text: t(
                    'clientDiscoveryView.searchForm.formItems.lastSeenAtTimeRange.shortcuts.14days'
                  ),
                  value: () => {
                    const end = new Date()
                    const start = new Date()
                    start.setDate(start.getDate() - 14)
                    return [start, end]
                  }
                },
                {
                  text: t(
                    'clientDiscoveryView.searchForm.formItems.lastSeenAtTimeRange.shortcuts.30days'
                  ),
                  value: () => {
                    const end = new Date()
                    const start = new Date()
                    start.setDate(start.getDate() - 30)
                    return [start, end]
                  }
                }
              ]"
              v-model="clientDiscoveryForm.lastSeenAtTimeRange"
              @change="
                (val: Array<Date>) => {
                  if (val != null) {
                    clientDiscoveryForm.lastSeenAtTimeFrom = dayjs(val[0]).valueOf()
                    clientDiscoveryForm.lastSeenAtTimeTo = dayjs(val[1]).valueOf()
                  }
                }
              "
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-divider>
        {{ t('clientDiscoveryView.searchForm.sections.clientBasicInformation') }}
      </el-divider>
      <el-row :gutter="16">
        <el-col :xs="24" :sm="20" :md="16" :lg="12" :xl="8">
          <el-form-item :label="t('clientDiscoveryView.searchForm.formItems.peerId')" prop="peerId">
            <el-input v-model="clientDiscoveryForm.peerId" clearable>
              <template #prepend>
                <el-select
                  :placeholder="
                    t('clientDiscoveryView.searchForm.formItems.compareMethodSelect.placeholder')
                  "
                  style="width: 160px"
                  v-model="clientDiscoveryForm.peerIdCompareMethod"
                  clearable
                >
                  <el-option
                    v-for="(value, key) in StringCompareMethod"
                    :key="key"
                    :label="t('global.enums.StringCompareMethod.tips.' + value)"
                    :value="value"
                  />
                </el-select>
              </template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="20" :md="16" :lg="12" :xl="8">
          <el-form-item
            :label="t('clientDiscoveryView.searchForm.formItems.peerClientName')"
            prop="peerClientName"
          >
            <el-input v-model="clientDiscoveryForm.peerClientName" clearable>
              <template #prepend>
                <el-select
                  :placeholder="
                    t('clientDiscoveryView.searchForm.formItems.compareMethodSelect.placeholder')
                  "
                  style="width: 160px"
                  v-model="clientDiscoveryForm.peerClientNameCompareMethod"
                  clearable
                >
                  <el-option
                    v-for="(value, key) in StringCompareMethod"
                    :key="key"
                    :label="t('global.enums.StringCompareMethod.tips.' + value)"
                    :value="value"
                  />
                </el-select>
              </template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-divider> {{ t('clientDiscoveryView.searchForm.sections.searchSettings') }} </el-divider>
      <el-row :gutter="16">
        <el-col :xs="24" :sm="20" :md="16" :lg="12" :xl="8">
          <el-form-item :label="t('clientDiscoveryView.searchForm.formItems.sortBy')">
            <!--tooltip 关联组件为 input 时 trigger="focus" 不行([issues/18220])，暂时先用受控模式 -->
            <el-tooltip placement="right" :visible="showSortByTooltip">
              <template #content>
                {{ t('clientDiscoveryView.searchForm.formItems.sortBy.toooltips.inputTip') }}
              </template>
              <el-input-tag
                @focus="showSortByTooltip = true"
                @blur="showSortByTooltip = false"
                v-model="clientDiscoveryForm.sortBy"
                clearable
              />
            </el-tooltip>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="20" :md="16" :lg="12" :xl="8">
          <el-form-item :label="t('clientDiscoveryView.searchForm.formItems.sortOrder')">
            <el-input v-model="clientDiscoveryForm.sortOrder" clearable> </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item>
            <el-checkbox
              :indeterminate="clientDiscoveryForm.orConnector === undefined"
              v-model="clientDiscoveryForm.orConnector"
            >
              {{ t('clientDiscoveryView.searchForm.formItems.orConnector') }}
            </el-checkbox>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xs="24" :sm="20" :md="16" :lg="12" :xl="8">
          <el-form-item>
            <el-button
              type="primary"
              @click="submitForm(clientDiscoveryFormRef)"
              :loading="loading"
            >
              {{ t('global.form.submit') }}
            </el-button>
            <el-button @click="resetForm(clientDiscoveryFormRef)" :loading="loading">
              {{ t('global.form.empty') }}
            </el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </el-card>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { dayjs, type FormInstance, type FormRules } from 'element-plus'

import { StringCompareMethod } from '~/enums/compareMethod'
import type {
  IComplexClientDiscoveryQueryForm,
  IComplexClientDiscoveryQueryRequest
} from '~/api/models/clientDiscoveryRequest'

const { t } = useI18n()
const clientDiscoveryFormRef = ref<FormInstance>()

const showSortByTooltip = ref<boolean>(false)
const clientDiscoveryForm = reactive<IComplexClientDiscoveryQueryForm>(
  {} as IComplexClientDiscoveryQueryForm
)

const validatePeerIdItem = (rule: any, value: any, callback: any) => {
  if (
    (!clientDiscoveryForm.peerId && clientDiscoveryForm.peerIdCompareMethod) ||
    (clientDiscoveryForm.peerId && !clientDiscoveryForm.peerIdCompareMethod)
  ) {
    callback(new Error('peerId and peerIdCompareMethod is both required'))
  } else {
    callback()
  }
}

const validatePeerClientNameItem = (rule: any, value: any, callback: any) => {
  if (
    (!clientDiscoveryForm.peerClientName && clientDiscoveryForm.peerClientNameCompareMethod) ||
    (clientDiscoveryForm.peerClientName && !clientDiscoveryForm.peerClientNameCompareMethod)
  ) {
    callback(new Error('peerClientName and peerClientNameCompareMethod is both required'))
  } else {
    callback()
  }
}

const rules = reactive<FormRules<typeof clientDiscoveryForm>>({
  // trigger为blur时，对于下拉框无效，改为change
  peerId: [{ validator: validatePeerIdItem, trigger: 'change' }],
  peerClientName: [{ validator: validatePeerClientNameItem, trigger: 'change' }]
})

const emit = defineEmits(['submit'])

const loading = defineModel('loading', {
  type: Boolean,
  default: false
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid) => {
    if (valid) {
      loading.value = true
      emit('submit', clientDiscoveryForm as IComplexClientDiscoveryQueryRequest)
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

defineExpose({
  submitForm,
  resetForm
})
</script>
<style lang="scss" scoped>
.form-card {
  border: unset;
  background-color: transparent;
}
</style>
