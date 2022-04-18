import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    list: [],
    inputValue: 'aaa',
    nextId: 5,
    whichbtn: 'all'
  },
  getters: {
    getNotDone(state) {
      return state.list.filter((item) => !item.done).length
    },
    getNewList(state) {
      switch (state.whichbtn) {
        case 'all':
          return state.list
        case 'notDone':
          return state.list.filter((item) => !item.done)
        case 'done':
          return state.list.filter((item) => item.done)
      }
    }
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
    },
    deleteItem(state, id) {
      const index = state.list.findIndex((item) => item.id === id)
      state.list.splice(index, 1)
    },
    changeChecked(state, obj) {
      const index = state.list.findIndex((item) => item.id === obj.id)
      state.list[index].done = obj.checked
    },
    changeStateBtn(state, btnName) {
      state.whichbtn = btnName
    },
    removeDoneItem(state) {
      state.list = state.list.filter((item) => !item.done)
    }
  },
  actions: {
    async getRequestList(context) {
      const { data: res } = await axios.get('/list.json')
      // console.log(res)
      context.commit('setList', res)
    }
  },
  modules: {}
})
