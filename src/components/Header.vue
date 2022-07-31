<script setup>
import { ref, watch, onUnmounted, onMounted } from "vue";
import Drawer from "./Drawer.vue";
import { header_nav_list } from "@/utils/variable.js";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";

const router = useRouter();

const drawer = ref(false);
const click_drawer = () => {
  drawer.value = !drawer.value;
};
const ishind = ref(true);
const iszore = ref(false);
const scrollTop = ref(0);

const callback = () => {
  scrollTop.value = window.scrollY;
};
//绑定滚动事件
window.addEventListener("scroll", callback);
//监听滚动的位置 修改header的样式
watch(
  scrollTop,
  (newval, oldval) => {
    if (newval != 0) {
      iszore.value = true;
    } else {
      iszore.value = false;
    }
    if (newval > oldval) {
      ishind.value = true;
    } else {
      ishind.value = false;
    }
  },
  { immediate: true }
);
//点击跳转
const itemClick = (item) => {
  //判断是否是search
  if (item.path == "/search") {
    dialogVisible.value = true;
  } else {
    router.push(item.path);
  }
};
//当组件挂载是让滚动条在顶部
onMounted(() => {
  window.scrollTo(0, 0);
});
//当组件卸载是让滚动条在顶部 解绑事件
onUnmounted(() => {
  window.scrollTo(0, 0);
  window.removeEventListener("scroll", callback);
});

//dialog的操作
const dialogVisible = ref(false);
//关闭弹窗
const handleClose = () => {
  dialogVisible.value = false;
};
//搜索
let msg = "";
const searchText = ref("");
const toSearch = () => {
  if (searchText.value == "") {
    if (msg) {
      msg.close();
    }
    msg = ElMessage({
      type: "warning",
      message: "你都没输入内容,搜啥呢！！！",
    });
  } else {
    dialogVisible.value = false;
    router.push({
      path: "/search",
      query: {
        text: searchText.value,
      },
    });
  }
};
</script>

<template>
  <header class="by_header">
    <div class="header_nav" :class="{ hind: ishind, notzore: iszore }">
      <a href="javascript:;" @click="itemClick({ path: '/index' })">East</a>
      <!-- 电脑屏显示的menu -->
      <div class="header_menu">
        <ul>
          <li v-for="(item, i) in header_nav_list" :key="item.path">
            <a href="javascript:;" @click="itemClick(item)">
              <el-icon> <component :is="item.icon"></component> </el-icon>
              <span>{{ item.name }}</span>
            </a>
          </li>
        </ul>
      </div>
      <!-- 小屏显示的menu -->
      <div class="phone_menu">
        <span
          ><el-icon><Search /></el-icon
        ></span>
        <span @click="click_drawer"
          ><el-icon><Fold /></el-icon
        ></span>
      </div>
    </div>
  </header>
  <Drawer v-model="drawer"></Drawer>
  <el-dialog
    v-model="dialogVisible"
    title="文章搜索"
    width="40%"
    :close="handleClose"
  >
    <input
      type="text"
      v-model="searchText"
      placeholder="请输入关键字进行搜索..."
      class="dialog_inp"
      @keydown.enter="toSearch"
      autofocus="true"
    />
    <el-divider border-style="dashed" />
  </el-dialog>
</template>

<style lang="scss" scoped>
$light-grey: #eee;
header {
  position: relative;
  height: 1rem;
  .header_nav {
    position: fixed;
    top: 0;
    z-index: 90;
    display: flex;
    align-items: center;
    padding: 0 0.5rem;
    width: 100%;
    height: 60px;
    font-size: 1.3em;
    animation: header_animation 1s;
    transition: 0.5s;
    justify-content: space-between;
    & > a {
      color: $light-grey;
      text-decoration: none;
      font-weight: bold;
      font-size: 0.4rem;
    }
    .header_menu > ul {
      display: flex;
      list-style: none;
      translate: 1s;
      & li {
        position: relative;
        display: inline-block;
        padding: 0 0 0 0.5rem;
        text-align: center;
        a {
          display: flex;
          align-items: center;
          color: $light-grey;
          text-decoration: none;
          text-shadow: 0.05rem 0.05rem 0.1rem rgb(0 0 0 / 30%);
          font-size: 1em;
          cursor: pointer;
          overflow: hidden;
          &::after {
            content: "";
            position: absolute;
            bottom: -4px;
            left: -30px;
            width: 1rem;
            height: 0.05rem;
            background-color: #80c8f8;
            border-radius: 4px;
            opacity: 0;
            transition: all 0.5s ease;
          }
          &:hover::after {
            left: 28px;
            opacity: 1;
          }

          i {
            font-weight: bold;
            margin-right: 0.1rem;
          }
        }
      }
    }
    .phone_menu {
      span {
        color: $light-grey;
        font-size: 0.5rem;
        margin-left: 0.3rem;
      }
    }
  }
}
.hind {
  transform: translateY(-100%);
}
.notzore {
  background: rgb(0 0 0 / 30%);
}
.dialog_inp {
  width: 100%;
  padding: 0.2rem 0.3rem;
  border: 2px solid #49b1f5;
  border-radius: 2rem;
  color: #4c4948;
  outline: none;
  font-family: myfont;
}

@media screen and (max-width: 750px) {
  .header_menu {
    display: none;
  }
  .phone_menu {
    display: block;
  }
}
@media screen and (min-width: 750px) {
  .header_menu {
    display: block;
  }
  .phone_menu {
    display: none;
  }
}
</style>
