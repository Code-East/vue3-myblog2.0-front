<template>
  <div class="article_card">
    <div class="img_box">
      <img
        :src="articleData.article_img"
        alt="文章图片"
        @click="toDetail(articleData.article_id)"
      />
      <!-- v-lazyload="v.image" -->
    </div>
    <div class="card_content">
      <a href="javascript:;" @click="toDetail(articleData.article_id)">{{
        articleData.title
      }}</a>
      <div class="content_tag">
        <div class="content_time">
          <div>
            <el-icon color="rgb(131, 164, 255)"><Calendar /></el-icon>
            <span class="text">发布与{{ articleData.created_time }}</span>
            <span class="gap">|</span>
          </div>
          <div>
            <el-icon color="rgb(131, 164, 255)"><Timer /></el-icon>
            <span class="text">更新与{{ disTimer }}</span>
          </div>
        </div>
        <div class="content_category">
          <div>
            <el-icon color="rgb(131, 164, 255)"><FolderRemove /></el-icon>
            <span class="text">{{ category }}</span>
            <span class="gap">|</span>
          </div>
          <div>
            <el-icon color="rgb(131, 164, 255)"><PriceTag /></el-icon>
            <span class="text" v-for="item in tags" :key="item.tag_id">
              {{ item.tag_name }}
            </span>
          </div>
        </div>
      </div>
      <div class="content_text">
        {{ articleData.article_summary }}
      </div>
      <div class="author">{{ articleData.author }}</div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref } from "vue";
import { getSingleCategory } from "@/network/category.js";
import { getArticleTags } from "@/network/tag.js";
import { useRouter } from "vue-router";
const router = useRouter();

const props = defineProps({
  articleData: Object,
});
//图片出错 或者为空设置默认图片
if (!props.articleData.article_img) {
  props.articleData.article_img = "@/assets/img/loadfail.jpg";
}
//距离本月时间
const disTimer = ref("");
//分类
const category = ref("");
//标签
const tags = ref("");

const nowtime = new Date().getMonth() + 1;
const oldtime = new Date(props.articleData.created_time).getMonth() + 1;
disTimer.value = nowtime - oldtime;
if (disTimer.value == 0) {
  disTimer.value = "本月";
} else {
  disTimer.value += "个月前";
}

// 获取文章分类
const get_single_category = async (id) => {
  const res = await getSingleCategory(id);
  category.value = res.data.category_name;
};
//获取文章标签
const get_article_tags = async (id) => {
  const res = await getArticleTags(id);
  tags.value = res.data;
};
//根据文章的分类id 获取分类
get_single_category(props.articleData.category);
//根据文章的id 获取tag列表
get_article_tags(props.articleData.article_id);

//点击跳转到详情页
const toDetail = (id) => {
  router.push("/detail/" + id);
};
</script>


<style lang="scss" scoped>
$card_bg: #fff;
$card-box-shadow: 0 3px 8px 6px rgba(7, 17, 27, 0.05);
$text-highlight-color: #1f2d3d;
$text-bg-hover: #49b1f5;
.article_card {
  display: flex;
  align-items: center;
  height: 5.2rem;
  border-radius: 25px;
  background: $card-bg;
  box-shadow: $card-box-shadow;
  transition: all 0.3s;
  margin-bottom: 0.4rem;
  &:hover {
    box-shadow: 0 4px 12px 12px rgba(7, 17, 27, 0.15);
  }
  .img_box {
    overflow: hidden;
    width: 45%;
    height: 100%;
    border-radius: 25px 0 0 25px;
    img {
      width: 100%;
      height: 100%;
      transition: all 0.6s;
      object-fit: cover;
      &:hover {
        cursor: pointer;
        transform: scale(1.1);
      }
    }
  }
  .card_content {
    overflow: hidden;
    padding: 0 0.7rem;
    width: 55%;
    a {
      display: block;
      text-decoration: none;
      margin-bottom: 0.2rem;
      color: $text-highlight-color;
      font-size: 2em;
      transition: all 0.2s ease-in-out;
      &:hover {
        color: $text-bg-hover;
      }
    }
    .content_tag {
      color: #858585;
      font-size: 0.25rem;
    }
    .content_time,
    .content_category {
      display: -webkit-box;
      overflow: hidden;
      margin-bottom: 0.2rem;
      div {
        display: inline-flex;
        align-items: center;
        .gap {
          margin: 0 0.2rem;
        }
        .text {
          margin-left: 0.2rem;
        }
      }
    }
    .content_text {
      color: #4c4948;
      -webkit-line-clamp: 3;
      display: -webkit-box;
      overflow: hidden;
      -webkit-box-orient: vertical;
      font-size: 1.2em;
    }
  }
  .author {
    float: right;
    font-size: 1.2em;
    color: #49b1f5;
  }
}
@media screen and (max-width: 750px) {
  .article_card {
    flex-direction: column;
    height: auto;
    .img_box {
      width: 100%;
      border-radius: 25px 25px 0 0;
    }
    .card_content {
      width: 100%;
      padding-bottom: 0.2rem;
    }
  }
}
</style>