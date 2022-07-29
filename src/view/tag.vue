<template>
  <div class="tag">
    <Header></Header>
    <Main>
      <div>
        <TagCard @tagClick="tag_click"></TagCard>
        <ArticleList
          v-if="articleList"
          :total="total"
          :dataList="articleList"
        ></ArticleList>
        <div class="noData" v-if="noData">暂无数据</div>
      </div>
    </Main>
    <Footer></Footer>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import Header from "@/components/Header.vue";
import Main from "@/layout/Main.vue";
import Footer from "@/components/Footer.vue";
import TagCard from "@/components/TagCard.vue";
import ArticleList from "@/components/ArticleList.vue";
import { getArticleByTag } from "@/network/article";
import { useRoute, onBeforeRouteUpdate } from "vue-router";

const route = useRoute();
const total = ref(0);
const articleList = ref("");
const noData = ref(false);

const tag_click = async (id) => {
  const res = await getArticleByTag(id);
  articleList.value = res.data;
  //判断是否有数据
  if (articleList.value == 0) {
    noData.value = true;
  } else {
    noData.value = false;
  }
};

watch(
  ()=>route.query.id,
  (val) => {
    window.scrollTo(0, 0);
    if (val) {
      tag_click(val);
    }
  },
  { immediate: true }
);
</script>


<style scoped>
.noData {
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