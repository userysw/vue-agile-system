<template>
  <div v-if="tabs.length > 0" class="tabs-container">
    <el-tabs v-model="tabVal" type="card" closable @tab-click="changeTab" @tab-remove="removeTab">
      <el-tab-pane
        v-for="item in tabs"
        :key="item.name"
        :label="item.name"
        :name="item.val"
      />
    </el-tabs>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      // 当前选中的导航标签的值
      tabVal: ''
    }
  },
  computed: {
    ...mapState({
      val: state => state.tab.val,
      tabs: state => state.tab.tabs,
      paths: state => state.route.paths
    })
  },
  watch: {
    val: {
      handler(n) {
        this.tabVal = n
      },
      immediate: true
    }
  },
  methods: {
    changeTab({ name = '' }) {
      if (this.val === name) return
      const data = this.tabs.find(item => item.val === name)
      if (data?.path) {
        this.$router.push(data.path)
        this.$store.commit('tab/updateVal', name)
        this.$store.commit('menu/updateIndex', name)
      }
    },
    removeTab(val) {
      const tabs = this.tabs
      if (this.val === val) {
        tabs.forEach((tab, index) => {
          if (tab.val === val) {
            const nextTab = tabs[index + 1] || tabs[index - 1]
            const value = nextTab?.val || ''
            // 关闭最后一个导航选项卡的时候，默认跳转到系统首页
            const toPath = nextTab?.path || '/admin/home'
            const currPath = this.$route.path
            if (toPath !== currPath) {
              this.$router.push(toPath)
            }
            this.$store.commit('tab/updateVal', value)
            this.$store.commit('menu/updateIndex', value)
          }
        })
      }
      this.$store.commit('tab/removeTab', val)
    }
  }
}
</script>

<style lang="scss" scoped>
.tabs-container ::v-deep {
  height: 100%;
  padding: 0;
  background: $tabs-bgc;

  .el-tabs__header {
    border-bottom: none;
    margin: 0 !important;

    .el-tabs__nav-wrap {
      margin-bottom: 0;

      .el-tabs__nav {
        border: none;

        .el-tabs__item {
          border: none;
          border-right: 1px solid transparent;

          &:hover,
          &.is-active {
            color: $active-color;
            background-color: $active-bgc;
          }
        }
      }
    }
  }
}
</style>
