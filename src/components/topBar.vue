<template>
  <el-menu
    router
    :default-active="path"
    class="menu"
    mode="horizontal"
    background-color="#8ba3c7"
    text-color="#f0f0f4"
    active-text-color="#ffffff"
  >
    <el-menu-item index="/wish">✦ 返回祈愿</el-menu-item>
    <el-menu-item index="/analysis">✦ 祈愿分析</el-menu-item>
    <el-menu-item index="/detail">✦ 详情</el-menu-item>
    <el-menu-item index="/history">✦ 历史记录</el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: "topBar",
  props: {
    path: {
      type: String,
    },
  },
  setup() {},
};
</script>

<style scoped lang="scss">
// 菜单
.menu {
  li {
    font-size: 1rem;
    cursor: url("@/assets/image/cursor.png"), auto;
  }
}
</style>
