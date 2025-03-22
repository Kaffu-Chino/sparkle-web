<template>
  <el-card shadow="never" v-loading="loading">
    <template #header>
      <el-space style="justify-content: space-between; display: flex">
        <el-space>
          {{ t('snapshotView.snapshotTable.title') }}
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
            {{ t('snapshotView.snapshotTable.advancedSearch') }}
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
                :title="t('snapshotView.snapshotTable.columns.expand.moreInfoDescriptions.title')"
                :column="1"
              >
                <el-descriptions-item
                  :label="
                    t(
                      'snapshotView.snapshotTable.columns.expand.moreInfoDescriptions.items.submitterAppId'
                    )
                  "
                >
                  {{ scope.row.appId }}
                </el-descriptions-item>
                <el-descriptions-item
                  :label="
                    t(
                      'snapshotView.snapshotTable.columns.expand.moreInfoDescriptions.items.submitId'
                    )
                  "
                >
                  {{ scope.row.submitId }}
                </el-descriptions-item>
              </el-descriptions>
            </div>
          </template>
        </el-table-column>
        <el-table-column :label="t('snapshotView.snapshotTable.columns.peerAddress')" width="230">
          <template #default="scope">
            <el-popover effect="light" trigger="hover" placement="right" width="auto">
              <template #default>
                <ul class="hover-menu">
                  <li
                    class="hover-menu-item"
                    @click="copyContent(`${scope.row.peerIp}:${scope.row.peerPort}`)"
                  >
                    <el-space>
                      <el-icon class="el-icon--left"> <ElCopyDocument /> </el-icon>
                      {{ t('global.copy') }}
                    </el-space>
                  </li>
                  <li class="hover-menu-item" style="cursor: not-allowed" disabled>
                    <el-space>
                      <el-icon class="el-icon--left"> <ElHistogram /> </el-icon>
                      {{ t('snapshotView.snapshotTable.columns.peerId.menuItems.ipAnalysis') }}
                    </el-space>
                  </li>
                </ul>
              </template>
              <template #reference>
                <el-tag class="ip-display-tag" type="info">
                  {{ formatHostAddress(scope.row.peerIp, scope.row.peerPort) }}
                </el-tag>
              </template>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column :label="t('snapshotView.snapshotTable.columns.peerId')" width="120">
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
        <el-table-column :label="t('snapshotView.snapshotTable.columns.peerFlags')" width="160">
          <template #default="scope">
            <el-space :size="0">
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
            </el-space>
          </template>
        </el-table-column>
        <el-table-column
          :label="t('snapshotView.snapshotTable.columns.networkSnapshot')"
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
                  {{ t('snapshotView.snapshotTable.columns.networkSnapshot.tooltip.peerProgress') }}
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
        <el-table-column :label="t('snapshotView.snapshotTable.columns.torrentInfo')">
          <el-table-column
            :label="t('snapshotView.snapshotTable.columns.torrentInfo.columns.types')"
            width="100"
            align="center"
          >
            <template #default="scope">
              <el-tag v-if="scope.row.torrent.privateTorrent" type="warning">{{
                t('snapshotView.snapshotTable.columns.torrentInfo.columns.types.pt')
              }}</el-tag>
              <el-tag v-else type="info">{{
                t('snapshotView.snapshotTable.columns.torrentInfo.columns.types.bt')
              }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            :label="t('snapshotView.snapshotTable.columns.torrentInfo.columns.identifier')"
            min-width="200"
            show-overflow-tooltip
          >
            <template #default="scope">
              {{ scope.row.torrent.identifier }}
            </template>
          </el-table-column>
          <el-table-column
            :label="t('snapshotView.snapshotTable.columns.torrentInfo.columns.torrentSize')"
            width="120"
          >
            <template #default="scope">
              {{ formatFileSize(scope.row.torrent.size) }}
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
  More as ElMore
} from '@element-plus/icons-vue'
import clipboardCopy from 'clipboard-copy'
import { onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElNotification } from 'element-plus'
import type { ISnapshot } from '~/api/models/snapshot'
import type { IPagination } from '~/api/models/pagination'
import type { IPaginationRequest } from '~/api/models/paginationRequest'
import type { IComplexSnapshotQueryRequest } from '~/api/models/snapshotRequest'
import { complexSnapshotQuery, listSnapshot } from '~/api/snapshotService'
import { formatFileSize, formatSpeedSize } from '~/utils/file'
import { formatHostAddress } from '~/utils/ip'
import { convertFlagsToDescripMap } from '~/utils/converter'

const { t } = useI18n()

const showSearchForm = ref<boolean>(false)
const pagination = ref<IPaginationRequest>({
  page: 1,
  pageSize: 10
})

const data = ref<null | IPagination<ISnapshot>>(null)
const results = ref<null | ISnapshot[]>(null)

function total() {
  return data.value?.total || 0
}

const emit = defineEmits(['toggle:search', 'error'])

const loading = defineModel<Boolean>('loading', {
  default: false
})
const props = defineProps<{ param: IComplexSnapshotQueryRequest | null }>()

const toggleSearch = () => {
  showSearchForm.value = !showSearchForm.value
  emit('toggle:search', showSearchForm.value)
}

const fetchData = async () => {
  loading.value = true
  try {
    if (showSearchForm.value && props.param) {
      data.value = (await complexSnapshotQuery(props.param, pagination.value)).data.data
    } else {
      data.value = (await listSnapshot(pagination.value)).data.data
    }
    results.value = data.value.results
  } catch (e) {
    ElNotification.error({
      title: t('global.messages.error.fetchData'),
      message: String(e)
    })
  }
  loading.value = false
}

const handleSizeChange = () => {
  fetchData()
}

const handleCurrentChange = () => {
  fetchData()
}

const copyContent = async (content: string) => {
  try {
    await clipboardCopy(content)
    ElMessage.success(t('global.messages.success.copy'))
  } catch (e) {
    ElNotification.error({
      title: t('global.messages.error.copy'),
      message: String(e)
    })
  }
}

// 监听props.param的变化，当props.param变化时，重新获取数据
watch(
  () => props.param,
  () => {
    fetchData()
  }
)

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
