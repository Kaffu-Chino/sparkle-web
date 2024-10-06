import '~/styles/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'
import i18n from './locales'
import { i18nRouter } from './router'

const app = createApp(App)

app.use(createPinia().use(piniaPluginPersistedstate))
app.use(i18nRouter)
app.use(i18n, { inject: true })

app.mount('#app')
