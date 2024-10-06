<template>
  <el-container class="app-container">
    <el-header class="header" height="100%">
      <PageHeader />
    </el-header>
    <el-main class="router-container"> <router-view></router-view></el-main>
    <el-footer class="footer" height="100%">
      <PageFooter />
    </el-footer>
  </el-container>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.app-container {
  min-height: 100vh;
  .router-container {
    padding: 0;
  }
}
</style>
