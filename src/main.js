import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// vue3 中全局通知是要在 createApp 后面使用 .use 进行链式操作
createApp(App)
.use(store)
.use(router)
.mount('#app')
