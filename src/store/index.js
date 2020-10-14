import { createStore } from 'vuex'

export default createStore({
  state: {
    gloubCount: 0
  },
  mutations: {
    setGloubCount(state){
      ++state.gloubCount
    }
  },
})
