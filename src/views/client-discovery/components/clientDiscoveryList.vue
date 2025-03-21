<template>
  <el-card :body-style="{ padding: 0 }" shadow="never" v-loading="loading">
    <template #header>
      <el-space style="justify-content: space-between; display: flex">
        <el-space>
          {{ t('clientDiscoveryView.clientDiscoveryList.title') }}
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
            {{ t('clientDiscoveryView.clientDiscoveryList.advancedSearch') }}
          </el-button>
        </el-space>
      </el-space>
    </template>
    <template #default>
      <el-empty v-if="results == null || results.length == 0" description="No Data" />
      <div v-else class="client-list">
        <div class="list-item" v-for="(item, index) in results" :key="index">
          <ClientListItem :item="item"></ClientListItem>
        </div>
      </div>
      <div class="pagination-container">
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
  ArrowDown as ElArrowDown
} from '@element-plus/icons-vue'
import clipboardCopy from 'clipboard-copy'
import { onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import type { IClientDiscovery } from '~/api/models/clientDiscovery'
import type { IPagination } from '~/api/models/pagination'
import type { IPaginationRequest } from '~/api/models/paginationRequest'
import type { IComplexClientDiscoveryQueryRequest } from '~/api/models/clientDiscoveryRequest'
import ClientListItem from './clientListItem.vue'
import { complexClientDiscoveryQuery, listClientDiscovery } from '~/api/clientDiscoveryService'

const { t } = useI18n()

const showSearchForm = ref<boolean>(false)
const pagination = ref<IPaginationRequest>({
  page: 1,
  pageSize: 10
})

const data = ref<null | IPagination<IClientDiscovery>>(null)
const results = ref<null | IClientDiscovery[]>(null)

function total() {
  return data.value?.total || 0
}

const emit = defineEmits(['toggle:search', 'error'])

const loading = defineModel<Boolean>('loading', {
  default: false
})
const complexClientQuery = defineModel<IComplexClientDiscoveryQueryRequest | null>('param', {
  default: null
})

const toggleSearch = () => {
  showSearchForm.value = !showSearchForm.value
  emit('toggle:search', showSearchForm.value)
}

const fetchData = async () => {
  loading.value = true
  if (showSearchForm.value && complexClientQuery.value) {
    data.value = (
      await complexClientDiscoveryQuery(complexClientQuery.value, pagination.value)
    ).data.data
  } else {
    data.value = (await listClientDiscovery(pagination.value)).data.data
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

// 监听complexClientQuery的变化，当complexClientQuery变化时，重新获取数据
watch(complexClientQuery, () => {
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
.client-list {
  .list-item {
    padding: 13px 20px;
    border-bottom: 1px var(--el-border-color) var(--el-border-style);
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
  margin: 20px;
  justify-content: flex-end;
}
</style>
