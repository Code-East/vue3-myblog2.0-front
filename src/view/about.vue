<template>
  <div class="about">
    <Header></Header>
    <Main>
      <AboutCard></AboutCard>
    </Main>
    <Footer></Footer>
  </div>
</template>

<script setup>
import Header from "@/components/Header.vue";
import Main from "@/layout/Main.vue";
import Footer from "@/components/Footer.vue";
import AboutCard from "@/components/AboutCard.vue";
</script>


<style scoped>
</style>