<template>
  <div class="time_line">
    <h1 class="title">文章归档</h1>
    <el-timeline>
      <el-timeline-item timestamp="2018/4/12" placement="top" hollow color="#49b1f5">
        <el-card>
          <h4>Update Github template</h4>
          <p>Tom committed 2018/4/12 20:46</p>
        </el-card>
      </el-timeline-item>
      <el-timeline-item timestamp="2018/4/3" placement="top" hollow>
        <el-card>
          <h4>Update Github template</h4>
          <p>Tom committed 2018/4/3 20:46</p>
        </el-card>
      </el-timeline-item>
      <el-timeline-item timestamp="2018/4/2" placement="top">
        <el-card>
          <h4>Update Github template</h4>
          <p>Tom committed 2018/4/2 20:46</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script setup>
</script>


<style scoped>
.title{
    font-size: 2em;
    margin-bottom: 0.5rem;
}
.time_line {
  width: 100%;
  padding: 0.7rem 0.5rem;
  border-radius: 25px;
  background: #fff;
  box-shadow: 0 3px 8px 6px rgba(7, 17, 27, 0.05);
}
</style>