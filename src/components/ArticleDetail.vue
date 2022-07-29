<template>
  <div class="article_detail">
    <md-editor v-model="content" previewOnly></md-editor>
  </div>
</template>

<script setup>
import MdEditor from "md-editor-v3";
import "md-editor-v3/lib/style.css";
import { defineProps, ref, watch } from "vue";
const props = defineProps({
  article: Object,
});
const content = ref('');
watch(
    () => props.article,
    (val) => {
      if (!val.article_detail.content_md) {
        content.value = '# 暂无内容'
      }else{
        content.value = val.article_detail.content_md;
      }
      
    },
    {
      deep: true,
    }
  );
</script>


<style scoped>
.article_detail{
  width: 100%;
  padding: 0.3rem 0.6rem;
  border-radius: 25px;
  background-color: #fff;
}
</style>