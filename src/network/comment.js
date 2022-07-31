import request from './request'
//获取评论总数
export const getCommentCount = (text = '') => {
    return request({
        url: '/comment/getcommentcount?text=' + text
    })
}

//根据文章id 获取评论
export const getCommentList = (id) => {
    return request({
        url: '/comment/getcommentlist',
        params:{
            id
        }
    })
}

//增加评论
export const addComment = (data) => {
    return request({
        url: '/comment/addcomment',
        method:'post',
        data:data
    })
}
