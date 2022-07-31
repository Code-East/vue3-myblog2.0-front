<template>
  <div class="tag">
    <Header></Header>
    <Main>
      <div>
        <div class="no_data" v-if="!searchData">暂无数据</div>
        <ArticleList v-if="searchData" :dataList="searchData" :total="total"></ArticleList>
      </div>
    </Main>
    <Footer></Footer>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import Header from "@/components/Header.vue";
import Main from "@/layout/Main.vue";
import ArticleList from "@/components/ArticleList.vue";
import { useRoute, onBeforeRouteUpdate } from "vue-router";
import { searchArticle, getArticleCount } from "@/network/article";

const route = useRoute();
const searchData = ref();
const total = ref(0);
const text = ref(route.query.text);
const search_article = async (text) => {
  const res = await searchArticle(text);
  const res1 = await getArticleCount(text);
  searchData.value = res.data;
  total.value = res1.data;
};
search_article(text.value);

watch(
  () => route.query.text,
  (val) => {
    window.scrollTo(0, 0);
    if (val) {
      search_article(val);
    }
  }
);
</script>


<style scoped>
.no_data {
  width: 100%;
  height: 1.5rem;
  font-size: 1.5em;
  text-align: center;
  line-height: 1.5rem;
  background-color: #fff;
  font-weight: bold;
  border-radius: 25px;
  color: #34495e;
}
</style>