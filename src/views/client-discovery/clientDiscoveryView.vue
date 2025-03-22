<template>
  <el-row justify="center">
    <el-collapse-transition>
      <el-col v-show="showSearchForm" :span="20" :xs="24">
        <SearchForm v-model:loading="loading" @submit="handleSubmitSearch"></SearchForm>
      </el-col>
    </el-collapse-transition>
    <el-col :span="20" :xs="24">
      <clientDiscoveryList
        ref="clientDiscoveryListRef"
        v-model:loading="loading"
        :param="complexClientDiscoveryQueryReq"
        @toggle:search="toggleSearchForm"
      ></clientDiscoveryList>
    </el-col>
  </el-row>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

import clientDiscoveryList from './components/clientDiscoveryList.vue'
import SearchForm from './components/searchForm.vue'
import type { IComplexClientDiscoveryQueryRequest } from '~/api/models/clientDiscoveryRequest'

const clientDiscoveryListRef = ref<InstanceType<typeof clientDiscoveryList>>()

const showSearchForm = ref<boolean>(false)
const loading = ref<boolean>(false)
const complexClientDiscoveryQueryReq = ref<IComplexClientDiscoveryQueryRequest | null>(null)

const toggleSearchForm = (show: boolean) => {
  showSearchForm.value = show
}

const handleSubmitSearch = (param: IComplexClientDiscoveryQueryRequest) => {
  // 确保引用发生变化，触发clientDiscoveryList组件中watch函数
  complexClientDiscoveryQueryReq.value = { ...param }
}
</script>
