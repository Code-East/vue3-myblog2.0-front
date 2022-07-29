<template>
  <div class="adide_new_article">
    <div class="new_article_title">
      <el-icon><Timer /></el-icon>
      <span>最新文章</span>
    </div>
    <div class="new_article_list">
      <div class="item" v-for="item in articleList" :key="item.title">
        <img :src="item.article_img" alt="文章图片" @click="toDetail(item.article_id)"/>
        <div class="content">
          <a href="javascript:;" @click="toDetail(item.article_id)">{{ item.title }}</a>
          <time>{{ item.created_time }}</time>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { getNewArticle } from "@/network/article";
import { useRouter } from 'vue-router'

const router = useRouter();
const articleList = ref([]);
const get_new_article = async () => {
  const res = await getNewArticle();
  articleList.value = res.data;
};
get_new_article();

const toDetail = (id)=> {
  router.push('/detail/'+ id);
}
</script>


<style lang="scss" scoped>
.adide_new_article {
  padding: 0.4rem 0.4rem;
  margin-top: 0.5rem;
  border-radius: 25px;
  background: #fff;
  box-shadow: 0 3px 8px 6px rgba(7, 17, 27, 0.05);
  .new_article_title {
    display: flex;
    align-items: center;
    padding-bottom: 0.2rem;
    font-size: 1.5em;
    span {
      margin-left: 0.1rem;
    }
  }
  .new_article_list {
    .item {
      display: flex;
      align-items: center;
      padding: 6px 0;
      border-bottom: 1px dashed #f5f5f5;
      img {
        width: 1.2rem;
        height: 1.2rem;
        border-radius: 5px;
        &:hover {
          cursor: pointer;
        }
      }
    }
    .content {
      display: flex;
      flex-direction: column;
      padding-left: 0.2rem;
      a {
        color: #4c4948;
        text-decoration: none;
        font-size: 1.1em;
        transition: 0.3s;
        &:hover {
          color: #49b1f5;
        }
      }
      time {
        color: #858585;
        margin-top: 0.2rem;
      }
    }
  }
}
</style>