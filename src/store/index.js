import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    list: [],
    inputValue: 'aaa',
    nextId: 5
  },
  getters: {
  },
  mutations: {
    setList(state, data) {
      state.list = data
    },
    setInputValue(state, value) {
      state.inputValue = value
    },
    addItem(state) {
      const obj = {
        id: state.nextId,
        info: state.inputValue,
        done: false
      }
      state.list.push(obj)
      state.inputValue = ''
      state.nextId++
    }
  },
  actions: {
    async getRequestList(context) {
      const { data: res } = await axios.get('/list.json')
      // console.log(res)
      context.commit('setList', res)
    }
  },
  modules: {
  }
})
