<template>
  <div class="banner-container">
    <div class="banner-bg">
      <div class="banner">
        <h1 class="banner-title">{{ t('homeView.banner.title') }}</h1>
        <h2 class="banner-subtitle">{{ t('homeView.banner.subtitle') }}</h2>
        <el-divider />
        <p class="banner-guide">{{ t('homeView.banner.guide') }}</p>
        <el-space>
          <el-button
            v-if="userStore.isLoggedIn()"
            @click="router.push(localePath('/user/center'))"
            type="primary"
            size="large"
            :dark="true"
            plain
            ><p>{{ t('homeView.banner.action.createApplication') }}</p></el-button
          >
          <el-button
            v-else
            @click="router.push(localePath('/login'))"
            type="primary"
            size="large"
            :dark="true"
            plain
            ><p>{{ t('homeView.banner.action.login') }}</p></el-button
          >
        </el-space>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useLocalePath } from 'vue-i18n-routing'
import { useRouter } from 'vue-router'
import { useUserStore } from '~/stores/userStore'
const { t } = useI18n()
const userStore = useUserStore()
const localePath = useLocalePath()
const router = useRouter()
</script>

<style lang="scss" scoped>
h1 {
  font-size: 75px;
}
h2 {
  font-size: 24px;
}
p {
  font-size: 18px;
}

.banner-container {
  .banner-bg {
    background-image: url('~/assets/bg/bg_1.jpeg');
    padding: 200px 0;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    position: relative;
    overflow: hidden;
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: inherit;
      filter: brightness(50%);
      z-index: 1;
    }
    .banner {
      margin: 0 20px;
      color: var(--el-color-white);
      position: relative;
      z-index: 2;
      .banner-title {
        margin: 0;
      }
      .banner-subtitle {
        border-left: 5px solid var(--el-color-white);
        padding-left: 15px;
      }
    }
  }
}
</style>
