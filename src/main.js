import { createApp } from 'vue'
import '@/assets/css/rewrite-element.scss'
import ElementPlus from 'element-plus'


import App from './App.vue'
import router from './router'
import store from './store'
import "@/assets/css/global.scss"
import "@/assets/font/font.scss"

createApp(App).use(store).use(router).use(ElementPlus).mount('#app')
