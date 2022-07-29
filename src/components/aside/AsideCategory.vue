<template>
  <div class="aside_category">
    <div class="aside_category_title">
      <el-icon><Postcard /></el-icon>
      <span>分类</span>
    </div>
    <div class="category_list">
      <a
        href="javascript:;"
        v-for="item in category_list"
        :key="item.name"
        @click="toCategory(item)"
      >
        <span>{{ item.name }}</span>
        <span>{{ item.value }}</span>
      </a>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { getArticleCategoryCount } from "@/network/category";
import { useRouter } from 'vue-router'

const route = useRouter();
const category_list = ref([]);
const get_all_categorys = async () => {
  const res = await getArticleCategoryCount();
  category_list.value = res.data;
};
get_all_categorys();

const toCategory = (item) => {
  route.push('/category/'+item.category);
};
</script>


<style lang="scss" scoped>
.aside_category {
  padding: 0.4rem 0.4rem;
  margin-top: 0.5rem;
  border-radius: 25px;
  background: #fff;
  box-shadow: 0 3px 8px 6px rgba(7, 17, 27, 0.05);
  .aside_category_title {
    display: flex;
    align-items: center;
    padding-bottom: 0.2rem;
    font-size: 1.5em;
    span {
      margin-left: 0.1rem;
    }
  }
  .category_list {
    a {
      text-decoration: none;
      margin-bottom: 0.3rem;
      position: relative;
      display: flex;
      padding: 0.1rem 0.35rem;
      color: #4c4948;
      justify-content: space-between;
      font-size: 1.3em;
      transition: 0.4s;
      &:hover {
        padding: 0.1rem 0.5rem;
      }

      &::before {
        position: absolute;
        top: 0.15rem;
        left: 0;
        width: 0.1rem;
        height: 0.1rem;
        border: 0.1rem solid #49b1f5;
        border-radius: 0.43rem;
        background: 0 0;
        content: "";
        cursor: pointer;
        transition: all 0.3s ease-out;
      }
      &:hover::before {
        border: 0.1rem solid #ff7242;
      }
    }
  }
}
</style>