<template>
  <el-row justify="center">
    <el-collapse-transition>
      <el-col v-show="showSearchForm" :span="20" :xs="24">
        <SearchForm></SearchForm>
      </el-col>
    </el-collapse-transition>
    <el-col :span="20" :xs="24">
      <banHistoryTable @toggle:search="toggleSearchForm"></banHistoryTable>
    </el-col>
  </el-row>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

import banHistoryTable from './components/banHistoryTable.vue'
import SearchForm from './components/searchForm.vue'

const showSearchForm = ref<boolean>(false)

const toggleSearchForm = (show: boolean) => {
  showSearchForm.value = show
}
</script>
