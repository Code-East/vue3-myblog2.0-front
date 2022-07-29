import request from './request'

//获取所有类别
export const getAllCategorys = () => {
    return request({
        url: '/category/getallcategorys'
    })
}

//获取单个类别的请求
export const getSingleCategory = (id) => {
    return request({
        url: '/category/getsinglecategory/' + id
    })
}

//获取各类别文章数
export const getArticleCategoryCount = () => {
    return request({
        url: '/getarticlecategorycount'
    })
}
