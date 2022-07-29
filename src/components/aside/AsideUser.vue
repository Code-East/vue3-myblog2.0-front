<template>
  <div class="user">
    <div class="center">
      <div class="user_pic">
        <img
          src="http://lxoblog-image.test.upcdn.net/userpic/IMG_0773.JPG"
          alt=""
        />
      </div>
      <div class="username"></div>
    </div>
    <div class="user_data">
      <div class="user_data_item">
        <span>文章</span>
        <span>{{ articleCount }}</span>
      </div>
      <div class="user_data_item">
        <span>标签</span>
        <span>{{ tagCount }}</span>
      </div>
      <div class="user_data_item">
        <span>评论</span>
        <span>{{ conmmentCount }}</span>
      </div>
    </div>
    <div class="github">
      <a href="https://github.com/Code-East/myblog2.0-front">GitHub地址</a>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { getArticleCount } from "@/network/article.js";
import { getTagCount } from "@/network/tag.js";
import { getCommentCount } from "@/network/comment.js";

const articleCount = ref(0);
const tagCount = ref(0);
const conmmentCount = ref(0);
//获取文章总数
const get_article_count = async (text) => {
  const res = await getArticleCount(text);
  articleCount.value = res.data;
};
//获取标签总数
const get_tag_count = async (text) => {
  const res = await getTagCount(text);
  tagCount.value = res.data;
};
//获取评论总数
const get_comment_count = async (text) => {
  const res = await getCommentCount(text);
  conmmentCount.value = res.data;
};
get_article_count("");
get_tag_count("");
get_comment_count("");
</script>


<style lang="scss" scoped>
$card-box-shadow: 0 3px 8px 6px rgba(7, 17, 27, 0.05);
$btn-bg: #49b1f5;
.user {
  padding: 0.3rem 0.5rem;
  border-radius: 25px;
  background: #fff;
  box-shadow: $card-box-shadow;
  .center {
    text-align: center;
    overflow: hidden;
    margin: 0 auto;
    width: 2.2rem;
    height: 2.2rem;
    border-radius: 70px;
    img {
      max-width: 100%;
    }
  }
  .user_data {
    width: 100%;
    display: flex;
    justify-content: space-around;
    .user_data_item {
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: 1.3em;
      margin-top: 0.7rem;
    }
  }
  .github {
    margin-top: 0.7rem;

    a {
      display: block;
      position: relative;
      width: 100%;
      height: 0.7rem;
      font-size: 1.3em;
      color: #fff;
      text-decoration: none;
      background-color: $btn-bg;
      border-radius: 50px;
      text-align: center;
      line-height: 0.7rem;
      font-weight: bold;
      overflow: hidden;
    }
    a::after {
      content: "点击去往GitHub";
      position: absolute;
      left: -100%;
      width: 100%;
      height: 100%;
      background-color: #ff7242;
      border-radius: 50px;
      transition: 0.5s ease-out;
    }
    a:hover::after {
      left: 0;
    }
  }
}
</style>