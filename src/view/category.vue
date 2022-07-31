<template>
  <div class="detail">
    <Header></Header>
    <Main>
      <ArticleList
        :total="total"
        :dataList="articleList"
        @pagechang="pagechang"
      />
    </Main>
    <Footer></Footer>
  </div>
</template>

<script setup>
import { ref,watch } from "vue";
import Header from "@/components/Header.vue";
import Main from "@/layout/Main.vue";
import Footer from "@/components/Footer.vue";
import ArticleList from "@/components/ArticleList.vue";
import { getArticleByCategory } from "@/network/article";
import { useRoute, onBeforeRouteUpdate } from 'vue-router'
const route = useRoute();
const total = ref(0);
const articleList = ref([]);
const id = route.params.id;

const get_article_by_category = async (id)=>{
    const res = await getArticleByCategory(id);
    articleList.value = res.data;
}
get_article_by_category(id);

watch(
  ()=>route.params.id,
  (val) => {
    window.scrollTo(0, 0);
    if (val) {
      get_article_by_category(val);
    }
  },
);
</script>


<style scoped>
</style>