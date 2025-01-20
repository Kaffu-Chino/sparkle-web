<template>
  <el-collapse-transition>
    <el-card class="form-card" shadow="never">
      <template #header>
        <el-text size="large">{{ t('banHistoryView.searchForm.title') }}</el-text>
      </template>
      <el-form label-position="right" label-width="160px" :model="banHistoryForm">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="20" :md="16" :lg="12" :xl="8">
            <el-form-item :label="t('banHistoryView.searchForm.formItems.timeRange')">
              <el-date-picker
                type="datetimerange"
                :shortcuts="shortcuts"
                v-model="banHistoryForm.dateTimeRange"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-divider>
          {{ t('banHistoryView.searchForm.sections.peerBasicInformation') }}
        </el-divider>
        <el-row :gutter="16">
          <el-col :xs="24" :sm="20" :md="16" :lg="12" :xl="8">
            <el-form-item :label="t('banHistoryView.searchForm.formItems.peerId')">
              <el-input v-model="banHistoryForm.peerId" placeholder="Please input" clearable>
                <template #prepend>
                  <el-select
                    :placeholder="
                      t('banHistoryView.searchForm.formItems.compareMethodSelect.placeholder')
                    "
                    style="width: 180px"
                    v-model="banHistoryForm.peerIdCompareMethod"
                    clearable
                  >
                    <el-option
                      v-for="(value, key) in StringCompareMethod"
                      :key="key"
                      :label="value"
                      :value="value"
                    />
                  </el-select>
                </template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="20" :md="16" :lg="12" :xl="8">
            <el-form-item :label="t('banHistoryView.searchForm.formItems.peerClientName')">
              <el-input placeholder="Please input">
                <template #prepend>
                  <el-select
                    :placeholder="
                      t('banHistoryView.searchForm.formItems.compareMethodSelect.placeholder')
                    "
                    style="width: 180px"
                    clearable
                  >
                    <el-option
                      v-for="(value, key) in StringCompareMethod"
                      :key="key"
                      :label="value"
                      :value="value"
                    />
                  </el-select>
                </template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="20" :md="16" :lg="12" :xl="8">
            <el-form-item :label="t('banHistoryView.searchForm.formItems.peerIp')">
              <el-input placeholder="Please input">
                <template #prepend>
                  <el-select
                    :placeholder="
                      t('banHistoryView.searchForm.formItems.compareMethodSelect.placeholder')
                    "
                    style="width: 180px"
                    clearable
                  >
                    <el-option
                      v-for="(value, key) in StringCompareMethod"
                      :key="key"
                      :label="value"
                      :value="value"
                    />
                  </el-select>
                </template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="20" :md="16" :lg="12" :xl="8">
            <el-form-item :label="t('banHistoryView.searchForm.formItems.peerPort')">
              <el-input type="number" placeholder="Please input">
                <template #prepend>
                  <el-select
                    :placeholder="
                      t('banHistoryView.searchForm.formItems.compareMethodSelect.placeholder')
                    "
                    style="width: 180px"
                    clearable
                  >
                    <el-option
                      v-for="(value, key) in NumberCompareMethod"
                      :key="key"
                      :label="value"
                      :value="value"
                    />
                  </el-select>
                </template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-divider> {{ t('banHistoryView.searchForm.sections.torrentInformation') }} </el-divider>
        <el-row :gutter="16">
          <el-col :xs="24" :sm="20" :md="16" :lg="12" :xl="8">
            <el-form-item :label="t('banHistoryView.searchForm.formItems.torrentIdentifier')">
              <el-input placeholder="Please input">
                <template #prepend>
                  <el-select
                    :placeholder="
                      t('banHistoryView.searchForm.formItems.compareMethodSelect.placeholder')
                    "
                    style="width: 180px"
                    clearable
                  >
                    <el-option
                      v-for="(value, key) in StringCompareMethod"
                      :key="key"
                      :label="value"
                      :value="value"
                    />
                  </el-select>
                </template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="20" :md="16" :lg="12" :xl="8">
            <el-form-item :label="t('banHistoryView.searchForm.formItems.torrentSize')">
              <el-input type="number" placeholder="Please input">
                <template #prepend>
                  <el-select
                    :placeholder="
                      t('banHistoryView.searchForm.formItems.compareMethodSelect.placeholder')
                    "
                    style="width: 180px"
                    clearable
                  >
                    <el-option
                      v-for="(value, key) in NumberCompareMethod"
                      :key="key"
                      :label="value"
                      :value="value"
                    />
                  </el-select>
                </template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-divider> {{ t('banHistoryView.searchForm.sections.trafficInformation') }} </el-divider>
        <el-row :gutter="16">
          <el-col :xs="24" :sm="20" :md="16" :lg="12" :xl="8">
            <el-form-item :label="t('banHistoryView.searchForm.formItems.fromPeerTraffic')">
              <el-input type="number" placeholder="Please input">
                <template #prepend>
                  <el-select
                    :placeholder="
                      t('banHistoryView.searchForm.formItems.compareMethodSelect.placeholder')
                    "
                    style="width: 180px"
                    clearable
                  >
                    <el-option
                      v-for="(value, key) in NumberCompareMethod"
                      :key="key"
                      :label="value"
                      :value="value"
                    />
                  </el-select>
                </template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="20" :md="16" :lg="12" :xl="8">
            <el-form-item :label="t('banHistoryView.searchForm.formItems.toPeerTraffic')">
              <el-input type="number" placeholder="Please input">
                <template #prepend>
                  <el-select
                    :placeholder="
                      t('banHistoryView.searchForm.formItems.compareMethodSelect.placeholder')
                    "
                    style="width: 180px"
                    clearable
                  >
                    <el-option
                      v-for="(value, key) in NumberCompareMethod"
                      :key="key"
                      :label="value"
                      :value="value"
                    />
                  </el-select>
                </template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="20" :md="16" :lg="12" :xl="8">
            <el-form-item :label="t('banHistoryView.searchForm.formItems.toPeerTrafficSpeed')">
              <el-input type="number" placeholder="Please input">
                <template #prepend>
                  <el-select
                    :placeholder="
                      t('banHistoryView.searchForm.formItems.compareMethodSelect.placeholder')
                    "
                    style="width: 180px"
                    clearable
                  >
                    <el-option
                      v-for="(value, key) in NumberCompareMethod"
                      :key="key"
                      :label="value"
                      :value="value"
                    />
                  </el-select>
                </template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="20" :md="16" :lg="12" :xl="8">
            <el-form-item :label="t('banHistoryView.searchForm.formItems.peerProgress')">
              <el-input type="number" placeholder="Please input">
                <template #prepend>
                  <el-select
                    :placeholder="
                      t('banHistoryView.searchForm.formItems.compareMethodSelect.placeholder')
                    "
                    style="width: 180px"
                    clearable
                  >
                    <el-option
                      v-for="(value, key) in NumberCompareMethod"
                      :key="key"
                      :label="value"
                      :value="value"
                    />
                  </el-select>
                </template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="20" :md="16" :lg="12" :xl="8">
            <el-form-item :label="t('banHistoryView.searchForm.formItems.downloaderProgress')">
              <el-input type="number" placeholder="Please input">
                <template #prepend>
                  <el-select
                    :placeholder="
                      t('banHistoryView.searchForm.formItems.compareMethodSelect.placeholder')
                    "
                    style="width: 180px"
                    clearable
                  >
                    <el-option
                      v-for="(value, key) in NumberCompareMethod"
                      :key="key"
                      :label="value"
                      :value="value"
                    />
                  </el-select>
                </template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-divider> {{ t('banHistoryView.searchForm.sections.banInformation') }} </el-divider>
        <el-row :gutter="16">
          <el-col :xs="24" :sm="20" :md="16" :lg="12" :xl="8">
            <el-form-item :label="t('banHistoryView.searchForm.formItems.module')">
              <el-input placeholder="Please input">
                <template #prepend>
                  <el-select
                    :placeholder="
                      t('banHistoryView.searchForm.formItems.compareMethodSelect.placeholder')
                    "
                    style="width: 180px"
                    clearable
                  >
                    <el-option
                      v-for="(value, key) in StringCompareMethod"
                      :key="key"
                      :label="value"
                      :value="value"
                    />
                  </el-select>
                </template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="20" :md="16" :lg="12" :xl="8">
            <el-form-item :label="t('banHistoryView.searchForm.formItems.rule')">
              <el-input placeholder="Please input">
                <template #prepend>
                  <el-select
                    :placeholder="
                      t('banHistoryView.searchForm.formItems.compareMethodSelect.placeholder')
                    "
                    style="width: 180px"
                    clearable
                  >
                    <el-option
                      v-for="(value, key) in StringCompareMethod"
                      :key="key"
                      :label="value"
                      :value="value"
                    />
                  </el-select>
                </template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item :label="t('banHistoryView.searchForm.formItems.btnBan')">
              <el-radio-group>
                <el-radio :value="true" size="large">{{
                  t('banHistoryView.searchForm.formItems.btnBan.options.yes')
                }}</el-radio>
                <el-radio :value="false" size="large">{{
                  t('banHistoryView.searchForm.formItems.btnBan.options.no')
                }}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-divider> {{ t('banHistoryView.searchForm.sections.searchSettings') }} </el-divider>
        <el-row :gutter="16">
          <el-col :xs="24" :sm="20" :md="16" :lg="12" :xl="8">
            <el-form-item :label="t('banHistoryView.searchForm.formItems.sortBy')">
              <el-input placeholder="Please input" clearable> </el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="20" :md="16" :lg="12" :xl="8">
            <el-form-item :label="t('banHistoryView.searchForm.formItems.sortOrder')">
              <el-input placeholder="Please input" clearable> </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item>
              <el-checkbox-group>
                <el-checkbox :value="true">
                  {{ t('banHistoryView.searchForm.formItems.orConnector') }}
                </el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xs="24" :sm="20" :md="16" :lg="12" :xl="8">
            <el-form-item>
              <el-button>{{ t('global.form.submit') }}</el-button>
              <el-button type="primary">{{ t('global.form.empty') }}</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
  </el-collapse-transition>
</template>
<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { reactive } from 'vue'
import { StringCompareMethod, NumberCompareMethod } from '~/enums/compareMethod'

const { t } = useI18n()
const shortcuts = [
  {
    text: t('banHistoryView.searchForm.formItems.timeRange.shortcuts.12hours'),
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setHours(start.getHours() - 12)
      return [start, end]
    }
  },
  {
    text: t('banHistoryView.searchForm.formItems.timeRange.shortcuts.24hours'),
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setHours(start.getHours() - 24)
      return [start, end]
    }
  },
  {
    text: t('banHistoryView.searchForm.formItems.timeRange.shortcuts.7days'),
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setDate(start.getDate() - 7)
      return [start, end]
    }
  },
  {
    text: t('banHistoryView.searchForm.formItems.timeRange.shortcuts.14days'),
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setDate(start.getDate() - 14)
      return [start, end]
    }
  },
  {
    text: t('banHistoryView.searchForm.formItems.timeRange.shortcuts.30days'),
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setMonth(start.getDate() - 30)
      return [start, end]
    }
  }
]

interface BanHistoryForm {
  dateTimeRange: null | Array<Date>[2]
  peerIdCompareMethod: null | string
  peerId: null | string
  peerClientNameCompareMethod: null | string
  peerClientName: null | string
  peerIpCompareMethod: null | string
  peerIp: null | string
  torrentIdentifierCompareMethod: null | string
  torrentIdentifier: null | string
  torrentSizeCompareMethod: null | string
  torrentSize: null | number
  peerPortCompareMethod: null | string
  peerPort: null | number
  fromPeerTrafficSpeedCompareMethod: null | string
  fromPeerTrafficSpeed: null | string
  toPeerTrafficCompareMethod: null | string
  toPeerTraffic: null | string
  toPeerTrafficSpeedCompareMethod: null | string
  toPeerTrafficSpeed: null | string
  peerProgressCompareMethod: null | string
  peerProgress: null | string
  downloaderProgressCompareMethod: null | string
  downloaderProgress: null | string
  moduleCompareMethod: null | string
  module: null | string
  ruleCompareMethod: null | string
  rule: null | string
  btnBan: null | boolean
  orConnector: null | boolean
  sortBy: null | string
  sortOrder: null | string
  page: number
  pageSize: number
}

const banHistoryForm = reactive<BanHistoryForm>({
  dateTimeRange: null,
  peerIdCompareMethod: null,
  peerId: null,
  peerClientNameCompareMethod: null,
  peerClientName: null,
  peerIpCompareMethod: null,
  peerIp: null,
  torrentIdentifierCompareMethod: null,
  torrentIdentifier: null,
  torrentSizeCompareMethod: null,
  torrentSize: null,
  peerPortCompareMethod: null,
  peerPort: null,
  fromPeerTrafficSpeedCompareMethod: null,
  fromPeerTrafficSpeed: null,
  toPeerTrafficCompareMethod: null,
  toPeerTraffic: null,
  toPeerTrafficSpeedCompareMethod: null,
  toPeerTrafficSpeed: null,
  peerProgressCompareMethod: null,
  peerProgress: null,
  downloaderProgressCompareMethod: null,
  downloaderProgress: null,
  moduleCompareMethod: null,
  module: null,
  ruleCompareMethod: null,
  rule: null,
  btnBan: null,
  orConnector: null,
  sortBy: null,
  sortOrder: null,
  page: 0,
  pageSize: 50
})
</script>
<style lang="scss" scoped>
.form-card {
  border: unset;
  background-color: transparent;
}
</style>
