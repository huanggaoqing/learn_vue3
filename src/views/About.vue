<template>
  <div class="about">
    <div class="input" >
      <input v-model="cont" />
      <button @click="addUpcoming" >添加待办事项</button>
    </div>
    <div>
      <Item v-for="(i) in todoList" :item="i" :key="i.title" />
    </div>
  </div>
</template>

<script>
import { ref, reactive, toRefs, watch } from 'vue'
import Item from '../components/domeComponent/item.vue'
export default {
  setup(){

    let cont = ref('')
    let todoList = reactive([
      {title:'666', isUpcoming: false}
    ])
    // 添加待办方法
    let addUpcoming = () => {
      // alert(1)
      todoList.push({title: cont.value, isUpcoming: false})
    }

    watch(todoList, (newVal, oldVal) => {
      console.log("setup -> newVal, oldVal", newVal, oldVal)
    })

    return {
      cont,
      todoList,
      addUpcoming
    }
  },
  components:{
    Item,
  }
}
</script>

<style>
  .input{
    padding: 10px 20px;
    background: pink;
    border-radius: 10px;
    display: flex;
  }
  .input input{
    /* width: 100%; */
    flex: 1;
    height: 30px;
    border-radius: 10px;
    outline: none;
    border: none;
    padding: 0 20px;
    box-sizing: border-box;
  }
  .input button{
    border: none;
    background: mediumturquoise;
    outline: none;
    margin-left: 10px;
    border-radius: 10px;
  }
</style>