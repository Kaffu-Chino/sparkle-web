import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { IUser } from '~/api/models/user'
import { userMe } from '~/api/userService'

export const useUserStore = defineStore(
  'user',
  () => {
    const user = ref<IUser | null>(null)

    async function getCurrentUser() {
      const resp = await userMe()
      if (resp.data.success) {
        user.value = resp.data.data
      } else {
        ElNotification.error(resp.data.message)
      }
    }

    function isLoggedIn() {
      return user.value !== null
    }

    function cleanUserStore() {
      user.value = null
    }

    getCurrentUser()

    return { user, getCurrentUser, isLoggedIn, cleanUserStore }
  },
  {
    persist: true
  }
)
