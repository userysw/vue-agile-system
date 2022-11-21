<template>
  <el-menu-item :index="id" @click="choose">
    <i class="el-icon-" :class="icon" />
    <span slot="title" :data-index="id">{{ name }}</span>
  </el-menu-item>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'MenuItem',
  props: {
    menu: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState({
      val: state => state.tab.val,
      tabs: state => state.tab.tabs
    }),
    id() {
      const timestemp = new Date().getTime() + ''
      return this.menu?.id ?? timestemp
    },
    name() {
      return this.menu?.name ?? '默认名称'
    },
    icon() {
      return this.menu?.icon ?? ''
    }
  },
  methods: {
    choose() {
      const routePath = this.$route.path || ''
      const { id = '', path = '' } = this.menu
      if (path) {
        if (path === routePath) {
          return
        } else {
          const tab = this.tabs.find(item => item.val === id)
          if (tab) {
            this.$store.commit('tab/updateVal', id)
          } else {
            this.$store.commit('tab/addTab', this.menu)
          }
          this.$store.commit('route/addPath', path)
          this.$store.commit('menu/updateIndex', id)
          this.$router.push(path)
        }
      } else {
        this.$message.warning('暂无跳转链接')
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
