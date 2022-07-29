import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: "/index" },
        { path: '/index', name: 'index', component: () => import('@/view/index.vue') },
        { path: '/article', name: 'article', component: () => import('@/view/article.vue') },
        { path: '/about', name: 'about', component: () => import('@/view/about.vue') },
        { path: '/detail/:id', name: 'detail', component: () => import('@/view/detail.vue') },
        { path: '/category/:id', name: 'category', component: () => import('@/view/category.vue') },
        { path: '/tag', name: 'tag', component: () => import('@/view/tag.vue') },
    ]
})

export default router;