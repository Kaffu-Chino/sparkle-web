<template>
  <el-card shadow="never" v-loading="loading">
    <template #header>
      <el-space style="justify-content: space-between; display: flex">
        <el-space>
          {{ t('banHistoryView.banHistoryTable.title') }}
          <el-button :title="t('global.refresh')" @click="fetchData" text circle>
            <el-icon size="large"><ElRefresh /></el-icon>
          </el-button>
        </el-space>
        <el-space>
          <el-button size="large" type="primary" @click="toggleSearch" link>
            <el-icon size="large" class="el-icon--left">
              <ElArrowUp v-if="showSearchForm" />
              <ElArrowDown v-else />
            </el-icon>
            {{ t('banHistoryView.banHistoryTable.advancedSearch') }}
          </el-button>
        </el-space>
      </el-space>
    </template>
    <template #default>
      <el-table :data="results" style="width: 100%">
        <template #empty>
          <el-empty description="No Data" />
        </template>
        <el-table-column type="expand">
          <template #default="scope">
            <div style="margin: 0 8px">
              <el-descriptions
                :title="
                  t('banHistoryView.banHistoryTable.columns.expand.moreInfoDescriptions.title')
                "
                :column="1"
              >
                <el-descriptions-item
                  :label="
                    t(
                      'banHistoryView.banHistoryTable.columns.expand.moreInfoDescriptions.items.peerFlags'
                    )
                  "
                >
                  {{ scope.row.flags }}
                  <el-tooltip v-if="scope.row.flags" placement="right">
                    <template #content>
                      <el-space direction="vertical" alignment="start">
                        <span
                          v-for="descripItem in convertFlagsToDescripMap(scope.row.flags)"
                          :key="descripItem.key"
                        >
                          {{ descripItem.key }} - {{ t(descripItem.value) }}
                        </span>
                      </el-space>
                    </template>
                    <el-icon class="el-icon--right">
                      <ElInfoFilled />
                    </el-icon>
                  </el-tooltip>
                </el-descriptions-item>
                <el-descriptions-item
                  :label="
                    t(
                      'banHistoryView.banHistoryTable.columns.expand.moreInfoDescriptions.items.banModule'
                    )
                  "
                >
                  {{ scope.row.module }}
                </el-descriptions-item>
                <el-descriptions-item
                  :label="
                    t(
                      'banHistoryView.banHistoryTable.columns.expand.moreInfoDescriptions.items.submitterAppId'
                    )
                  "
                >
                  {{ scope.row.appId }}
                </el-descriptions-item>
              </el-descriptions>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          :label="t('banHistoryView.banHistoryTable.columns.peerAddress')"
          width="230"
        >
          <template #default="scope">
            <el-popover effect="light" trigger="hover" placement="right" width="auto">
              <template #default>
                <ul class="hover-menu">
                  <li class="hover-menu-item">
                    <el-space>
                      <el-icon class="el-icon--left"> <ElCopyDocument /> </el-icon>
                      {{ t('global.copy') }}
                    </el-space>
                  </li>
                  <li class="hover-menu-item">
                    <el-space>
                      <el-icon class="el-icon--left"> <ElHistogram /> </el-icon>
                      {{ t('banHistoryView.banHistoryTable.columns.peerId.menuItems.ipAnalysis') }}
                    </el-space>
                  </li>
                </ul>
              </template>
              <template #reference>
                <el-tag class="ip-display-tag" type="info">
                  {{ scope.row.peerIp }}:{{ scope.row.peerPort }}
                </el-tag>
              </template>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column :label="t('banHistoryView.banHistoryTable.columns.peerId')" width="120">
          <template #default="scope">
            <el-space :size="0">
              {{ scope.row.peerId }}
              <el-tooltip :content="scope.row.peerClientName" placement="top">
                <el-icon class="el-icon--right">
                  <ElInfoFilled />
                </el-icon>
              </el-tooltip>
            </el-space>
          </template>
        </el-table-column>
        <el-table-column
          :label="t('banHistoryView.banHistoryTable.columns.networkSnapshot')"
          width="180"
        >
          <template #default="scope">
            <el-space style="width: 100%; justify-content: space-between">
              <el-space>
                <el-space direction="vertical" alignment="start">
                  <el-text>
                    <el-text type="success">
                      <el-icon><ElSortUp /></el-icon>
                    </el-text>
                    {{ formatFileSize(scope.row.toPeerTraffic) }}
                  </el-text>
                  <el-text>
                    <el-text type="danger">
                      <el-icon><ElSortDown /></el-icon>
                    </el-text>
                    {{ formatFileSize(scope.row.fromPeerTraffic) }}
                  </el-text>
                </el-space>
                <el-popover effect="light" trigger="hover" placement="top" width="auto">
                  <template #default>
                    <el-space direction="vertical" alignment="start">
                      <el-text>
                        <el-text type="success">
                          <el-icon><ElOdometer /></el-icon>
                          <el-icon><ElSortUp /></el-icon>
                        </el-text>
                        {{ formatSpeedSize(scope.row.toPeerTrafficSpeed) }}
                      </el-text>
                      <el-text>
                        <el-text type="danger">
                          <el-icon><ElOdometer /></el-icon>
                          <el-icon><ElSortDown /></el-icon>
                        </el-text>
                        {{ formatSpeedSize(scope.row.fromPeerTrafficSpeed) }}
                      </el-text>
                    </el-space>
                  </template>
                  <template #reference>
                    <el-icon class="el-icon--right">
                      <ElMore />
                    </el-icon>
                  </template>
                </el-popover>
              </el-space>
              <el-tooltip placement="top">
                <template #content>
                  {{
                    t('banHistoryView.banHistoryTable.columns.networkSnapshot.tooltip.peerProgress')
                  }}
                  {{ (scope.row.peerProgress * 100).toFixed(2) }}%
                </template>
                <el-progress
                  type="circle"
                  stroke-linecap="butt"
                  :percentage="scope.row.peerProgress * 100"
                  :width="24"
                  :show-text="false"
                  :stroke-width="5"
                />
              </el-tooltip>
            </el-space>
          </template>
        </el-table-column>
        <el-table-column :label="t('banHistoryView.banHistoryTable.columns.torrentInfo')">
          <el-table-column
            :label="t('banHistoryView.banHistoryTable.columns.torrentInfo.columns.types')"
            width="100"
            align="center"
          >
            <template #default="scope">
              <el-tag v-if="scope.row.torrent.privateTorrent" type="warning">{{
                t('banHistoryView.banHistoryTable.columns.torrentInfo.columns.types.bt')
              }}</el-tag>
              <el-tag v-else type="info">{{
                t('banHistoryView.banHistoryTable.columns.torrentInfo.columns.types.bt')
              }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            :label="t('banHistoryView.banHistoryTable.columns.torrentInfo.columns.identifier')"
            min-width="200"
            show-overflow-tooltip
          >
            <template #default="scope">
              {{ scope.row.torrent.identifier }}
            </template>
          </el-table-column>
          <el-table-column
            :label="t('banHistoryView.banHistoryTable.columns.torrentInfo.columns.torrentSize')"
            width="120"
          >
            <template #default="scope">
              {{ formatFileSize(scope.row.torrent.size) }}
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="t('banHistoryView.banHistoryTable.columns.banInfo')">
          <el-table-column
            :label="t('banHistoryView.banHistoryTable.columns.banInfo.columns.btnBan')"
            width="100"
            align="center"
          >
            <template #default="scope">
              <el-tag v-if="scope.row.btnBan" type="success" round>
                <el-icon><ElSelect /></el-icon>
              </el-tag>
              <el-tag v-else type="info" round>
                <el-icon><ElSemiSelect /></el-icon>
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column
            :label="t('banHistoryView.banHistoryTable.columns.banInfo.columns.banReason')"
            min-width="200"
            show-overflow-tooltip
          >
            <template #default="scope">
              {{ scope.row.rule }}
            </template>
          </el-table-column>
        </el-table-column>
      </el-table>
      <div>
        <el-pagination
          background
          layout="prev, pager, next, sizes, jumper, total"
          :page-sizes="[10, 20, 30, 40, 50, 100]"
          :total="total()"
          v-model:current-page="pagination.page"
          v-model:page-size="pagination.pageSize"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </template>
  </el-card>
</template>

<script lang="ts" setup>
import {
  Refresh as ElRefresh,
  ArrowUp as ElArrowUp,
  ArrowDown as ElArrowDown,
  CopyDocument as ElCopyDocument,
  Histogram as ElHistogram,
  InfoFilled as ElInfoFilled,
  Odometer as ElOdometer,
  SortUp as ElSortUp,
  SortDown as ElSortDown,
  More as ElMore,
  Select as ElSelect,
  SemiSelect as ElSemiSelect
} from '@element-plus/icons-vue'
import { onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import type { IBanHistory } from '~/api/models/banHistory'
import type { IPagination } from '~/api/models/pagination'
import type { IPaginationRequest } from '~/api/models/paginationRequest'
import type { IComplexBanHistoryQueryRequest } from '~/api/models/banHistoryRequest'
import { complexBanHistoryQuery, listBanHistory } from '~/api/banHistoryService'
import { formatFileSize, formatSpeedSize } from '~/utils/file'
import { convertFlagsToDescripMap } from '~/utils/converter'

const { t } = useI18n()

const showSearchForm = ref<boolean>(false)
const pagination = ref<IPaginationRequest>({
  page: 1,
  pageSize: 10
})

const data = ref<null | IPagination<IBanHistory>>(null)
const results = ref<null | IBanHistory[]>(null)

function total() {
  return data.value?.total || 0
}

const emit = defineEmits(['toggle:search', 'error'])

const loading = defineModel<Boolean>('loading', {
  default: false
})
const complexBanQuery = defineModel<IComplexBanHistoryQueryRequest | null>('param', {
  default: null
})

const toggleSearch = () => {
  showSearchForm.value = !showSearchForm.value
  emit('toggle:search', showSearchForm.value)
}

const fetchData = async () => {
  loading.value = true
  if (showSearchForm.value && complexBanQuery.value) {
    data.value = (await complexBanHistoryQuery(complexBanQuery.value, pagination.value)).data.data
  } else {
    data.value = (await listBanHistory(pagination.value)).data.data
  }
  results.value = data.value.results
  loading.value = false
}

const handleSizeChange = () => {
  fetchData()
}

const handleCurrentChange = () => {
  fetchData()
}

// 监听complexBanQuery的变化，当complexBanQuery变化时，重新获取数据
watch(complexBanQuery, () => {
  fetchData()
})

defineExpose({
  fetchData
})

onMounted(() => {
  fetchData()
})
</script>
<style lang="scss" scoped>
.ip-display-tag {
  padding: 6px 5px;
  height: unset;
  white-space: normal;
  overflow-wrap: anywhere;
  color: var(--el-table-text-color);
  transition: 0.1s;
  &:hover {
    color: var(--el-color-primary);
  }
}

.hover-menu {
  cursor: default;
  .hover-menu-item {
    padding: 5px 10px;
    transition:
      border-color var(--el-transition-duration),
      background-color var(--el-transition-duration),
      color var(--el-transition-duration);
    &:hover {
      color: var(--el-color-primary);
      background-color: var(--el-color-primary-light-9);
    }
  }
}

.el-pagination {
  margin-top: 20px;
  justify-content: flex-end;
}
</style>
