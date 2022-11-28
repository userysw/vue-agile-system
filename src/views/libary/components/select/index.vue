<template>
  <el-col :lg="6" :md="8" :sm="12" :xs="24">
    <el-form-item label="支持多选">
      <el-select size="medium" v-model="config.multiple" placeholder="请选择">
        <el-option label="是" :value="true"></el-option>
        <el-option label="否" :value="false"></el-option>
      </el-select>
    </el-form-item>
  </el-col>
  <el-col :lg="6" :md="8" :sm="12" :xs="24">
    <el-form-item label="数据来源">
      <el-select size="medium" v-model="config.source" placeholder="请选择">
        <el-option v-for="option in sourceOptions" :key="option.value" :label="option.label" :value="option.value"></el-option>
      </el-select>
    </el-form-item>
  </el-col>
  <el-col :lg="6" :md="8" :sm="12" :xs="24" v-if="showParam">
    <el-form-item label="字典参数">
      <el-input v-model="config.params" placeholder="字典接口参数值"></el-input>
    </el-form-item>
  </el-col>
  <el-col :lg="12" :md="16" :sm="24" :xs="24" v-if="showJson">
    <el-form-item label="配置参数">
      <div class="config-panel">
        <el-row v-for="(json, index) in config.json" :key="index">
          <el-input size="medium" v-model="json.key" placeholder="key"></el-input>
          <sapn style="margin: 0 10px">-</sapn>
          <div class="type-value">
            <el-select class="type-box" size="medium" v-model="json.type" @change="changeType(index)">
              <el-option v-for="option in typeOptions" :key="option.value" :label="option.label" :value="option.value" />
            </el-select>
            <el-input class="value-box" v-if="json.type == 'string'" size="medium" v-model="json.value" placeholder="value"></el-input>
            <el-input-number class="value-box" v-if="json.type == 'number'" size="medium" v-model="json.value" placeholder="value"></el-input-number>
            <el-select class="value-box" v-if="json.type == 'boolean'" size="medium" v-model="json.value" placeholder="请选择">
              <el-option label="true" :value="true"></el-option>
              <el-option label="false" :value="false"></el-option>
            </el-select>
          </div>
          <el-button size="mini" icon="el-icon-plus" circle @click="addJsonRow"></el-button>
          <el-button size="mini" icon="el-icon-minus" circle @click="delJsonRow(index)"></el-button>
        </el-row>
      </div>
    </el-form-item>
  </el-col>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, watch } from 'vue';
import { TSelectSource } from '../../types/select';
interface ISource {
  label: string
  value: TSelectSource
}

interface IString {
  label: '字符'
  value: 'string'
}
interface INumber {
  label: '数字'
  value: 'number'
}
interface IBoolean {
  label: '布尔'
  value: 'boolean'
}
// 所有类型
type TType = IString | INumber | IBoolean

interface IJson {
  key: string
  type: 'string' | 'number' | 'boolean'
  value: string | number | boolean
}

export default defineComponent({
  props: {
    config: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const { config } = props

    watch(() => config.minlength, (n: number) => {
      config.maxlength = n + 1
    })
    
    const sourceOptions = reactive<Array<ISource>>([
      {
        label: '字典',
        value: 'api'
      },
      {
        label: '配置',
        value: 'json'
      }
    ])

    // 是否显示 参数配置
    const showParam = computed(() => config.source === sourceOptions[0].value)
    // 是否显示 JSON配置
    const showJson = computed(() => config.source === sourceOptions[1].value)

    const typeOptions = reactive<Array<TType>>([
      {
        label: '字符',
        value: 'string'
      },
      {
        label: '数字',
        value: 'number'
      },
      {
        label: '布尔',
        value: 'boolean'
      }
    ])

    // 添加一行 json 配置
    const addJsonRow = () => {
      config.json.push({
        key: '',
        type: 'string',
        value: ''
      })
    }

    // 删除当前行 json 配置
    const delJsonRow = (index: number) => {
      config.json.length > 1 && config.json.splice(index, 1)
    }

    // 根据类型修改当前行 json 配置的 value
    const changeType = (index: number) => {
      let json: IJson = config.json[index]
      switch (json.type) {
        case 'string':
          json.value = ''
          break;
        
        case 'number':
          json.value = 0
          break;
        
        case 'boolean':
          json.value = true
          break;
      
        default:
          break;
      }
    }

    return {
      config,
      sourceOptions,
      typeOptions,

      showParam,
      showJson,

      addJsonRow,
      delJsonRow,
      changeType
    }
  }
});
</script>

<style lang="scss" scoped>
.config-panel ::v-deep {
  height: 300px;
  padding: 5px 10px;
  overflow-y: auto;
  border: 1px solid #dcdfe6;

  .el-row {
    display: flex;
    align-items: center;
    margin: 5px 0;

    & > .el-input {
      flex: 2;
    }

    .type-value {
      flex: 4;
      display: flex;
      align-items: center;

      .type-box {
        width: 80px;
        margin-right: 4px;
      }

      .value-box {
        flex: 1;
      }

      & > .el-input {
        flex: 1;
      }

      & > .el-input-number {
        flex: 1;
        width: 0;
      }
    }

    button {
      width: 30px;
      height: 30px;
      margin-left: 10px;
    }
  }
}
</style>