import { defineStore } from 'pinia'

export const useStore = defineStore('main', {
    state: () => {
        return {
            nowArticlePage:1,
            nowTimePage:1
        }
    }
})
