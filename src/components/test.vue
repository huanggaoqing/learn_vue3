<template>
  <div>
      {{count}} ===>> {{title}}
      <input type="text"  />
  </div>
</template>

<script>
import { inject, ref } from 'vue'
export default {
    setup(){
        // 子孙组件接受方法
        let count = inject('count')
        let title = inject('title')

        // 多个 v-model 绑定
        let name = ref('')
        let age = ref('')

        return {
            count,
            title
        }
    }
}
</script>

<style>

</style>