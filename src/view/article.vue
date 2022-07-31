<template>
  <div class="article">
    <Header></Header>
    <Main>
      <TimeLine></TimeLine>
    </Main>
    <Footer></Footer>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import Header from "@/components/Header.vue";
import Main from "@/layout/Main.vue";
import Footer from "@/components/Footer.vue";
import TimeLine from "@/components/TimeLine.vue";
</script>


<style scoped>
</style>