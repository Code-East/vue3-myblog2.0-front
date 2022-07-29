<template>
  <div class="aside_tag">
    <div class="tag_title">
      <el-icon><PriceTag /></el-icon>
      <span>标签</span>
    </div>
    <div class="tag_list">
      <a
        href="javascript:;"
        v-for="item in tag_list"
        :key="item.tag_id"
        @click="tagClick(item.tag_id)"
      >
        {{ item.tag_name }}
      </a>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { getAllTags } from "@/network/tag";
import { useRouter } from "vue-router";

const router = useRouter();
const tag_list = ref([]);
const get_all_tags = async () => {
  const res = await getAllTags();

  tag_list.value = res.data;
};
get_all_tags();

const tagClick = (id) => {
  console.log('tag_id:',id);
  router.push({
    path:'/tag',
    query:{
      id
    }
  })
};
</script>


<style lang="scss" scoped>
.aside_tag {
  padding: 0.4rem 0.4rem;
  margin-top: 0.5rem;
  border-radius: 25px;
  background: #fff;
  box-shadow: 0 3px 8px 6px rgba(7, 17, 27, 0.05);
  .tag_title {
    display: flex;
    align-items: center;
    padding-bottom: 0.2rem;
    font-size: 1.5em;
    span {
      margin-left: 0.1rem;
    }
  }
  .tag_list {
    a {
      display: inline-block;
      padding: 0 0.2rem;
      color: #99a9bf;
      text-decoration: none;
      font-size: 1.2em;
      transition: 0.4s;
      &:hover {
        color: black;
      }
    }
  }
}
</style>