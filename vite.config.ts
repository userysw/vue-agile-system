import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// 插件调试工具 http://localhost:port/__inspect/ 检查项目的模块和栈信息
import Inspect from 'vite-plugin-inspect'

//#region 自动按需引入 Icons 组件
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
//#endregion

//#region 自动按需引入 ElementPlus 组件
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
//#endregion

// 自定义组件的 name
import vueSetupExtend from 'vite-plugin-vue-setup-extend'

import path from 'path'
const pathSrc = path.resolve(__dirname, 'src')
const pathTypings = path.resolve(__dirname, 'typings')

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    // 将此设置为 0.0.0.0 或者 true 将监听所有地址，包括局域网和公网地址。
    host: 'localhost',
    port: 8888,
    // 设为 true 时若端口已被占用则会直接退出，而不是尝试下一个可用端口
    strictPort: false,
    open: true,
    proxy: {
      // 选项写法
      // '/api': {
      //   target: 'http://xxxxxxxx.com',
      //   // ws: true
      //   changeOrigin: true,
      //   rewrite: (path) => path.replace(/^\/api/, '')
      // }
    },
    // 指定服务器响应的 header
    headers: {}
  },
  plugins: [
    vue(),
    vueJsx(),
    vueSetupExtend(),
    Inspect(),
    Icons({
      autoInstall: true,
    }),
    AutoImport({
      // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
      imports: ['pinia', 'vue'],
      resolvers: [
        // 自动导入 Icons 组件
        IconsResolver({
          prefix: 'Icon'
        }),
        // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
        ElementPlusResolver()
      ],
      dts: path.resolve(pathTypings, 'auto-imports.d.ts'),
    }),
    Components({
      resolvers: [
        // 自动注册 Icons 组件
        IconsResolver({
          enabledCollections: ['ep'],
        }),
        // 自动注册 Element Plus 组件
        ElementPlusResolver()
      ],
      dts: path.resolve(pathTypings, 'components.d.ts'),
    })
  ],
  resolve: {
    alias: {
      // '@': fileURLToPath(new URL('./src', import.meta.url))
      '@': pathSrc
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        // 要公用的scss的路径
        additionalData: [`
          @import './src/assets/styles/mixin.scss';
          @import './src/assets/styles/function.scss';
          @import './src/assets/styles/variables.scss';
        `]
      }
    }
  }
})
