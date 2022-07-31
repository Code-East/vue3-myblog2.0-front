<template>
  <div class="time_line">
    <h1 class="title">文章归档</h1>
    <el-timeline>
      <el-timeline-item
        v-for="item in timeList"
        :key="item.article_id"
        :timestamp="item.created_time"
        placement="top"
        :color="item.color"
      >
        <el-card>
          <img
            :src="item.article_img"
            alt="文章图片"
            class="article_img"
            @click="toDetail(item.article_id)"
          />
          <div class="content">
            <p>
              <el-icon><Watch /></el-icon>
              更新与 {{ item.created_time }}
            </p>
            <a href="javascript:;" @click="toDetail(item.article_id)">
              {{ item.title }}
            </a>
          </div>
        </el-card>
      </el-timeline-item>
    </el-timeline>
    <pagination
      :total="total"
      :page="currentPage"
      :pageSize="8"
      @changePage="change_page"
    ></pagination>
  </div>
</template>

<script setup>
import { getArticleList, getArticleCount } from "@/network/article";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { background_color } from "@/utils/variable.js";
import { useStore } from "@/store";
import pagination from "./pagination.vue";

const router = useRouter();
const store = useStore();
const total = ref(0);
//获取store中的page
const currentPage = ref(store.nowTimePage);
const timeList = ref("");

const get_article_list = async (page, pageSize) => {
  const res = await getArticleList(page, pageSize);
  timeList.value = res.data;
  //为每一个标签加上背景色
  for (let i = 0; i < timeList.value.length; i++) {
    timeList.value[i].color = background_color[Math.floor(Math.random() * 6)];
  }
};
const get_article_count = async (text) => {
  const res = await getArticleCount(text);
  total.value = res.data;
};

get_article_list(currentPage.value, 8);
get_article_count("");

const toDetail = (id) => {
  router.push("/detail/" + id);
};

const change_page = (page, pageSize) => {
  store.nowTimePage = page;
  get_article_list(page, 8);
};
</script>


<style lang="scss" scoped>
.title {
  font-size: 2em;
  margin-bottom: 0.5rem;
}
.time_line {
  width: 100%;
  padding: 0.7rem 0.5rem;
  border-radius: 25px;
  background: #fff;
  box-shadow: 0 3px 8px 6px rgba(7, 17, 27, 0.05);
  margin-bottom: 0.5rem;
}
::v-deep .el-card__body {
  display: flex;
}
.article_img {
  overflow: hidden;
  width: 1.4rem;
  height: 1.4rem;
  border-radius: 5px;
  transition: all 0.5s;
  &:hover {
    cursor: pointer;
    transform: scale(1.1);
  }
}
.content {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-left: 0.5rem;
  color: #858585;
  a {
    text-decoration: none;
    color: #4c4948;
    font-size: 1.2em;
    transition: 0.3s;
    &:hover {
      color: #49b1f5;
    }
  }
}
</style>