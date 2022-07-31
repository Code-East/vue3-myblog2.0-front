<template>
  <div class="article_detail">
    <md-editor v-model="content" previewOnly></md-editor>
    <div class="author" v-if="article_data">
      <p><span>文章作者: </span>{{ article_data.article_form.author }}</p>
      <p>
        <span>版权声明: </span>
        本站提供的所有内容仅供学习、交流和分享用途，只供参考、转载请保留署名以及原文链接，谢谢
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
const props = defineProps({
  article: Object,
});
const article_id = ref("");
const article_data = ref("");
const content = ref("");
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
  },
  {
    deep: true,
  }
);
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
    color:#99a9bf;
    span {
      color: #49b1f5;
      font-weight: 700;
    }
  }
}
</style>