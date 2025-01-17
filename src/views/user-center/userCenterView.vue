<template>
  <el-row justify="center">
    <el-col :span="18" :xs="24">
      <div>
        <UserInfo></UserInfo>
        <UserAppsTable></UserAppsTable>
      </div>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import UserAppsTable from './components/userAppsTable.vue'
import UserInfo from './components/userInfo.vue'
</script>

<style lang="scss" scoped></style>
