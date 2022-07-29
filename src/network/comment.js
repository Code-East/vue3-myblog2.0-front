import request from './request'
//获取评论总数
export const getCommentCount = (text = '') => {
    return request({
        url: '/comment/getcommentcount?text=' + text
    })
}