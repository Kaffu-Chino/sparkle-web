<template>
  <el-row justify="center">
    <el-col :span="18" :xs="24">
      <el-card class="login-card" shadow="never">
        <template #header>
          <el-space direction="vertical">
            <el-image class="logo" src="/src/assets/sparkle.gif" fit="cover" />
            <h1>{{ t('loginView.card.title') }}</h1>
          </el-space>
        </template>
        <el-space direction="vertical" fill>
          <el-button size="large" @click="userLoginWithGithub()"
            ><el-icon size="large" class="el-icon--left"><i-mdi-github /></el-icon>
            {{ t('loginView.card.form.githubOauth') }}
          </el-button>
        </el-space>
      </el-card>
    </el-col>
  </el-row>
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

const userLoginWithGithub = () => {
  if (!userStore.isLoggedIn()) {
    window.location.href = '/auth/oauth2/github/login'
  } else {
    ElNotification.info(t('loginView.alreadyLogged.info'))
    router.replace(localePath('/user/center'))
  }
}
</script>

<style scoped lang="scss">
.login-card {
  width: 400px;
  margin: 0 auto;
  text-align: center;
  h1 {
    margin: 0;
  }
  .logo {
    width: 64px;
    height: 64px;
    border-radius: var(--el-border-radius-base);
  }
}
</style>
