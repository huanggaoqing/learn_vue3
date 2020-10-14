<template>
  <div>
      {{count}} ===>> {{title}}
  </div>
</template>

<script>
import { inject } from 'vue'
export default {
    setup(){
        // 子孙组件接受方法
        let count = inject('count')
        let title = inject('title')

        return {
            count,
            title
        }
    }
}
</script>

<style>

</style>