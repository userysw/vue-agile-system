<script lang="ts" name="" setup>
import { ref, reactive } from 'vue'
import components from '../components/components'

// 根据类型加载对应组件
function loadComponent(name: string) {
  return defineAsyncComponent(components['vv-' + name])
}

const componentArr = reactive([
  {
    id: 231123123,
    name: 'layout',
    params: {
      discriminator: 'I-Layout',
      componentArr: [
        {
          id: 45324324,
          name: 'text',
          params: {
            discriminator: 'I-Text',
            field: 'field45324324',
            value: '',
            disabled: false
          }
        },
        {
          id: 45324321,
          name: 'text',
          params: {
            discriminator: 'I-Text',
            field: 'field45324314',
            value: '',
            disabled: false
          }
        }
      ]
    }
  },
  {
    id: 45324322,
    name: 'text',
    params: {
      discriminator: 'I-Text',
      field: 'field453243434',
      value: '',
      disabled: false
    }
  }
])

const size = ref('default')

const config = reactive([
  {
    
  }
])

const form = reactive({
  field45324324: ''
})

const rules = reactive({
  field45324324: [
    { required: true, message: '该项为必填', trigger: 'blur' }
  ]
})

const { dragging } = <any>inject('dragging')
function dragover(e: any) {
  const classList = Array.from(e.target.classList)
  if (dragging.value && classList.includes('drop-container')) {
    e.preventDefault();
  }
}

function drop(e: any) {
  const timestamp = new Date().getTime()
  componentArr.push({
    id: timestamp,
    name: 'text',
    params: {
      discriminator: 'I-Text',
      field: 'field_' + timestamp,
      value: '',
      disabled: false
    }
  })
}
</script>

<template>
  <el-scrollbar>
    <el-form
      ref="ref-form"
      :model="form"
      :rules="rules"
      label-width="120px"
      class="demo-ruleForm"
      :size="size"
      status-icon
    >
      <el-row class="layout-container">
        <component v-for="(item, index) in componentArr" :is="loadComponent(item.name)" :params="item.params" :key="item.id" />
        <div class="drop-container" @dragover="dragover" @drop="drop"></div>
      </el-row>
    </el-form>
  </el-scrollbar>
</template>

<style lang="scss" scoped>
:deep(.el-row) {
  width: 100%;
  margin-bottom: 10px;
  padding: 22px 10px 10px 10px;
  border: 1px dashed #cccccc;

  .el-col {
    position: relative;

    .operation-container {
      text-align: right;
      position: absolute;
      top: 2px;
      right: 6px;
      left: 6px;

      .el-icon {
        font-size: 18px;
        margin-left: 8px;
        opacity: 0.5;
      }

      .el-icon:hover {
        opacity: 1;
        cursor: pointer;
      }

      .copy {
        color: #0080ff;
      }

      .delete {
        color: #fc0000;
      }
    }

    .el-form-item {
      margin-bottom: 10px;
      padding: 22px 10px 20px 10px;
      background-color: #f7f7f7;
    }
  }

  .drop-container {
    width: 100%;
    height: 60px;
    border: 1px dashed #cccccc;
  }
}

.layout-container {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 10px;
  border: none;
}
</style>