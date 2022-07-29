<template>
  <div class="tag_card">
    <a
      href="javascript:;"
      v-for="item in tagList"
      :key="item.tag_id"
      :style="{ backgroundColor: item.bgc }"
      @click="clickTag(item.tag_id)"
      >{{ item.tag_name }}</a>
  </div>
</template>

<script setup>
import { getAllTags } from "@/network/tag";
import { ref,defineEmits } from "vue";
const emit = defineEmits(['tagClick'])
const background_color = [
  "rgb(130, 224, 170)",
  "rgb(232, 248, 245)",
  "rgb(248, 196, 113)",
  "rgb(133, 193, 233)",
  "rgb(215, 189, 226)",
  "rgb(163, 228, 215)",
  "rgb(254, 249, 231)"
];
const tagList = ref([]);
const get_all_tags = async () => {
  const res = await getAllTags();
  tagList.value = res.data;
  //为每一个标签加上背景色
  for (let i = 0; i < tagList.value.length; i++) {
    tagList.value[i].bgc = background_color[Math.floor(Math.random() * 6)];
  }
};
get_all_tags();

const clickTag = (id) => {
    emit('tagClick',id);
}
</script>


<style lang="scss" scoped>
.tag_card {
  width: 100%;
  padding: 0.7rem 0.5rem;
  border-radius: 25px;
  background: #fff;
  box-shadow: 0 3px 8px 6px rgba(7, 17, 27, 0.05);
  margin-bottom: 0.7rem;
  a {
    background-color: #f9ebea;
    margin: 10px;
    padding: 19px 14px;
    display: inline-flex;
    line-height: 0;
    font-size: 1.3em;
    font-weight: 500;
    border-radius: 5px;
    cursor: pointer;
    box-shadow: 0 3px 5px rgb(0 0 0 / 12%);
    color: #34495e;
    text-decoration: none;
    transition: 0.3s;
    &:hover {
      color: #49b1f5;
    }
  }
}
</style>