<script lang="ts" name="" setup>
interface Text {
  discriminator: 'I-Text',
  label: string,
  field: string,
  value: string,
  span: number,
  disabled: boolean
}

const props = defineProps({
  params: {
    validator(val: any) {
      return val.discriminator === 'I-Text'
    },
    required: true
  }
})

let config = reactive<Text>({
  discriminator: 'I-Text',
  label: '',
  field: '',
  value: '',
  span: 24,
  disabled: false
})

function initConfig() {
  const { label, field, value, span, disabled } = <Text>props.params
  config.label = label ?? '单文本'
  config.field = field ?? ('field' + new Date().getTime())
  config.value = value ?? ''
  config.span = span ?? 24
  config.disabled = disabled ?? false
}

watch(() => props.params, () => {
  initConfig()
}, {
  deep: true,
  immediate: true
})

watch(() => config.value, (n) => {
}, {
  deep: true
})
</script>

<template>
  <el-col :span="config.span">
    <div class="operation-container">
      <el-icon class="copy">
        <i-ep-circlePlusFilled />
      </el-icon>
      <el-icon class="delete">
        <i-ep-circleCloseFilled />
      </el-icon>
    </div>
    <el-form-item :label="config.label" :prop="config.field">
      <el-input v-model="config.value" placeholder="Please input" />
    </el-form-item>
  </el-col>
</template>

<style lang="scss" scoped>

</style>