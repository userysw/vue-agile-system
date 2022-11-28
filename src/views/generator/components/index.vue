<script lang="ts" name="" setup>
import { Document } from '@element-plus/icons-vue';
import { ref, reactive } from 'vue'

interface Component {
  name: string,
  type: string
}

interface Category {
  name: string,
  title: string,
  components: Array<Component>
}

// 分类列表
const categoryArr = reactive<Array<Category>>([
  {
    name: '布局容器',
    title: '布局容器',
    components: [
      {
        name: '栅格',
        type: ''
      },
      {
        name: '折叠面板',
        type: ''
      }
    ]
  },
  {
    name: '输入',
    title: '输入',
    components: [
      {
        name: '密码',
        type: 'password'
      },
      {
        name: '计数器',
        type: 'number'
      },
      {
        name: '单文本',
        type: 'text'
      },
      {
        name: '多文本',
        type: 'textarea'
      },
      {
        name: '富文本编辑器',
        type: 'editor'
      }
    ]
  },
  {
    name: '选择',
    title: '选择',
    components: [
      {
        name: '',
        type: ''
      }
    ]
  },
  {
    name: '自定义',
    title: '自定义',
    components: [
      {
        name: '',
        type: ''
      }
    ]
  },
  {
    name: '按钮',
    title: '按钮',
    components: [
      {
        name: '',
        type: ''
      }
    ]
  }
])

// 默认展开全部
let openArr = reactive<Array<string>>([])
openArr = categoryArr.map(category => category.name)

const { updateDragging } = <any>inject('dragging')
// 拖拽事件
function dragstart() {
  updateDragging(true)
  
}
</script>

<template>
  <el-scrollbar>
    <el-collapse v-model="openArr">
      <el-collapse-item v-for="(category, index) in categoryArr" :name="category.name" :title="category.title" :key="index">
        <div v-for="component in category.components" :key="component.type" draggable="true" @dragstart="dragstart">
          {{ component.name }}
        </div>
      </el-collapse-item>
    </el-collapse>
  </el-scrollbar>
</template>

<style lang="scss" scoped>
:deep(.el-collapse-item__header) {
  padding-left: 10px;
  font-size: 14px;
}

:deep(.el-collapse-item__wrap) {
  padding-left: 20px;
}
</style>