import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible' // 引入移动端适配

// vue3 中全局通知是要在 createApp 后面使用 .use 进行链式操作
const app = createApp(App)
app.use(store)
app.use(router)
app.mount('#app')
// vue3 挂载全局方法或全局属性写法
app.config.globalProperties.$fn = () => {alert('执行了')}

// 全局混入 不管哪个组件都会走这个里面的内容
app.mixin({
    beforeCreate() {
      console.log('我是全局mixin')
    },
})

