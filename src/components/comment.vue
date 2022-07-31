<template>
  <div id="comment">
    <div class="content">
      <div class="comment_bar">
        <h3>评论</h3>
        <div>
          <el-collapse v-model="activeName">
            <el-collapse-item title="评论内容" name="1" class="comment_list">
              <template v-if="!noComment">
                <div
                  class="comment_item"
                  v-for="item in comment_data"
                  :key="item.comment_id"
                >
                  <div class="parent_comment">
                    <div class="comment_user">
                      <span class="name"
                        ><el-icon><Avatar /></el-icon
                        >{{ item.comment_nickname }}</span
                      >
                      <time>{{ item.create_time }}</time>
                    </div>
                    <p>{{ item.content }}</p>
                    <a
                      href="javascript:;"
                      @click="
                        replyClick(item.comment_id, item.comment_nickname)
                      "
                      >回复</a
                    >
                  </div>
                  <div class="child_comment" v-if="item.child">
                    
                      <div v-for="child_item in item.child" class="child_item">
                        <div class="comment_user">
                          <span class="name"
                            ><el-icon><Avatar /></el-icon
                            >{{ child_item.comment_nickname }}</span
                          >
                          <span class="reply"
                            >@{{ child_item.parent_name }}</span
                          >
                          <time>{{ child_item.create_time }}</time>
                        </div>
                        <p>{{ child_item.content }}</p>
                        <a
                          href="javascript:;"
                          @click="
                            replyClick(
                              child_item.comment_id,
                              child_item.comment_nickname
                            )
                          "
                          >回复</a
                        >
                      </div>
                    
                  </div>
                </div>
              </template>
              <div v-if="noComment">暂无评论,快去评论去留下你的足迹吧</div>
            </el-collapse-item>
          </el-collapse>
        </div>
      </div>

      <div class="txt">
        <textarea
          class="textarea"
          cols="138"
          rows="10"
          :placeholder="place"
          v-model="commentObj.content"
        ></textarea>
      </div>
      <div class="inp">
        <el-input
          placeholder="邮箱"
          v-model="commentObj.comment_email"
          class="email"
        ></el-input>
        <el-input
          placeholder="用户名"
          v-model="commentObj.comment_nickname"
          class="user"
        ></el-input>
        <el-button type="success" @click="btnClick">发布</el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed, reactive } from "vue";
import { getCommentList, addComment } from "@/network/comment";
import { filterComment } from "@/utils/filterComment";
import { ElMessage } from "element-plus";
import { formatDate } from "@/utils/formatDate";

const props = defineProps({
  articleId: Number,
});
const comment_data = ref([]);
//折叠评论默认展开 1
const activeName = ref(["1"]);

//获取评论列表
const noComment = ref(true);
const get_comment_list = async (id) => {
  const res = await getCommentList(id);
  if (res.data.length >= 1) {
    noComment.value = false;
    comment_data.value = filterComment(res.data);
  }
};
watch(
  () => props.articleId,
  (val) => {
    get_comment_list(val);
    //把当前文章id传入
    commentObj.article_id = val;
  }
);

//评论对象
const commentObj = reactive({
  comment_nickname: "",
  comment_email: "",
  parent_id: null,
  parent_name: null,
  create_time: "",
  content: "",
  article_id: "",
});

//判定text框的内容
const place = computed(() =>
  commentObj.parent_name ? "@" + commentObj.parent_name : "请输入评论内容"
);
//点击回复
const replyClick = (comment_id, comment_nickname) => {
  commentObj.parent_id = comment_id;
  commentObj.parent_name = comment_nickname;
};

let msg;
//点击发布评论
const btnClick = async () => {
  //判断内容是否完整
  if (
    commentObj.comment_nickname == "" ||
    commentObj.email == "" ||
    commentObj.content == ""
  ) {
    if (msg) {
      msg.close();
    }
    msg = ElMessage({
      type: "warning",
      message: "请将内容填写完整在发表评论哦！",
    });
    return;
  }
  //判断邮箱是否正确
  const regex = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
  if (!regex.test(commentObj.comment_email)) {
    if (msg) {
      msg.close();
    }
    msg = ElMessage({
      type: "warning",
      message: "请填写正确的邮箱格式！",
    });
    return;
  }
  //创建评论的时间
  commentObj.create_time = formatDate(new Date());
  //发送增加评论请求
  const res = await addComment(commentObj);
  if (res.code === 0) {
    msg = ElMessage({
      type: "success",
      message: "评论成功！",
    });
    commentObj.content = "";
    //重新获取评论数据
    get_comment_list(props.articleId);
  }
};
</script>

<style lang="scss" scoped>
#comment {
  margin-top: 0.5rem;
  .content .comment_bar {
    width: 100%;
    border-top: 2px solid #00b5ad;
    background: #fff;
    border-radius: 5px;
    box-shadow: 0 1px 2px 0 rgba(34, 36, 38, 0.15);
    h3 {
      font-size: 20px;
      font-weight: 700;
      color: rgba(0, 0, 0, 0.87);
      margin-left: 10px;
    }
  }
}
#comment .content .txt {
  margin-top: 15px;
  .textarea {
    width: 100%;
    border: solid 1px rgba(34, 36, 38, 0.15);
    border-radius: 6px;
    resize: none;
    outline: none;
    color: rgba(0, 0, 0, 0.87);
    padding: 5px;
    font-size: 16px;
    font-family: myfont;
  }
}

#comment .content .inp {
  width: 100%;
  display: flex;
  margin-top: 0.3rem;
  .email {
    width: 150%;
    margin-right: 10px;
    font-family: myfont;
  }
  .user {
    margin: 0 0.2rem;
    font-family: myfont;
  }
}
.comment_list {
  padding: 5px 5px;
  .parent_comment {
    padding: 0.1rem;
    .comment_user {
      display: flex;
      align-items: center;
      .name {
        font-size: 1.2em;
        margin-right: 0.1rem;
        display: flex;
        align-items: center;
      }
      time {
        color: gray;
      }
    }
    p {
      width: 100%;
      font-size: 1.1em;
      border-radius: 5px;
    }
  }
  .child_comment {
    padding: 0.1rem;
    padding-left: 0.6rem;
    border-left: 1px solid gray;
    .child_item {
      margin: 0.2rem 0;
    }
    .comment_user {
      display: flex;
      align-items: center;
      .name {
        font-size: 1.2em;
        margin-right: 0.1rem;
        display: flex;
        align-items: center;
      }
      .reply {
        font-size: 1.2em;
        color: #1abc9c;
        margin-right: 0.2rem;
      }
      time {
        color: gray;
      }
    }

    p {
      width: 100%;
      font-size: 1.1em;
      border-radius: 5px;
    }
  }
  & a {
    color: gray;
    &:hover {
      color: #2980b9;
    }
  }
}
</style>