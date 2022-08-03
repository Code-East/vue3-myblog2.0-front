import request from './request'

//请求分页文章
export const getArticleList = (page = 1, pageSize = 5) => {
    return request({
        url: "/article/getarticles",
        params: {
            page,
            pageSize
        }
    })
}
//请求文章总数
export const getArticleCount = (text = '') => {
    return request({
        url: "/article/getcount",
        params: {
            text
        }
    })
}

//获取文章详情
export const getSingleArticle = (id) => {
    return request({
        url: '/article/getsinglearticle/' + id
    })
}

//获取最近的文章
export const getNewArticle = () => {
    return request({
        url: '/article/getnewarticle'
    })
}

//根据类型来获取文章列表
export const getArticleByCategory = (id) => {
    return request({
        url: '/article/getarticlebycategoty',
        params: {
            id
        }
    })
}

//根据标签过去文章列表
export const getArticleByTag = (id) => {
    return request({
        url: '/article/getarticlebytag',
        params: {
            id
        }
    })
}

//根据标签过去文章列表
export const searchArticle = (searchText, page = 1, pageSize = 5) => {
    return request({
        url: '/article/search',
        params: {
            searchText,
            page,
            pageSize
        }
    })
}

//喜欢文章
export const likeArticle = (id,type) => { 
    return request({
        url:'/article/likearticle',
        params:{
            id,
            type
        }
    })
}