<script setup>
import { ref, watch, onUnmounted, onMounted } from "vue";
import Drawer from "./Drawer.vue";
import { header_nav_list } from "@/utils/variable.js";
import { useRouter } from "vue-router";
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
window.addEventListener("scroll",callback);
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
  router.push(item.path);
};
//当组件挂载是让滚动条在顶部
onMounted(()=>{
  window.scrollTo(0,0);
});
//当组件卸载是让滚动条在顶部 解绑事件
onUnmounted(() => {
  window.scrollTo(0,0);
  window.removeEventListener("scroll",callback);
});
</script>

<template>
  <header class="by_header">
    <div class="header_nav" :class="{ hind: ishind, notzore: iszore }">
      <a href="javascript:;" @click="itemClick({path:'/index'})">East</a>
      <div class="header_menu">
        <ul>
          <li v-for="(item, i) in header_nav_list" :key="item.path">
            <a href="javascript:;" @click="itemClick(item)"
              ><el-icon> <component :is="item.icon"></component> </el-icon>
              <span>{{ item.name }}</span>
            </a>
          </li>
        </ul>
      </div>
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
