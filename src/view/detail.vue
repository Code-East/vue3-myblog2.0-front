<template>
  <div class="detail">
    <Header></Header>
    <Main><ArticleDetail :article="article_detail"></ArticleDetail></Main>
    <Footer></Footer>
  </div>
</template>

<script setup>
import Header from "@/components/Header.vue";
import Main from "@/layout/Main.vue";
import Footer from "@/components/Footer.vue";

import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { getSingleArticle } from "@/network/article.js";

import ArticleDetail from "@/components/ArticleDetail.vue";
const router = useRouter();
const route = useRoute();
const id = route.params.id;
const article_detail = ref({});
const get_single_article = async (id) => {
  const res = await getSingleArticle(id);
  article_detail.value = res.data;
};
get_single_article(id);
</script>


<style scoped>
</style>