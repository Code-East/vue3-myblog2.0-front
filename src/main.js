import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import 'lib-flexible'

import imgLazy from '@/hooks/lazyload'

//导入element的icon
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const app = createApp(App);
// 全局注册图片懒加载
imgLazy(app)
//循坏注册所有的icon图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.use(createPinia()).use(router).mount('#app')
