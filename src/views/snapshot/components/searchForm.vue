<template>
  <el-card class="form-card" shadow="never">
    <template #header>
      <el-text size="large">{{ t('snapshotView.searchForm.title') }}</el-text>
    </template>
    <el-form
      label-position="right"
      label-width="160px"
      ref="snapshotFormRef"
      :rules="rules"
      :model="snapshotForm"
      scroll-to-error
    >
      <el-row :gutter="10">
        <el-col :xs="24" :sm="20" :md="16" :lg="12" :xl="8">
          <el-form-item
            :label="t('snapshotView.searchForm.formItems.timeRange')"
            prop="dateTimeRange"
            required
          >
            <!-- shortcuts不能放script里多国语言切换会失效 -->
            <el-date-picker
              type="datetimerange"
              :shortcuts="[
                {
                  text: t('snapshotView.searchForm.formItems.timeRange.shortcuts.12hours'),
                  value: () => {
                    const end = new Date()
                    const start = new Date()
                    start.setHours(start.getHours() - 12)
                    return [start, end]
                  }
                },
                {
                  text: t('snapshotView.searchForm.formItems.timeRange.shortcuts.24hours'),
                  value: () => {
                    const end = new Date()
                    const start = new Date()
                    start.setHours(start.getHours() - 24)
                    return [start, end]
                  }
                },
                {
                  text: t('snapshotView.searchForm.formItems.timeRange.shortcuts.7days'),
                  value: () => {
                    const end = new Date()
                    const start = new Date()
                    start.setDate(start.getDate() - 7)
                    return [start, end]
                  }
                },
                {
                  text: t('snapshotView.searchForm.formItems.timeRange.shortcuts.14days'),
                  value: () => {
                    const end = new Date()
                    const start = new Date()
                    start.setDate(start.getDate() - 14)
                    return [start, end]
                  }
                },
                {
                  text: t('snapshotView.searchForm.formItems.timeRange.shortcuts.30days'),
                  value: () => {
                    const end = new Date()
                    const start = new Date()
                    start.setDate(start.getDate() - 30)
                    return [start, end]
                  }
                }
              ]"
              v-model="snapshotForm.dateTimeRange"
              @change="
                (val: Array<Date>) => {
                  if (val != null) {
                    snapshotForm.timeFrom = dayjs(val[0]).valueOf()
                    snapshotForm.timeTo = dayjs(val[1]).valueOf()
                  }
                }
              "
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-divider>
        {{ t('snapshotView.searchForm.sections.peerBasicInformation') }}
      </el-divider>
      <el-row :gutter="16">
        <el-col :xs="24" :sm="20" :md="16" :lg="12" :xl="8">
          <el-form-item :label="t('snapshotView.searchForm.formItems.peerId')" prop="peerId">
            <el-input v-model="snapshotForm.peerId" clearable>
              <template #prepend>
                <el-select
                  :placeholder="
                    t('snapshotView.searchForm.formItems.compareMethodSelect.placeholder')
                  "
                  style="width: 160px"
                  v-model="snapshotForm.peerIdCompareMethod"
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
            :label="t('snapshotView.searchForm.formItems.peerClientName')"
            prop="peerClientName"
          >
            <el-input v-model="snapshotForm.peerClientName" clearable>
              <template #prepend>
                <el-select
                  :placeholder="
                    t('snapshotView.searchForm.formItems.compareMethodSelect.placeholder')
                  "
                  style="width: 160px"
                  v-model="snapshotForm.peerClientNameCompareMethod"
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
          <el-form-item :label="t('snapshotView.searchForm.formItems.peerIp')" prop="peerIp">
            <el-input placeholder="IPv4/IPv6" v-model="snapshotForm.peerIp" clearable>
              <template #prepend>
                <el-select
                  :placeholder="
                    t('snapshotView.searchForm.formItems.compareMethodSelect.placeholder')
                  "
                  style="width: 160px"
                  v-model="snapshotForm.peerIpCompareMethod"
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
          <el-form-item :label="t('snapshotView.searchForm.formItems.peerPort')" prop="peerPort">
            <el-input type="number" v-model="snapshotForm.peerPort" clearable>
              <template #prepend>
                <el-select
                  :placeholder="
                    t('snapshotView.searchForm.formItems.compareMethodSelect.placeholder')
                  "
                  style="width: 160px"
                  v-model="snapshotForm.peerPortCompareMethod"
                  clearable
                >
                  <el-option
                    v-for="(value, key) in NumberCompareMethod"
                    :key="key"
                    :label="t('global.enums.NumberCompareMethod.tips.' + value)"
                    :value="value"
                  />
                </el-select>
              </template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-divider> {{ t('snapshotView.searchForm.sections.torrentInformation') }} </el-divider>
      <el-row :gutter="16">
        <el-col :xs="24" :sm="20" :md="16" :lg="12" :xl="8">
          <el-form-item
            :label="t('snapshotView.searchForm.formItems.torrentIdentifier')"
            prop="torrentIdentifier"
          >
            <el-input placeholder="Hash" v-model="snapshotForm.torrentIdentifier" clearable>
              <template #prepend>
                <el-select
                  :placeholder="
                    t('snapshotView.searchForm.formItems.compareMethodSelect.placeholder')
                  "
                  style="width: 160px"
                  v-model="snapshotForm.torrentIdentifierCompareMethod"
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
            :label="t('snapshotView.searchForm.formItems.torrentSize')"
            prop="torrentSize"
          >
            <!--tooltip 关联组件为 input 时 trigger="focus" 不行([issues/18220])，暂时先用受控模式 -->
            <el-tooltip placement="right" :visible="showTorrentSizeTooltip">
              <template #content>
                ≈
                {{ formatFileSize(snapshotForm.torrentSize ? snapshotForm.torrentSize : -1) }}
              </template>
              <el-input
                type="number"
                @focus="showTorrentSizeTooltip = true"
                @blur="showTorrentSizeTooltip = false"
                v-model="snapshotForm.torrentSize"
                clearable
              >
                <template #prepend>
                  <el-select
                    :placeholder="
                      t('snapshotView.searchForm.formItems.compareMethodSelect.placeholder')
                    "
                    style="width: 160px"
                    v-model="snapshotForm.torrentSizeCompareMethod"
                    clearable
                  >
                    <el-option
                      v-for="(value, key) in NumberCompareMethod"
                      :key="key"
                      :label="t('global.enums.NumberCompareMethod.tips.' + value)"
                      :value="value"
                    />
                  </el-select>
                </template>
                <template #suffix> Byte </template>
              </el-input>
            </el-tooltip>
          </el-form-item>
        </el-col>
      </el-row>
      <el-divider> {{ t('snapshotView.searchForm.sections.trafficInformation') }} </el-divider>
      <el-row :gutter="16">
        <el-col :xs="24" :sm="20" :md="16" :lg="12" :xl="8">
          <el-form-item
            :label="t('snapshotView.searchForm.formItems.fromPeerTraffic')"
            prop="fromPeerTraffic"
          >
            <!--tooltip 关联组件为 input 时 trigger="focus" 不行([issues/18220])，暂时先用受控模式 -->
            <el-tooltip placement="right" :visible="showFromPeerTrafficTooltip">
              <template #content>
                ≈
                {{
                  formatFileSize(snapshotForm.fromPeerTraffic ? snapshotForm.fromPeerTraffic : -1)
                }}
              </template>
              <el-input
                type="number"
                @focus="showFromPeerTrafficTooltip = true"
                @blur="showFromPeerTrafficTooltip = false"
                v-model="snapshotForm.fromPeerTraffic"
                clearable
              >
                <template #prepend>
                  <el-select
                    :placeholder="
                      t('snapshotView.searchForm.formItems.compareMethodSelect.placeholder')
                    "
                    style="width: 160px"
                    v-model="snapshotForm.fromPeerTrafficCompareMethod"
                    clearable
                  >
                    <el-option
                      v-for="(value, key) in NumberCompareMethod"
                      :key="key"
                      :label="t('global.enums.NumberCompareMethod.tips.' + value)"
                      :value="value"
                    />
                  </el-select>
                </template>
                <template #suffix> Byte </template>
              </el-input>
            </el-tooltip>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="20" :md="16" :lg="12" :xl="8">
          <el-form-item
            :label="t('snapshotView.searchForm.formItems.fromPeerTrafficSpeed')"
            prop="fromPeerTrafficSpeed"
          >
            <!--tooltip 关联组件为 input 时 trigger="focus" 不行([issues/18220])，暂时先用受控模式 -->
            <el-tooltip placement="right" :visible="showFromPeerTrafficSpeedTooltip">
              <template #content>
                ≈
                {{
                  formatSpeedSize(
                    snapshotForm.fromPeerTrafficSpeed ? snapshotForm.fromPeerTrafficSpeed : -1
                  )
                }}
              </template>
              <el-input
                type="number"
                @focus="showFromPeerTrafficSpeedTooltip = true"
                @blur="showFromPeerTrafficSpeedTooltip = false"
                v-model="snapshotForm.fromPeerTrafficSpeed"
                clearable
              >
                <template #prepend>
                  <el-select
                    :placeholder="
                      t('snapshotView.searchForm.formItems.compareMethodSelect.placeholder')
                    "
                    style="width: 160px"
                    v-model="snapshotForm.fromPeerTrafficSpeedCompareMethod"
                    clearable
                  >
                    <el-option
                      v-for="(value, key) in NumberCompareMethod"
                      :key="key"
                      :label="t('global.enums.NumberCompareMethod.tips.' + value)"
                      :value="value"
                    />
                  </el-select>
                </template>
                <template #suffix> Byte/s </template>
              </el-input>
            </el-tooltip>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="20" :md="16" :lg="12" :xl="8">
          <el-form-item
            :label="t('snapshotView.searchForm.formItems.toPeerTraffic')"
            prop="toPeerTraffic"
          >
            <!--tooltip 关联组件为 input 时 trigger="focus" 不行([issues/18220])，暂时先用受控模式 -->
            <el-tooltip placement="right" :visible="showToPeerTrafficTooltip">
              <template #content>
                ≈
                {{ formatFileSize(snapshotForm.toPeerTraffic ? snapshotForm.toPeerTraffic : -1) }}
              </template>
              <el-input
                type="number"
                @focus="showToPeerTrafficTooltip = true"
                @blur="showToPeerTrafficTooltip = false"
                v-model="snapshotForm.toPeerTraffic"
                clearable
              >
                <template #prepend>
                  <el-select
                    :placeholder="
                      t('snapshotView.searchForm.formItems.compareMethodSelect.placeholder')
                    "
                    style="width: 160px"
                    v-model="snapshotForm.toPeerTrafficCompareMethod"
                    clearable
                  >
                    <el-option
                      v-for="(value, key) in NumberCompareMethod"
                      :key="key"
                      :label="t('global.enums.NumberCompareMethod.tips.' + value)"
                      :value="value"
                    />
                  </el-select>
                </template>
                <template #suffix> Byte </template>
              </el-input>
            </el-tooltip>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="20" :md="16" :lg="12" :xl="8">
          <el-form-item
            :label="t('snapshotView.searchForm.formItems.toPeerTrafficSpeed')"
            prop="toPeerTrafficSpeed"
          >
            <!--tooltip 关联组件为 input 时 trigger="focus" 不行([issues/18220])，暂时先用受控模式 -->
            <el-tooltip placement="right" :visible="showToPeerTrafficSpeedTooltip">
              <template #content>
                ≈
                {{
                  formatFileSize(
                    snapshotForm.toPeerTrafficSpeed ? snapshotForm.toPeerTrafficSpeed : -1
                  )
                }}
              </template>
              <el-input
                type="number"
                @focus="showToPeerTrafficSpeedTooltip = true"
                @blur="showToPeerTrafficSpeedTooltip = false"
                v-model="snapshotForm.toPeerTrafficSpeed"
                clearable
              >
                <template #prepend>
                  <el-select
                    :placeholder="
                      t('snapshotView.searchForm.formItems.compareMethodSelect.placeholder')
                    "
                    style="width: 160px"
                    v-model="snapshotForm.toPeerTrafficSpeedCompareMethod"
                    clearable
                  >
                    <el-option
                      v-for="(value, key) in NumberCompareMethod"
                      :key="key"
                      :label="t('global.enums.NumberCompareMethod.tips.' + value)"
                      :value="value"
                    />
                  </el-select>
                </template>
                <template #suffix> Byte/s </template>
              </el-input>
            </el-tooltip>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="20" :md="16" :lg="12" :xl="8">
          <el-form-item
            :label="t('snapshotView.searchForm.formItems.peerProgress')"
            prop="peerProgress"
          >
            <el-input
              type="number"
              @change="
                () => {
                  if (snapshotForm.peerProgressPercentage) {
                    snapshotForm.peerProgress = snapshotForm.peerProgressPercentage / 100
                  }
                }
              "
              v-model="snapshotForm.peerProgressPercentage"
              clearable
            >
              <template #prepend>
                <el-select
                  :placeholder="
                    t('snapshotView.searchForm.formItems.compareMethodSelect.placeholder')
                  "
                  style="width: 160px"
                  v-model="snapshotForm.peerProgressCompareMethod"
                  clearable
                >
                  <el-option
                    v-for="(value, key) in NumberCompareMethod"
                    :key="key"
                    :label="t('global.enums.NumberCompareMethod.tips.' + value)"
                    :value="value"
                  />
                </el-select>
              </template>
              <template #suffix> % </template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="20" :md="16" :lg="12" :xl="8">
          <el-form-item
            :label="t('snapshotView.searchForm.formItems.downloaderProgress')"
            prop="downloaderProgress"
          >
            <el-input
              type="number"
              @change="
                () => {
                  if (snapshotForm.downloaderProgressPercentage) {
                    snapshotForm.downloaderProgress =
                      snapshotForm.downloaderProgressPercentage / 100
                  }
                }
              "
              v-model="snapshotForm.downloaderProgressPercentage"
              clearable
            >
              <template #prepend>
                <el-select
                  :placeholder="
                    t('snapshotView.searchForm.formItems.compareMethodSelect.placeholder')
                  "
                  style="width: 160px"
                  v-model="snapshotForm.downloaderProgressCompareMethod"
                  clearable
                >
                  <el-option
                    v-for="(value, key) in NumberCompareMethod"
                    :key="key"
                    :label="t('global.enums.NumberCompareMethod.tips.' + value)"
                    :value="value"
                  />
                </el-select>
              </template>
              <template #suffix> % </template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-divider> {{ t('snapshotView.searchForm.sections.searchSettings') }} </el-divider>
      <el-row :gutter="16">
        <el-col :xs="24" :sm="20" :md="16" :lg="12" :xl="8">
          <el-form-item :label="t('snapshotView.searchForm.formItems.sortBy')">
            <!--tooltip 关联组件为 input 时 trigger="focus" 不行([issues/18220])，暂时先用受控模式 -->
            <el-tooltip placement="right" :visible="showSortByTooltip">
              <template #content>
                {{ t('snapshotView.searchForm.formItems.sortBy.toooltips.inputTip') }}
              </template>
              <el-input-tag
                @focus="showSortByTooltip = true"
                @blur="showSortByTooltip = false"
                v-model="snapshotForm.sortBy"
                clearable
              />
            </el-tooltip>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="20" :md="16" :lg="12" :xl="8">
          <el-form-item :label="t('snapshotView.searchForm.formItems.sortOrder')">
            <el-input v-model="snapshotForm.sortOrder" clearable> </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item>
            <el-checkbox
              :indeterminate="snapshotForm.orConnector === undefined"
              v-model="snapshotForm.orConnector"
            >
              {{ t('snapshotView.searchForm.formItems.orConnector') }}
            </el-checkbox>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xs="24" :sm="20" :md="16" :lg="12" :xl="8">
          <el-form-item>
            <el-button type="primary" @click="submitForm(snapshotFormRef)" :loading="loading">{{
              t('global.form.submit')
            }}</el-button>
            <el-button @click="resetForm(snapshotFormRef)" :loading="loading">{{
              t('global.form.empty')
            }}</el-button>
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
import { StringCompareMethod, NumberCompareMethod } from '~/enums/compareMethod'
import { formatFileSize, formatSpeedSize } from '~/utils/file'
import type {
  IComplexsnapshotQueryForm,
  IComplexsnapshotQueryRequest
} from '~/api/models/snapshotRequest'

const { t } = useI18n()
const snapshotFormRef = ref<FormInstance>()

const showTorrentSizeTooltip = ref<boolean>(false)
const showFromPeerTrafficTooltip = ref<boolean>(false)
const showToPeerTrafficTooltip = ref<boolean>(false)
const showFromPeerTrafficSpeedTooltip = ref<boolean>(false)
const showToPeerTrafficSpeedTooltip = ref<boolean>(false)
const showSortByTooltip = ref<boolean>(false)

const snapshotForm = reactive<IComplexsnapshotQueryForm>({} as IComplexsnapshotQueryForm)

const validatePeerIdItem = (rule: any, value: any, callback: any) => {
  if (
    (!snapshotForm.peerId && snapshotForm.peerIdCompareMethod) ||
    (snapshotForm.peerId && !snapshotForm.peerIdCompareMethod)
  ) {
    callback(new Error('peerId and peerIdCompareMethod is both required'))
  } else {
    callback()
  }
}

const validatePeerClientNameItem = (rule: any, value: any, callback: any) => {
  if (
    (!snapshotForm.peerClientName && snapshotForm.peerClientNameCompareMethod) ||
    (snapshotForm.peerClientName && !snapshotForm.peerClientNameCompareMethod)
  ) {
    callback(new Error('peerClientName and peerClientNameCompareMethod is both required'))
  } else {
    callback()
  }
}

const validatePeerIpItem = (rule: any, value: any, callback: any) => {
  if (
    (!snapshotForm.peerIp && snapshotForm.peerIpCompareMethod) ||
    (snapshotForm.peerIp && !snapshotForm.peerIpCompareMethod)
  ) {
    callback(new Error('peerIp and peerIpCompareMethod is both required'))
  } else {
    callback()
  }
}

const validatePeerPortItem = (rule: any, value: any, callback: any) => {
  if (
    (!snapshotForm.peerPort && snapshotForm.peerPortCompareMethod) ||
    (snapshotForm.peerPort && !snapshotForm.peerPortCompareMethod)
  ) {
    callback(new Error('peerPort and peerPortCompareMethod is both required'))
  } else if (snapshotForm.peerPort && snapshotForm.peerPort < 0) {
    callback(new Error('peerPort must be greater than or equal to 0'))
  } else {
    callback()
  }
}

const validateTorrentIdentifierItem = (rule: any, value: any, callback: any) => {
  if (
    (!snapshotForm.torrentIdentifier && snapshotForm.torrentIdentifierCompareMethod) ||
    (snapshotForm.torrentIdentifier && !snapshotForm.torrentIdentifierCompareMethod)
  ) {
    callback(new Error('torrentIdentifier and torrentIdentifierCompareMethod is both required'))
  } else {
    callback()
  }
}

const validateTorrentSizeItem = (rule: any, value: any, callback: any) => {
  if (
    (!snapshotForm.torrentSize && snapshotForm.torrentSizeCompareMethod) ||
    (snapshotForm.torrentSize && !snapshotForm.torrentSizeCompareMethod)
  ) {
    callback(new Error('torrentSize and torrentSizeCompareMethod is both required'))
  } else if (snapshotForm.torrentSize && snapshotForm.torrentSize < 0) {
    callback(new Error('torrentSize must be greater than or equal to 0'))
  } else {
    callback()
  }
}

const validateFromPeerTrafficItem = (rule: any, value: any, callback: any) => {
  if (
    (!snapshotForm.fromPeerTraffic && snapshotForm.fromPeerTrafficCompareMethod) ||
    (snapshotForm.fromPeerTraffic && !snapshotForm.fromPeerTrafficCompareMethod)
  ) {
    callback(new Error('fromPeerTraffic and fromPeerTrafficCompareMethod is both required'))
  } else if (snapshotForm.fromPeerTraffic && snapshotForm.fromPeerTraffic < 0) {
    callback(new Error('fromPeerTraffic must be greater than or equal to 0'))
  } else {
    callback()
  }
}

const validateFromPeerTrafficSpeedItem = (rule: any, value: any, callback: any) => {
  if (
    (!snapshotForm.fromPeerTrafficSpeed && snapshotForm.fromPeerTrafficSpeedCompareMethod) ||
    (snapshotForm.fromPeerTrafficSpeed && !snapshotForm.fromPeerTrafficSpeedCompareMethod)
  ) {
    callback(
      new Error('fromPeerTrafficSpeed and fromPeerTrafficSpeedCompareMethod is both required')
    )
  } else if (snapshotForm.fromPeerTrafficSpeed && snapshotForm.fromPeerTrafficSpeed < 0) {
    callback(new Error('fromPeerTrafficSpeed must be greater than or equal to 0'))
  } else {
    callback()
  }
}

const validateToPeerTrafficItem = (rule: any, value: any, callback: any) => {
  if (
    (!snapshotForm.toPeerTraffic && snapshotForm.toPeerTrafficCompareMethod) ||
    (snapshotForm.toPeerTraffic && !snapshotForm.toPeerTrafficCompareMethod)
  ) {
    callback(new Error('toPeerTraffic and toPeerTrafficCompareMethod is both required'))
  } else if (snapshotForm.toPeerTraffic && snapshotForm.toPeerTraffic < 0) {
    callback(new Error('toPeerTraffic must be greater than or equal to 0'))
  } else {
    callback()
  }
}

const validateToPeerTrafficSpeedItem = (rule: any, value: any, callback: any) => {
  if (
    (!snapshotForm.toPeerTrafficSpeed && snapshotForm.toPeerTrafficSpeedCompareMethod) ||
    (snapshotForm.toPeerTrafficSpeed && !snapshotForm.toPeerTrafficSpeedCompareMethod)
  ) {
    callback(new Error('toPeerTrafficSpeed and toPeerTrafficSpeedCompareMethod is both required'))
  } else if (snapshotForm.toPeerTrafficSpeed && snapshotForm.toPeerTrafficSpeed < 0) {
    callback(new Error('toPeerTrafficSpeed must be greater than or equal to 0'))
  } else {
    callback()
  }
}

const validatePeerProgressItem = (rule: any, value: any, callback: any) => {
  if (
    (!snapshotForm.peerProgress && snapshotForm.peerProgressCompareMethod) ||
    (snapshotForm.peerProgress && !snapshotForm.peerProgressCompareMethod)
  ) {
    callback(new Error('peerProgress and peerProgressCompareMethod is both required'))
  } else if (snapshotForm.peerProgress && snapshotForm.peerProgress < 0) {
    callback(new Error('peerProgress must be greater than or equal to 0'))
  } else {
    callback()
  }
}

const validateDownloaderProgressItem = (rule: any, value: any, callback: any) => {
  if (
    (!snapshotForm.downloaderProgress && snapshotForm.downloaderProgressCompareMethod) ||
    (snapshotForm.downloaderProgress && !snapshotForm.downloaderProgressCompareMethod)
  ) {
    callback(new Error('downloaderProgress and downloaderProgressCompareMethod is both required'))
  } else if (snapshotForm.downloaderProgress && snapshotForm.downloaderProgress < 0) {
    callback(new Error('downloaderProgress must be greater than or equal to 0'))
  } else {
    callback()
  }
}

const rules = reactive<FormRules<typeof snapshotForm>>({
  // trigger为blur时，对于下拉框无效，改为change
  peerId: [{ validator: validatePeerIdItem, trigger: 'change' }],
  peerClientName: [{ validator: validatePeerClientNameItem, trigger: 'change' }],
  peerIp: [{ validator: validatePeerIpItem, trigger: 'change' }],
  peerPort: [{ validator: validatePeerPortItem, trigger: 'change' }],
  torrentIdentifier: [{ validator: validateTorrentIdentifierItem, trigger: 'change' }],
  torrentSize: [{ validator: validateTorrentSizeItem, trigger: 'change' }],
  fromPeerTraffic: [{ validator: validateFromPeerTrafficItem, trigger: 'change' }],
  fromPeerTrafficSpeed: [{ validator: validateFromPeerTrafficSpeedItem, trigger: 'change' }],
  toPeerTraffic: [{ validator: validateToPeerTrafficItem, trigger: 'change' }],
  toPeerTrafficSpeed: [{ validator: validateToPeerTrafficSpeedItem, trigger: 'change' }],
  peerProgress: [{ validator: validatePeerProgressItem, trigger: 'change' }],
  downloaderProgress: [{ validator: validateDownloaderProgressItem, trigger: 'change' }]
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
      emit('submit', snapshotForm as IComplexsnapshotQueryRequest)
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
