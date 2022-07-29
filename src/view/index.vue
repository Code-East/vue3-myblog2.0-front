<template>
  <div id="index">
    <Header></Header>
    <Main>
      <ArticleList :total="total" :dataList="articleList" @pagechang = "pagechang"/>
    </Main>
    <Footer></Footer>
  </div>
</template>

<script setup>
import Header from "@/components/Header.vue";
import Main from "@/layout/Main.vue";
import Footer from "@/components/Footer.vue";
import ArticleList from "../components/ArticleList.vue";
import { getArticleList, getArticleCount } from "@/network/article.js";
import { ref } from "vue";
import { useStore } from '@/store'

const store = useStore();
const total = ref(0);
const articleList = ref([]);
const get_article_list = async (page, pageSize) => {
  const res = await getArticleList(page, pageSize);
  articleList.value = res.data;
};
const get_article_count = async (text) => {
  const res = await getArticleCount(text);
  total.value = res.data;
};
get_article_list(store.nowArticlePage, 5);
get_article_count("");

const pagechang = (page,pageSize) =>{
  get_article_list(page,pageSize);
}
</script>


<style scoped>
</style>