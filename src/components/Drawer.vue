<template>
  <el-drawer
    v-model="drawer"
    size="70%"
    @close="click_drawer"
    custom-class="my_drawer"
    :with-header="false"
  >
    <div class="drawer_box">
      <div class="author_pic">
        <img
          src="http://lxoblog-image.test.upcdn.net/userpic/IMG_0773.JPG"
          alt="头像"
        />
      </div>
      <div class="user_data">
        <div class="data_item">
          <span>文章</span>
          <span>23</span>
        </div>
        <div class="data_item">
          <span>标签</span>
          <span>22</span>
        </div>
        <div class="data_item">
          <span>评论</span>
          <span>45</span>
        </div>
      </div>
      <el-divider />
      <div class="phone_nav">
        <ul>
          <li v-for="(item, i) in header_nav_list" :key="item.path">
            <a href="javascript:;" @click="itemClick(item)"
              ><el-icon> <component :is="item.icon"></component> </el-icon>
              <span>{{ item.name }}</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </el-drawer>
</template>

<script setup>
import { defineProps } from "vue";
import { header_nav_list } from "@/utils/variable.js";
import { useRouter } from "vue-router";
const router = useRouter();
const props = defineProps({
  drawer: Boolean,
});
//点击跳转
const itemClick = (item) => {
  router.push(item.path);
};
</script>


<style lang="scss" scoped>
$font-color: #4c4948;
$light-grey: #eee;
.my_drawer .drawer_box {
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    margin: 0 auto;
  }
  .user_data {
    width: 100%;
    display: flex;
    justify-content: space-around;
    font-size: 0.4rem;
    margin-top: 0.1rem;
    .data_item {
      display: flex;
      flex-direction: column;
      align-items: center;
      cursor: pointer;
    }
  }
  .phone_nav {
    width: 100%;
  }
  .phone_nav ul {
    display: flex;
    flex-direction: column;
    list-style: none;
    translate: 1s;
    & li {
      display: inline-block;
      margin-top: 0.6rem;
      padding: 0 0 0 0.5rem;
      a {
        display: flex;
        align-items: center;
        color: black;
        text-decoration: none;
        font-size: 1em;
        cursor: pointer;
        font-size: 0.4rem;
        i {
          font-weight: bold;
          margin-right: 0.1rem;
        }
      }
    }
  }
}
</style>