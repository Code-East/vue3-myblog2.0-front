import request from './request'

//根据文章id 获取标签列表
export const getArticleTags = (id) => {
    return request({
        url: '/tag/getarticletags',
        params: {
            id
        }
    })
}

//获取标签总数
export const getTagCount = (text) => {
    return request({
        url: '/tag/gettagcount?text=' + text
    })
}

//获取所有标签列表
export const getAllTags = () => {
    return request({
        url: '/tag/getalltags',
    })
}