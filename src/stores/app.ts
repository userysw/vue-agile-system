export const useAppStore = defineStore('app', () => {
  const token = ref(localStorage.getItem('TOKEN') || '')

  // 是否已初始化路由、导航、权限等数据，默认未初始化
  const initialized = ref(false)

  async function initInfo() {
    // 请求接口获取路由、导航、权限等数据
    // const res = await loadInfo()
    
    // 设置为已初始化
    initialized.value = true
    return initialized
  }

  return {
    token,
    initialized,
    initInfo
  }
})