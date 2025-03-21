<template>
  <div class="head-container">
    <RouterLink :to="localePath('/')"
      ><el-space class="logo-container"
        ><el-image class="logo" src="/src/assets/sparkle.gif" fit="cover" />
        <h2 class="logo-name">Sparkle</h2></el-space
      ></RouterLink
    >

    <div class="settings">
      <el-switch
        v-model="darkTheme"
        @change="toggleDark"
        :active-action-icon="ElconMoon"
        :inactive-action-icon="ElconSunny"
      ></el-switch>
    </div>
  </div>

  <el-menu class="nav-menu" mode="horizontal" :default-active="activeMenu">
    <el-menu-item index="1" @click="router.push(localePath('/'))">{{
      t('header.router.home')
    }}</el-menu-item>
    <el-menu-item index="2" @click="router.push(localePath('/banHistory'))">{{
      t('header.router.banHistory')
    }}</el-menu-item>
    <el-menu-item index="3" @click="router.push(localePath('/submissionRecords'))">{{
      t('header.router.submissionRecords')
    }}</el-menu-item>
    <el-menu-item index="4" @click="router.push(localePath('/clientDiscovery'))">{{
      t('header.router.clientDiscovery')
    }}</el-menu-item>
    <el-menu-item index="5" @click="router.push(localePath('/tracker'))">{{
      t('header.router.tracker')
    }}</el-menu-item>
    <el-sub-menu v-if="userStore.isLoggedIn()" index="6">
      <template #title
        ><el-space
          ><el-avatar shape="square" size="small" :src="userStore.user?.avatar" />{{
            userStore.user?.nickname ? userStore.user?.nickname : t('header.router.user')
          }}</el-space
        ></template
      >
      <el-menu-item index="6-1" @click="router.push(localePath('/user/center'))">{{
        t('header.router.user.userCenter')
      }}</el-menu-item>

      <el-menu-item index="6-3" @click="logoutEvent()">{{
        t('header.router.user.logout')
      }}</el-menu-item>
    </el-sub-menu>
    <el-menu-item v-else index="7" @click="router.push(localePath('/login'))">{{
      t('header.router.user.login')
    }}</el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useLocalePath } from 'vue-i18n-routing'
import { Sunny as ElconSunny, Moon as ElconMoon } from '@element-plus/icons-vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '~/stores/userStore'
import { userLogout } from '~/api/userService'
const { t } = useI18n()

const userStore = useUserStore()
const localePath = useLocalePath()
const router = useRouter()
const route = useRoute()

const darkTheme = ref(false)

const toggleDark = (value: boolean) => {
  document.documentElement.classList.toggle('dark')
  darkTheme.value = value
}

const activeMenu = computed(() => {
  // console.log(route)
  return route.path
})

const logoutEvent = () => {
  userLogout()
  userStore.cleanUserStore()
  router.push(localePath('/'))
}
</script>

<style lang="scss" scoped>
.el-menu--horizontal.el-menu {
  border-bottom: unset;
  background-color: transparent;
}
.head-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .logo-container {
    height: 60px;
    color: var(--el-text-color-primary);
    transition: all 0.5s;
    cursor: pointer;
    &:hover {
      color: var(--el-color-primary);
    }
    .logo {
      width: 42px;
      height: 42px;
      border-radius: var(--el-border-radius-base);
    }
  }
}
</style>
