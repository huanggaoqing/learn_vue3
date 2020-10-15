<template>
  <div class="item" >
      <div>
          <input v-model="item.isUpcoming" type="checkbox" />
      </div>
      <h3>{{item.title}}</h3>
  </div>
</template>

<script>
export default {
    props:{
        item: Object
    },
    setup(props, context){
        console.log("setup -> props", props.item)
        return {
            item: props.item
        }
    }
}
</script>

<style>
    .item{
        height: 50px;
        background: pink;
        display: flex;
        margin: 20px;
        border-radius: 10px;
        align-items: center;
        padding: 0 10px;
    }
</style>