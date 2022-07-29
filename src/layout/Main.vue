<template>
  <main class="main_box">
    <article class="by_container">
      <slot></slot>
    </article>
    <aside class="by_aside">
      <Aside />
    </aside>
  </main>
</template>

<script setup>
import Aside from "@/components/aside/Aside.vue";
</script>


<style  lang="scss" scoped>
.main_box {
  display: flex;
  margin: 0 auto;
  padding: 0.7rem 0.5rem;
  widows: 22.2rem;
  max-width: 1200px;
  position: relative;
  z-index: 88;
  animation: main_article_animate 1s;
  .by_container {
    width: 75%;
  }
  .by_aside {
    width: 25%;
    padding-left: 15px;
  }
}

@media screen and (max-width: 750px) {
  .main_box {
    flex-direction: column;
    .by_container {
      width: 100%;
    }
    .by_aside {
      width: 100%;
      padding-left: 0px;
    }
  }
}
</style>