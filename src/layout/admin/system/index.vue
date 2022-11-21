<template>
  <div class="system">
    <div class="logo" />
    <div class="name">管理系统</div>
  </div>
</template>

<script>
export default {
  name: 'System',
  data() {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
// @import '@/assets/styles/flex.scss';

.system {
  width: auto;
  min-width: 240px;
  height: 100%;
  padding: 0 20px;
  @include flex-row(flex-start, center);

  .logo {
    width: 36px;
    height: 36px;
    background: pink;
  }

  .name {
    font-size: 22px;
    font-weight: bold;
    color: #ffffff;
    margin-left: 10px;
    letter-spacing: 2px;
  }
}
</style>
