<template>
  <el-card class="user-info-card" shadow="never">
    <el-space>
      <div class="user-avatar">
        <el-avatar :size="100" :src="userStore.user?.avatar"></el-avatar>
      </div>
      <el-space direction="vertical" alignment="left">
        <h2>{{ userStore.user?.nickname }}</h2>
        <el-descriptions :column="4" size="large">
          <el-descriptions-item
            :span="4"
            :label="t('userCenterView.userInfo.descriptionsItem.uid')"
            >{{ userStore.user?.id }}</el-descriptions-item
          >
          <el-descriptions-item :label="t('userCenterView.userInfo.descriptionsItem.registerAt')">{{
            userStore.user?.registerAt
              ? dayjs(Number(userStore.user?.registerAt) * 1000).format('YYYY-MM-DD HH:mm')
              : 'N/A'
          }}</el-descriptions-item>
        </el-descriptions>
      </el-space>
    </el-space>
  </el-card>
</template>
<script lang="ts" setup>
import { dayjs } from 'element-plus'
import { useI18n } from 'vue-i18n'
import { useUserStore } from '~/stores/userStore'
const userStore = useUserStore()
const { t } = useI18n()
</script>
<style lang="scss" scoped>
.user-info-card {
  border: unset;
  background-color: transparent;
  .user-avatar {
    width: auto;
    padding: 0 20px;
    margin: 20px 0;
  }
}
</style>
