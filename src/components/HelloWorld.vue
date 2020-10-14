<template>
  <div class="hello">
    <p>{{count}}</p>
    <p>{{cloneCount}} ===>> cloneCount</p>
    <p>{{value}} ===>> {{title}}</p>
    <p>{{countTwo}} ===>> 计算属性处理后的 count</p>
    <p>{{$store.state.gloubCount}} ===>> vuex 中全局的 count</p>
    <button @click="add" >click add</button>
    <slot></slot>
    <test></test>
  </div>
</template>

<script>
import { reactive, ref, computed, watch, watchEffect, getCurrentInstance, toRefs, provide, onMounted, onBeforeMount, onUpdated, onBeforeUpdate, onBeforeUnmount, onUnmounted } from 'vue'
import test from './test.vue'
export default {
  name: 'HelloWorld',
  props:{
    msg: String
  },

  /**
   * 在 setup 组合式API 里使用状态和方法不用加 this 直接通过名字去访问对应的状态和方法就可以了
   * 有两个参数 props 和 context
   * props 是指该组件中接收的 props 对象
   * context 可以访问 Vue 实例中的 this
   * setup 的调用在 beforeCreate 之后，created 之前
   */
  setup(props, context){

    // 可以访问 Vue 实例中的 this
    console.log("setup -> context", context)
    // 组件中接收的 props 对象 不能结构 不然会失去响应性
    console.log("setup -> props", props.msg)

    /**
     * getCurrentInstance 方法返回的是当前组件的实例对象
     * ctx 是上下文对象， 里面包含了全局的方法以及全局属性
     */
    let { ctx:{ $store, $fn } } = getCurrentInstance()
    console.log("setup -> getCurrentInstance", getCurrentInstance())

    // 状态的两种声明方式
    let count = ref(0) // 单个声明状态 相当于useState 创建出来的数据本身就是响应式的不依赖于谁
    let num = reactive({ // 以对象形式声明多个状态 相当于useReduce 创建出来的对象时响应式的，里面的每一项值不是响应式的，当需要展开对象或者单独使用某一项值时为了保证响应式，需要使用 toRefs
      value: 1,
      title: '这是一个对象变量'
    })

    let cloneCount = count

    // 计算属性
    let countTwo = computed(() => count.value + 10)

    // 监听属性 默认是深度监听
    watch(count,(newVal, oldVal, clean) => {
      console.log("监听 count 中...", `新${newVal}---旧${oldVal}`)
      clean(() => console.log("Clean"));
    })
    // 监听对象中的某一个属性
    watch(() => num.value, (newVal, oldVal) => {
      console.log("监听 num.value 中...", `新${newVal}---旧${oldVal}`)
    })
    // 监听多个值
    watch([count, () => num.value], (newArr, oldArr) => {
      console.log("多个监听中...", `新${newArr}---旧${oldArr}`)
    })

    // 作用是监听 有点像 useEffect 除了初始化执行一次以外，依赖项发生变化时也会执行， 和 watch 不同的是，它初始化时会执行一次
    watchEffect(() => {
      console.log(`第${count.value}次执行`)
    })

    // 向子孙组件传递数据 两个参数 第一个是名字 第二个是值
    provide('count', count)

    /**
     * 需要使用 reactive 创建的对象里的单独一个属性值的时候， 需要使用 toRefs 将对象中的每个值都变成响应式的
     * 因为 reactive 创建的对象 只有对象本身具有响应式，属性值不具有响应式 所以为了保证响应式就需要让每个值都具有响应式
     */
    provide('title', toRefs(num).title)


    // 生命周期写法
    // 只在初始化时执行一次
    onBeforeMount(() => {
      console.log('渲染完成之前')
    })
    onMounted(() => {
      console.log('渲染完成之后')
    })
    // 初始化时不会执行 会有多次触发
    onBeforeUpdate(() => {
      console.log('数据改变，视图重新渲染完成前')
    })
    onUpdated(() => {
      console.log('数据改变，视图重新渲染完成后')
    })
    // 只在组件卸载时执行一次
    onBeforeUnmount(() => {
      console.log('卸载之前')
    })
    onUnmounted(() => {
      console.log('卸载之后')
    })

    // 事件函数
    let add = () => {
      ++count.value
      ++num.value
      $store.commit('setGloubCount') // 触发改变 vuex 状态的方法
      num.title = 'Hello Vue3'
      $fn()
    }
    
    return {
      count,
      add,
      ...toRefs(num),
      countTwo,
      cloneCount
    }
  },
  components:{
    test
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
