import { createWebHistory } from 'vue-router'
import { createRouter as createI18nRouter, type LocaleObject } from 'vue-i18n-routing'
import i18n from '~/locales'
import { useLanguageStore } from '~/stores/languageStore'
import { useUserStore } from '~/stores/userStore'
import type { RouteLocationNormalized } from 'vue-i18n-routing/types'

const switchableLocales: LocaleObject[] = [
  {
    code: 'en-US',
    iso: 'en-US',
    name: 'English'
  },
  {
    code: 'zh-CN',
    iso: 'zh-CN',
    name: '简体中文'
  }
]

//修复vue-i18n-routing第一次路由no match问题
const locales: LocaleObject[] = switchableLocales.concat({
  code: '',
  iso: '',
  name: ''
})

const routes = [
  {
    path: '/',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    name: 'home',
    component: () => import('~/views/home/homeView.vue'),
    // 无需登陆验证
    meta: { requiresAuth: false }
  },
  {
    path: '/banHistory',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    name: 'ban-history',
    component: () => import('~/views/ban-history/banHistoryView.vue'),
    // 登陆验证
    meta: { requiresAuth: true }
  },
  {
    path: '/snapshot',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    name: 'snapshot',
    component: () => import('~/views/snapshot/snapshotView.vue'),
    // 登陆验证
    meta: { requiresAuth: true }
  },
  {
    path: '/clientDiscovery',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    name: 'client-discovery',
    component: () => import('~/views/client-discovery/clientDiscoveryView.vue'),
    // 登陆验证
    meta: { requiresAuth: true }
  },
  {
    path: '/tracker',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    name: 'tracker',
    component: () => import('~/views/tracker/trackerView.vue'),
    // 登陆验证
    meta: { requiresAuth: true }
  },
  {
    path: '/user/center',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    name: 'user-center',
    component: () => import('~/views/user-center/userCenterView.vue'),
    // 登陆验证
    meta: { requiresAuth: true }
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('~/views/user-login/userLoginView.vue'),
    // 无需登陆验证
    meta: { requiresAuth: false }
  },
  {
    name: 'not-found',
    path: '/404',
    component: () => import('~/views/not-found/notFoundView.vue'),
    // 无需登陆验证
    meta: { requiresAuth: false }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404'
  }
]

const i18nRouter = createI18nRouter(i18n, {
  version: 4,
  locales: locales,
  defaultLocale: '',
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

i18nRouter.beforeEach((to: RouteLocationNormalized) => {
  const langStore = useLanguageStore()
  const userStore = useUserStore()
  const pathLocale = to.path.split('/')[1]
  if (!pathLocale || !switchableLocales.some((item) => item.code === pathLocale)) {
    return `/${langStore.language}${to.path}`
  }
  if (to.meta.requiresAuth && !userStore.isLoggedIn()) {
    return {
      path: '/login',
      query: { redirect: to.fullPath }
    }
  }
})

export { switchableLocales, i18nRouter }
