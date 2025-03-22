<template>
  <el-row justify="center">
    <el-collapse-transition>
      <el-col v-show="showSearchForm" :span="20" :xs="24">
        <SearchForm v-model:loading="loading" @submit="handleSubmitSearch"></SearchForm>
      </el-col>
    </el-collapse-transition>
    <el-col :span="20" :xs="24">
      <snapshotTable
        ref="snapshotTableRef"
        v-model:loading="loading"
        :param="complexSnapshotQueryReq"
        @toggle:search="toggleSearchForm"
      ></snapshotTable>
    </el-col>
  </el-row>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

import snapshotTable from './components/snapshotTable.vue'
import SearchForm from './components/searchForm.vue'
import type { IComplexSnapshotQueryRequest } from '~/api/models/snapshotRequest'

const snapshotTableRef = ref<InstanceType<typeof snapshotTable>>()

const showSearchForm = ref<boolean>(false)
const loading = ref<boolean>(false)
const complexSnapshotQueryReq = ref<IComplexSnapshotQueryRequest | null>(null)

const toggleSearchForm = (show: boolean) => {
  showSearchForm.value = show
}

const handleSubmitSearch = (param: IComplexSnapshotQueryRequest) => {
  // 确保引用发生变化，触发snapshotTable组件中watch函数
  complexSnapshotQueryReq.value = { ...param }
}
</script>
