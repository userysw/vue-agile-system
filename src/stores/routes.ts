/* 需要keep-live的路由 */
import { reactive } from 'vue'
import { defineStore } from 'pinia'

export const useRoutesStore = defineStore('routes', () => {
  const list = reactive<string[]>([])

  // 添加路由
  function addRoute(route: string) {
    if (list.includes(route)) {
      // 已存在，无需添加
    } else {
      // 不存在，需要添加
      list.push(route)
    }
  }

  // 删除路由
  function removeRoute(index: number) {
    list.splice(1, index)
  }

  return {
    list,
    addRoute,
    removeRoute
  }
})