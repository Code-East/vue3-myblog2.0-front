<template>
  <div class="pagination_box">
    <el-pagination
      background
      layout="prev, pager, next, jumper"
      v-model:currentPage="page"
      v-model:page-size="pageSize"
      :total="total"
    />
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref, watch } from "vue";
const props = defineProps({
  total: String,
  page: Number,
  pageSize:Number
});
const emit = defineEmits(["changePage"]);
const currentPage = ref(props.page);
const pageSize = ref(props.pageSize);
//监听当前页变化绚烂不同页面的数据
watch(()=>props.page, (newval, oldval) => {
  window.scrollTo(0, 0);
  emit("changePage", newval, pageSize.value);
});
</script>


<style scoped>
.pagination_box {
  margin: 20px 0;
  display: flex;
  justify-content: center;
}
::v-deep .el-pagination__jump {
  color: #fff;
}
</style>