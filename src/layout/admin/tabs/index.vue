<script lang="ts" name="" setup>
import { useNavsStore } from '@/stores/navs';
import { useTabsStore } from '@/stores/tabs';
import { useRoute, useRouter } from 'vue-router';

const $route = useRoute()
const $router = useRouter()

const tabsStore = useTabsStore()
const navsStore = useNavsStore()

// 是否显示选项卡
const showTabs = computed(() => tabsStore.tabs.length > 0)

// 切换选项
function changeTab(name: string) {
  const data = tabsStore.tabs.find(item => item.val === name)  
  if (data?.path) {
    $router.push(data.path)
    tabsStore.tabVal = name
    navsStore.navIndex = name
  }
}

// 删除选项
function removeTab(val: string) {
  const tabs = tabsStore.tabs
  if (tabsStore.tabVal === val) {
    tabs.forEach((tab, index) => {
      if (tab.val === val) {
        // 关闭最后一个导航选项卡的时候，切换到默认选项
        const nextTab = (tabs[index + 1] || tabs[index - 1]) || tabsStore.tab
        const value = nextTab.val
        const toPath = nextTab.path
        const currPath = $route.path
        if (toPath !== currPath) {
          $router.push(toPath)
        }
        tabsStore.tabVal = value
        navsStore.navIndex = value
      }
    })
  }
  tabsStore.removeTab(val)
}
</script>

<template>
  <div v-if="showTabs" class="tabs-container">
    <el-tabs v-model="tabsStore.tabVal" type="card" closable @tab-change="changeTab" @tab-remove="removeTab">
      <el-tab-pane
        v-for="item in tabsStore.tabs"
        :key="item.name"
        :label="item.name"
        :name="item.val"
      />
    </el-tabs>
  </div>
</template>

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