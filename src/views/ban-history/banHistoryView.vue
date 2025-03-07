<template>
  <el-row justify="center">
    <el-collapse-transition>
      <el-col v-show="showSearchForm" :span="20" :xs="24">
        <SearchForm v-model:loading="loading" @submit="handleSubmitSearch"></SearchForm>
      </el-col>
    </el-collapse-transition>
    <el-col :span="20" :xs="24">
      <banHistoryTable
        ref="banHistoryTableRef"
        v-model:loading="loading"
        v-model:param="complexBanHistoryQueryReq"
        @toggle:search="toggleSearchForm"
      ></banHistoryTable>
    </el-col>
  </el-row>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

import banHistoryTable from './components/banHistoryTable.vue'
import SearchForm from './components/searchForm.vue'
import type { IComplexBanHistoryQueryRequest } from '~/api/models/banHistoryRequest'

const banHistoryTableRef = ref<InstanceType<typeof banHistoryTable>>()

const showSearchForm = ref<boolean>(false)
const loading = ref<boolean>(false)
const complexBanHistoryQueryReq = ref<IComplexBanHistoryQueryRequest | null>(null)

const toggleSearchForm = (show: boolean) => {
  showSearchForm.value = show
}

const handleSubmitSearch = async (param: IComplexBanHistoryQueryRequest) => {
  complexBanHistoryQueryReq.value = param
}
</script>
