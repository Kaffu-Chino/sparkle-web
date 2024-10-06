<template>
  <el-row justify="center">
    <el-col :span="18" :xs="24">
      <UserInfo></UserInfo>
    </el-col>
  </el-row>
  <el-row justify="center">
    <el-col :span="18" :xs="24">
      <UserAppsTable></UserAppsTable>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import UserAppsTable from './components/userAppsTable.vue'
import UserInfo from './components/userInfo.vue'
</script>
