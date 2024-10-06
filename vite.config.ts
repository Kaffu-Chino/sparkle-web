import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import path from 'path'

// https://vitejs.dev/config/
export default ({ mode }:any) => {
  const pathSrc = path.resolve(__dirname, 'src')
  const env = loadEnv(mode, process.cwd())

  return defineConfig({
    define: {
      __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
      __LAST_BUILD_TIME__: JSON.stringify(new Date().toISOString())
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "~/styles/element/index.scss" as *;`
        }
      }
    },
    plugins: [
      vue(),
      vueJsx(),
      vueDevTools(),
      AutoImport({
        resolvers: [
          ElementPlusResolver({
            importStyle: 'sass'
          })
        ]
      }),
      Components({
        resolvers: [
          ElementPlusResolver({
            importStyle: 'sass'
          }),
          // Auto register icon components
          // 自动注册图标组件
          IconsResolver({
            enabledCollections: ['ep', 'mdi', 'material-symbols']
          })
        ],
        // 解决unplugin-vue-components报组件命名相同错误
        directoryAsNamespace: true
      }),
      Icons({
        autoInstall: true
      })
    ],
    resolve: {
      alias: {
        // '@src': fileURLToPath(new URL('./src', import.meta.url)),
        '~/': `${pathSrc}/`
      }
    },
    server: {
      port: 3000,
      proxy: {
        '/api': {
          target: env.VITE_PROXY_URL_HOST, // 目标服务器地址
          changeOrigin: true
        },
        '/auth': {
          target: env.VITE_PROXY_URL_HOST, // 目标服务器地址
          changeOrigin: true
        }
      }
    }
  })
}
