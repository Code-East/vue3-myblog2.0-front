<template>
  <div class="article_detail">
    <md-editor v-model="content" previewOnly></md-editor>
    <div class="star">
      <div class="tags" v-for="item in tags" :key="item.tag_name">
        <span
          ><el-icon><PriceTag /></el-icon
        ></span>
        <div>{{ item.tag_name }}</div>
      </div>
      <div class="like">
        <span @click="likeClick" v-show="!like"
          ><el-icon><Star /></el-icon
        ></span>
        <span @click="likeClick" v-show="like" :class="{ islike: like }"
          ><el-icon><StarFilled /></el-icon
        ></span>
      </div>
    </div>
    <div class="author" v-if="article_data">
      <p><span>文章作者: </span>{{ article_data.article_form.author }}</p>
      <p>
        <span>版权声明: </span>
        本站提供的所有内容仅供学习、交流和分享用途、只供参考、转载请保留署名以及原文链接，谢谢
      </p>
      <p>
        <span>留言声明: </span>
        留言请自行遵守法律
      </p>
    </div>
    <comment :articleId="article_id"></comment>
  </div>
</template>

<script setup>
import MdEditor from "md-editor-v3";
import "md-editor-v3/lib/style.css";
import comment from "./comment.vue";
import { defineProps, ref, watch } from "vue";
import { getArticleTags } from "@/network/tag.js";
import { ElMessage } from "element-plus";
import { likeArticle } from "@/network/article";

const props = defineProps({
  article: Object,
});
const article_id = ref("");
const article_data = ref("");
const content = ref("");
const tags = ref("");
//获取文章标签
const get_article_tags = async (id) => {
  const res = await getArticleTags(id);
  tags.value = res.data;
};
watch(
  () => props.article,
  (val) => {
    if (!val.article_detail.content_md) {
      content.value = "# 暂无内容";
    } else {
      content.value = val.article_detail.content_md;
    }
    article_data.value = val;
    article_id.value = val.article_form.article_id;
    get_article_tags(article_id.value);

    //进入前查看是否喜欢
    let likeList = JSON.parse(localStorage.getItem("like_list"));
    
    if (likeList) {
      if (likeList.includes(article_id.value)) {
        like.value = true;
      } else {
        like.value = false;
      }
    } else {
      localStorage.setItem("like_list", JSON.stringify([]));
    }

  },
  {
    deep: true,
  }
);

//处理喜欢
let msg;
const like = ref(false);

//点击喜欢
const likeClick = async () => {
  like.value = !like.value;

  if (like.value) {
    const res = await likeArticle(article_id.value, "like");
    if (res.code == 0) {
      const list = JSON.parse(localStorage.getItem("like_list"));
      list.push(article_id.value);
      localStorage.setItem("like_list", JSON.stringify(list));
      if (msg) {
        msg.close();
      }
      msg = ElMessage({
        type: "success",
        message: "感谢你的喜欢！！！",
      });
    }
  } else {
    const res = await likeArticle(article_id.value, "dislike");

    if (res.code == 0) {
      const list = JSON.parse(localStorage.getItem("like_list"));
      list.splice(list.indexOf(article_id.value), 1);
      localStorage.setItem("like_list", JSON.stringify(list));
      if (msg) {
        msg.close();
      }
      msg = ElMessage({
        type: "info",
        message: "不喜欢,在看别的咯！",
      });
    }
  }
};
</script>


<style lang="scss" scoped>
.article_detail {
  width: 100%;
  padding: 0.3rem 0.6rem;
  border-radius: 25px;
  background-color: #fff;
  margin-bottom: 0.5rem;
}
.author {
  width: 100%;
  margin: 0.5rem 0px 0.1rem;
  padding: 10px 16px;
  border: 1px solid #eee;
  font-size: 1.3em;
  p {
    padding: 0.1rem 0;
    color: #99a9bf;
    span {
      color: #49b1f5;
      font-weight: 700;
    }
  }
}
.star {
  width: 100%;
  display: flex;
  justify-content: space-between;
  .tags {
    display: flex;
    align-content: center;
    font-size: 1.2em;
    margin: 0 8px 0 0;
    padding: 0 12px 0 40px;
    border: 1px solid #f0f0f0;
    border-radius: 20px;
    color: #a0a0a0;
    font-size: 0.85em;
    background: #f0f0f0;
    position: relative;
    &:hover {
      cursor: pointer;
      color: #49b1f5;
    }
    span {
      position: absolute;
      left: 0;
      background: #fff;
      border-radius: 50%;
      width: 30px;
      height: 30px;
      text-align: center;
      color: #49b1f5;
      line-height: 33px;
    }
    div {
      font-size: 1.6em;
      line-height: 30px;
    }
  }
  .like {
    span:nth-child(1) {
      font-size: 2em;
      &:hover {
        cursor: pointer;
        color: #f39c12;
      }
    }
    span:nth-child(2) {
      color: #f39c12;
      font-size: 2em;
      transition: 0.5s;
    }
  }
}
.islike {
  animation: like 0.5s;
}
</style>