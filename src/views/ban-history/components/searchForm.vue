<template>
  <el-card class="form-card" shadow="never">
    <template #header>
      <el-text size="large">{{ t('banHistoryView.searchForm.title') }}</el-text>
    </template>
    <el-form
      label-position="right"
      label-width="160px"
      ref="banHistoryFormRef"
      :rules="rules"
      :model="banHistoryForm"
      scroll-to-error
    >
      <el-row :gutter="10">
        <el-col :xs="24" :sm="20" :md="16" :lg="12" :xl="8">
          <el-form-item
            :label="t('banHistoryView.searchForm.formItems.timeRange')"
            prop="dateTimeRange"
            required
          >
            <!-- shortcuts不能放script里多国语言切换会失效 -->
            <el-date-picker
              type="datetimerange"
              :shortcuts="[
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
                    start.setDate(start.getDate() - 30)
                    return [start, end]
                  }
                }
              ]"
              v-model="banHistoryForm.dateTimeRange"
              @change="
                (val: Array<Date>) => {
                  if (val != null) {
                    banHistoryForm.timeFrom = dayjs(val[0]).valueOf()
                    banHistoryForm.timeTo = dayjs(val[1]).valueOf()
                  }
                }
              "
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-divider>
        {{ t('banHistoryView.searchForm.sections.peerBasicInformation') }}
      </el-divider>
      <el-row :gutter="16">
        <el-col :xs="24" :sm="20" :md="16" :lg="12" :xl="8">
          <el-form-item :label="t('banHistoryView.searchForm.formItems.peerId')" prop="peerId">
            <el-input v-model="banHistoryForm.peerId" clearable>
              <template #prepend>
                <el-select
                  :placeholder="
                    t('banHistoryView.searchForm.formItems.compareMethodSelect.placeholder')
                  "
                  style="width: 160px"
                  v-model="banHistoryForm.peerIdCompareMethod"
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
            :label="t('banHistoryView.searchForm.formItems.peerClientName')"
            prop="peerClientName"
          >
            <el-input v-model="banHistoryForm.peerClientName" clearable>
              <template #prepend>
                <el-select
                  :placeholder="
                    t('banHistoryView.searchForm.formItems.compareMethodSelect.placeholder')
                  "
                  style="width: 160px"
                  v-model="banHistoryForm.peerClientNameCompareMethod"
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
          <el-form-item :label="t('banHistoryView.searchForm.formItems.peerIp')" prop="peerIp">
            <el-input placeholder="IPv4/IPv6" v-model="banHistoryForm.peerIp" clearable>
              <template #prepend>
                <el-select
                  :placeholder="
                    t('banHistoryView.searchForm.formItems.compareMethodSelect.placeholder')
                  "
                  style="width: 160px"
                  v-model="banHistoryForm.peerIpCompareMethod"
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
          <el-form-item :label="t('banHistoryView.searchForm.formItems.peerPort')" prop="peerPort">
            <el-input type="number" v-model="banHistoryForm.peerPort" clearable>
              <template #prepend>
                <el-select
                  :placeholder="
                    t('banHistoryView.searchForm.formItems.compareMethodSelect.placeholder')
                  "
                  style="width: 160px"
                  v-model="banHistoryForm.peerPortCompareMethod"
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
      <el-divider> {{ t('banHistoryView.searchForm.sections.torrentInformation') }} </el-divider>
      <el-row :gutter="16">
        <el-col :xs="24" :sm="20" :md="16" :lg="12" :xl="8">
          <el-form-item
            :label="t('banHistoryView.searchForm.formItems.torrentIdentifier')"
            prop="torrentIdentifier"
          >
            <el-input placeholder="Hash" v-model="banHistoryForm.torrentIdentifier" clearable>
              <template #prepend>
                <el-select
                  :placeholder="
                    t('banHistoryView.searchForm.formItems.compareMethodSelect.placeholder')
                  "
                  style="width: 160px"
                  v-model="banHistoryForm.torrentIdentifierCompareMethod"
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
            :label="t('banHistoryView.searchForm.formItems.torrentSize')"
            prop="torrentSize"
          >
            <!--tooltip 关联组件为 input 时 trigger="focus" 不行([issues/18220])，暂时先用受控模式 -->
            <el-tooltip placement="right" :visible="showTorrentSizeTooltip">
              <template #content>
                ≈
                {{ formatFileSize(banHistoryForm.torrentSize ? banHistoryForm.torrentSize : -1) }}
              </template>
              <el-input
                type="number"
                @focus="showTorrentSizeTooltip = true"
                @blur="showTorrentSizeTooltip = false"
                v-model="banHistoryForm.torrentSize"
                clearable
              >
                <template #prepend>
                  <el-select
                    :placeholder="
                      t('banHistoryView.searchForm.formItems.compareMethodSelect.placeholder')
                    "
                    style="width: 160px"
                    v-model="banHistoryForm.torrentSizeCompareMethod"
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
      <el-divider> {{ t('banHistoryView.searchForm.sections.trafficInformation') }} </el-divider>
      <el-row :gutter="16">
        <el-col :xs="24" :sm="20" :md="16" :lg="12" :xl="8">
          <el-form-item
            :label="t('banHistoryView.searchForm.formItems.fromPeerTraffic')"
            prop="fromPeerTraffic"
          >
            <!--tooltip 关联组件为 input 时 trigger="focus" 不行([issues/18220])，暂时先用受控模式 -->
            <el-tooltip placement="right" :visible="showFromPeerTrafficTooltip">
              <template #content>
                ≈
                {{
                  formatFileSize(
                    banHistoryForm.fromPeerTraffic ? banHistoryForm.fromPeerTraffic : -1
                  )
                }}
              </template>
              <el-input
                type="number"
                @focus="showFromPeerTrafficTooltip = true"
                @blur="showFromPeerTrafficTooltip = false"
                v-model="banHistoryForm.fromPeerTraffic"
                clearable
              >
                <template #prepend>
                  <el-select
                    :placeholder="
                      t('banHistoryView.searchForm.formItems.compareMethodSelect.placeholder')
                    "
                    style="width: 160px"
                    v-model="banHistoryForm.fromPeerTrafficCompareMethod"
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
            :label="t('banHistoryView.searchForm.formItems.fromPeerTrafficSpeed')"
            prop="fromPeerTrafficSpeed"
          >
            <!--tooltip 关联组件为 input 时 trigger="focus" 不行([issues/18220])，暂时先用受控模式 -->
            <el-tooltip placement="right" :visible="showFromPeerTrafficSpeedTooltip">
              <template #content>
                ≈
                {{
                  formatSpeedSize(
                    banHistoryForm.fromPeerTrafficSpeed ? banHistoryForm.fromPeerTrafficSpeed : -1
                  )
                }}
              </template>
              <el-input
                type="number"
                @focus="showFromPeerTrafficSpeedTooltip = true"
                @blur="showFromPeerTrafficSpeedTooltip = false"
                v-model="banHistoryForm.fromPeerTrafficSpeed"
                clearable
              >
                <template #prepend>
                  <el-select
                    :placeholder="
                      t('banHistoryView.searchForm.formItems.compareMethodSelect.placeholder')
                    "
                    style="width: 160px"
                    v-model="banHistoryForm.fromPeerTrafficSpeedCompareMethod"
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
            :label="t('banHistoryView.searchForm.formItems.toPeerTraffic')"
            prop="toPeerTraffic"
          >
            <!--tooltip 关联组件为 input 时 trigger="focus" 不行([issues/18220])，暂时先用受控模式 -->
            <el-tooltip placement="right" :visible="showToPeerTrafficTooltip">
              <template #content>
                ≈
                {{
                  formatFileSize(banHistoryForm.toPeerTraffic ? banHistoryForm.toPeerTraffic : -1)
                }}
              </template>
              <el-input
                type="number"
                @focus="showToPeerTrafficTooltip = true"
                @blur="showToPeerTrafficTooltip = false"
                v-model="banHistoryForm.toPeerTraffic"
                clearable
              >
                <template #prepend>
                  <el-select
                    :placeholder="
                      t('banHistoryView.searchForm.formItems.compareMethodSelect.placeholder')
                    "
                    style="width: 160px"
                    v-model="banHistoryForm.toPeerTrafficCompareMethod"
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
            :label="t('banHistoryView.searchForm.formItems.toPeerTrafficSpeed')"
            prop="toPeerTrafficSpeed"
          >
            <!--tooltip 关联组件为 input 时 trigger="focus" 不行([issues/18220])，暂时先用受控模式 -->
            <el-tooltip placement="right" :visible="showToPeerTrafficSpeedTooltip">
              <template #content>
                ≈
                {{
                  formatFileSize(
                    banHistoryForm.toPeerTrafficSpeed ? banHistoryForm.toPeerTrafficSpeed : -1
                  )
                }}
              </template>
              <el-input
                type="number"
                @focus="showToPeerTrafficSpeedTooltip = true"
                @blur="showToPeerTrafficSpeedTooltip = false"
                v-model="banHistoryForm.toPeerTrafficSpeed"
                clearable
              >
                <template #prepend>
                  <el-select
                    :placeholder="
                      t('banHistoryView.searchForm.formItems.compareMethodSelect.placeholder')
                    "
                    style="width: 160px"
                    v-model="banHistoryForm.toPeerTrafficSpeedCompareMethod"
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
            :label="t('banHistoryView.searchForm.formItems.peerProgress')"
            prop="peerProgress"
          >
            <el-input
              type="number"
              @change="
                () => {
                  if (banHistoryForm.peerProgressPercentage) {
                    banHistoryForm.peerProgress = banHistoryForm.peerProgressPercentage / 100
                  }
                }
              "
              v-model="banHistoryForm.peerProgressPercentage"
              clearable
            >
              <template #prepend>
                <el-select
                  :placeholder="
                    t('banHistoryView.searchForm.formItems.compareMethodSelect.placeholder')
                  "
                  style="width: 160px"
                  v-model="banHistoryForm.peerProgressCompareMethod"
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
            :label="t('banHistoryView.searchForm.formItems.downloaderProgress')"
            prop="downloaderProgress"
          >
            <el-input
              type="number"
              @change="
                () => {
                  if (banHistoryForm.downloaderProgressPercentage) {
                    banHistoryForm.downloaderProgress =
                      banHistoryForm.downloaderProgressPercentage / 100
                  }
                }
              "
              v-model="banHistoryForm.downloaderProgressPercentage"
              clearable
            >
              <template #prepend>
                <el-select
                  :placeholder="
                    t('banHistoryView.searchForm.formItems.compareMethodSelect.placeholder')
                  "
                  style="width: 160px"
                  v-model="banHistoryForm.downloaderProgressCompareMethod"
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
      <el-divider> {{ t('banHistoryView.searchForm.sections.banInformation') }} </el-divider>
      <el-row :gutter="16">
        <el-col :xs="24" :sm="20" :md="16" :lg="12" :xl="8">
          <el-form-item :label="t('banHistoryView.searchForm.formItems.module')" prop="module">
            <el-input v-model="banHistoryForm.module" clearable>
              <template #prepend>
                <el-select
                  :placeholder="
                    t('banHistoryView.searchForm.formItems.compareMethodSelect.placeholder')
                  "
                  style="width: 160px"
                  v-model="banHistoryForm.moduleCompareMethod"
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
        <el-col :span="24">
          <el-form-item :label="t('banHistoryView.searchForm.formItems.rule')" prop="rule">
            <div style="width: 100%">
              <el-select
                :placeholder="
                  t('banHistoryView.searchForm.formItems.compareMethodSelect.placeholder')
                "
                style="width: 160px"
                v-model="banHistoryForm.ruleCompareMethod"
                clearable
              >
                <el-option
                  v-for="(value, key) in StringCompareMethod"
                  :key="key"
                  :label="t('global.enums.StringCompareMethod.tips.' + value)"
                  :value="value"
                />
              </el-select>
              <el-input
                type="textarea"
                style="width: 100%; margin-top: 10px"
                maxlength="50"
                show-word-limit
                v-model="banHistoryForm.rule"
              >
              </el-input>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item :label="t('banHistoryView.searchForm.formItems.btnBan')">
            <el-space>
              <el-radio-group v-model="banHistoryForm.btnBan">
                <el-radio :value="true" size="large">{{
                  t('banHistoryView.searchForm.formItems.btnBan.options.yes')
                }}</el-radio>
                <el-radio :value="false" size="large">{{
                  t('banHistoryView.searchForm.formItems.btnBan.options.no')
                }}</el-radio>
              </el-radio-group>
              <el-button
                v-if="banHistoryForm.btnBan != undefined"
                @click="banHistoryForm.btnBan = undefined"
                link
              >
                <el-icon><ElCircleClose /></el-icon
              ></el-button>
            </el-space>
          </el-form-item>
        </el-col>
      </el-row>
      <el-divider> {{ t('banHistoryView.searchForm.sections.searchSettings') }} </el-divider>
      <el-row :gutter="16">
        <el-col :xs="24" :sm="20" :md="16" :lg="12" :xl="8">
          <el-form-item :label="t('banHistoryView.searchForm.formItems.sortBy')">
            <!--tooltip 关联组件为 input 时 trigger="focus" 不行([issues/18220])，暂时先用受控模式 -->
            <el-tooltip placement="right" :visible="showSortByTooltip">
              <template #content>
                {{ t('banHistoryView.searchForm.formItems.sortBy.tooltips.inputTip') }}
              </template>
              <el-input-tag
                @focus="showSortByTooltip = true"
                @blur="showSortByTooltip = false"
                v-model="banHistoryForm.sortBy"
                clearable
              />
            </el-tooltip>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="20" :md="16" :lg="12" :xl="8">
          <el-form-item :label="t('banHistoryView.searchForm.formItems.sortOrder')">
            <el-input v-model="banHistoryForm.sortOrder" clearable> </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item>
            <el-checkbox
              :indeterminate="banHistoryForm.orConnector === undefined"
              v-model="banHistoryForm.orConnector"
            >
              {{ t('banHistoryView.searchForm.formItems.orConnector') }}
            </el-checkbox>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xs="24" :sm="20" :md="16" :lg="12" :xl="8">
          <el-form-item>
            <el-button type="primary" @click="submitForm(banHistoryFormRef)" :loading="loading">{{
              t('global.form.submit')
            }}</el-button>
            <el-button @click="resetForm(banHistoryFormRef)" :loading="loading">{{
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
import { CircleClose as ElCircleClose } from '@element-plus/icons-vue'
import { StringCompareMethod, NumberCompareMethod } from '~/enums/compareMethod'
import { formatFileSize, formatSpeedSize } from '~/utils/file'
import type {
  IComplexBanHistoryQueryForm,
  IComplexBanHistoryQueryRequest
} from '~/api/models/banHistoryRequest'

const { t } = useI18n()
const banHistoryFormRef = ref<FormInstance>()

const showTorrentSizeTooltip = ref<boolean>(false)
const showFromPeerTrafficTooltip = ref<boolean>(false)
const showToPeerTrafficTooltip = ref<boolean>(false)
const showFromPeerTrafficSpeedTooltip = ref<boolean>(false)
const showToPeerTrafficSpeedTooltip = ref<boolean>(false)
const showSortByTooltip = ref<boolean>(false)

const banHistoryForm = reactive<IComplexBanHistoryQueryForm>({} as IComplexBanHistoryQueryForm)

const validatePeerIdItem = (rule: any, value: any, callback: any) => {
  if (
    (!banHistoryForm.peerId && banHistoryForm.peerIdCompareMethod) ||
    (banHistoryForm.peerId && !banHistoryForm.peerIdCompareMethod)
  ) {
    callback(new Error('peerId and peerIdCompareMethod is both required'))
  } else {
    callback()
  }
}

const validatePeerClientNameItem = (rule: any, value: any, callback: any) => {
  if (
    (!banHistoryForm.peerClientName && banHistoryForm.peerClientNameCompareMethod) ||
    (banHistoryForm.peerClientName && !banHistoryForm.peerClientNameCompareMethod)
  ) {
    callback(new Error('peerClientName and peerClientNameCompareMethod is both required'))
  } else {
    callback()
  }
}

const validatePeerIpItem = (rule: any, value: any, callback: any) => {
  if (
    (!banHistoryForm.peerIp && banHistoryForm.peerIpCompareMethod) ||
    (banHistoryForm.peerIp && !banHistoryForm.peerIpCompareMethod)
  ) {
    callback(new Error('peerIp and peerIpCompareMethod is both required'))
  } else {
    callback()
  }
}

const validatePeerPortItem = (rule: any, value: any, callback: any) => {
  if (
    (!banHistoryForm.peerPort && banHistoryForm.peerPortCompareMethod) ||
    (banHistoryForm.peerPort && !banHistoryForm.peerPortCompareMethod)
  ) {
    callback(new Error('peerPort and peerPortCompareMethod is both required'))
  } else if (banHistoryForm.peerPort && banHistoryForm.peerPort < 0) {
    callback(new Error('peerPort must be greater than or equal to 0'))
  } else {
    callback()
  }
}

const validateTorrentIdentifierItem = (rule: any, value: any, callback: any) => {
  if (
    (!banHistoryForm.torrentIdentifier && banHistoryForm.torrentIdentifierCompareMethod) ||
    (banHistoryForm.torrentIdentifier && !banHistoryForm.torrentIdentifierCompareMethod)
  ) {
    callback(new Error('torrentIdentifier and torrentIdentifierCompareMethod is both required'))
  } else {
    callback()
  }
}

const validateTorrentSizeItem = (rule: any, value: any, callback: any) => {
  if (
    (!banHistoryForm.torrentSize && banHistoryForm.torrentSizeCompareMethod) ||
    (banHistoryForm.torrentSize && !banHistoryForm.torrentSizeCompareMethod)
  ) {
    callback(new Error('torrentSize and torrentSizeCompareMethod is both required'))
  } else if (banHistoryForm.torrentSize && banHistoryForm.torrentSize < 0) {
    callback(new Error('torrentSize must be greater than or equal to 0'))
  } else {
    callback()
  }
}

const validateFromPeerTrafficItem = (rule: any, value: any, callback: any) => {
  if (
    (!banHistoryForm.fromPeerTraffic && banHistoryForm.fromPeerTrafficCompareMethod) ||
    (banHistoryForm.fromPeerTraffic && !banHistoryForm.fromPeerTrafficCompareMethod)
  ) {
    callback(new Error('fromPeerTraffic and fromPeerTrafficCompareMethod is both required'))
  } else if (banHistoryForm.fromPeerTraffic && banHistoryForm.fromPeerTraffic < 0) {
    callback(new Error('fromPeerTraffic must be greater than or equal to 0'))
  } else {
    callback()
  }
}

const validateFromPeerTrafficSpeedItem = (rule: any, value: any, callback: any) => {
  if (
    (!banHistoryForm.fromPeerTrafficSpeed && banHistoryForm.fromPeerTrafficSpeedCompareMethod) ||
    (banHistoryForm.fromPeerTrafficSpeed && !banHistoryForm.fromPeerTrafficSpeedCompareMethod)
  ) {
    callback(
      new Error('fromPeerTrafficSpeed and fromPeerTrafficSpeedCompareMethod is both required')
    )
  } else if (banHistoryForm.fromPeerTrafficSpeed && banHistoryForm.fromPeerTrafficSpeed < 0) {
    callback(new Error('fromPeerTrafficSpeed must be greater than or equal to 0'))
  } else {
    callback()
  }
}

const validateToPeerTrafficItem = (rule: any, value: any, callback: any) => {
  if (
    (!banHistoryForm.toPeerTraffic && banHistoryForm.toPeerTrafficCompareMethod) ||
    (banHistoryForm.toPeerTraffic && !banHistoryForm.toPeerTrafficCompareMethod)
  ) {
    callback(new Error('toPeerTraffic and toPeerTrafficCompareMethod is both required'))
  } else if (banHistoryForm.toPeerTraffic && banHistoryForm.toPeerTraffic < 0) {
    callback(new Error('toPeerTraffic must be greater than or equal to 0'))
  } else {
    callback()
  }
}

const validateToPeerTrafficSpeedItem = (rule: any, value: any, callback: any) => {
  if (
    (!banHistoryForm.toPeerTrafficSpeed && banHistoryForm.toPeerTrafficSpeedCompareMethod) ||
    (banHistoryForm.toPeerTrafficSpeed && !banHistoryForm.toPeerTrafficSpeedCompareMethod)
  ) {
    callback(new Error('toPeerTrafficSpeed and toPeerTrafficSpeedCompareMethod is both required'))
  } else if (banHistoryForm.toPeerTrafficSpeed && banHistoryForm.toPeerTrafficSpeed < 0) {
    callback(new Error('toPeerTrafficSpeed must be greater than or equal to 0'))
  } else {
    callback()
  }
}

const validatePeerProgressItem = (rule: any, value: any, callback: any) => {
  if (
    (!banHistoryForm.peerProgress && banHistoryForm.peerProgressCompareMethod) ||
    (banHistoryForm.peerProgress && !banHistoryForm.peerProgressCompareMethod)
  ) {
    callback(new Error('peerProgress and peerProgressCompareMethod is both required'))
  } else if (banHistoryForm.peerProgress && banHistoryForm.peerProgress < 0) {
    callback(new Error('peerProgress must be greater than or equal to 0'))
  } else {
    callback()
  }
}

const validateDownloaderProgressItem = (rule: any, value: any, callback: any) => {
  if (
    (!banHistoryForm.downloaderProgress && banHistoryForm.downloaderProgressCompareMethod) ||
    (banHistoryForm.downloaderProgress && !banHistoryForm.downloaderProgressCompareMethod)
  ) {
    callback(new Error('downloaderProgress and downloaderProgressCompareMethod is both required'))
  } else if (banHistoryForm.downloaderProgress && banHistoryForm.downloaderProgress < 0) {
    callback(new Error('downloaderProgress must be greater than or equal to 0'))
  } else {
    callback()
  }
}

const validateModuleItem = (rule: any, value: any, callback: any) => {
  if (
    (!banHistoryForm.module && banHistoryForm.moduleCompareMethod) ||
    (banHistoryForm.module && !banHistoryForm.moduleCompareMethod)
  ) {
    callback(new Error('module and moduleCompareMethod is both required'))
  } else {
    callback()
  }
}

const validateRuleItem = (rule: any, value: any, callback: any) => {
  if (
    (!banHistoryForm.rule && banHistoryForm.ruleCompareMethod) ||
    (banHistoryForm.rule && !banHistoryForm.ruleCompareMethod)
  ) {
    callback(new Error('rule and ruleCompareMethod is both required'))
  } else {
    callback()
  }
}

const rules = reactive<FormRules<typeof banHistoryForm>>({
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
  downloaderProgress: [{ validator: validateDownloaderProgressItem, trigger: 'change' }],
  module: [{ validator: validateModuleItem, trigger: 'change' }],
  rule: [{ validator: validateRuleItem, trigger: 'change' }]
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
      emit('submit', banHistoryForm as IComplexBanHistoryQueryRequest)
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
