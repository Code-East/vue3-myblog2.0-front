<template>
  <router-view></router-view>
  <el-backtop :bottom="50" :right="80" class="backtop">
    <div
      style="
        height: 100%;
        width: 100%;
        background-color: #49b1f5;
        box-shadow: var(--el-box-shadow-lighter);
        text-align: center;
        line-height: 50px;
        color: #fff;
        border-radius: 5px;
      "
    >
      <el-icon><ArrowUpBold /></el-icon>
    </div>
  </el-backtop>
</template>

<script setup>
</script>

<style lang="scss">
@import "@/assets/css/global.scss";
@import "@/assets/css/variable.scss";
@import "@/assets/css/animation.scss";
@media screen and (max-width: 750px) {
  .backtop {
    display: none;
  }
}
</style>
