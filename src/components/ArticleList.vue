<template>
  <div class="article_list">
    <ArticleCard
      v-for="item in dataList"
      :key="item.article_id"
      :articleData="item"
    ></ArticleCard>
    <pagination :total="total" :page="nowPage" @changePage="pageChange"></pagination>
  </div>
</template>

<script setup>
import { defineProps,ref } from "vue";
import ArticleCard from "@/components/ArticleCard.vue";
import pagination from "@/components/pagination.vue";
import { useStore } from '@/store'

const store = useStore();
//当前页码
const nowPage = ref(store.nowArticlePage);
const props = defineProps({
  total: Number,
  dataList: Array,
});
const emit = defineEmits(["pagechang"]);
console.log('nowArticlePage',store.nowArticlePage);
//分页
const pageChange = (currentPage, pageSize) => {
  console.log(currentPage,store.nowArticlePage);
  store.nowArticlePage = currentPage;
  console.log(currentPage,store.nowArticlePage);
  emit('pagechang',currentPage, pageSize);
};
</script>


<style scoped>
</style>