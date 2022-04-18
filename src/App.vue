<template>
  <div id="app">
    <a-input placeholder="请输入任务" class="my_ipt" :value="inputValue" @change="inputChange" />
    <a-button type="primary" @click="addListItem">添加事项</a-button>

    <a-list bordered :dataSource="getNewList" class="dt_list">
      <a-list-item slot="renderItem" slot-scope="item">
        <!-- 复选框 -->
        <a-checkbox :checked="item.done" @change="checkboxChange($event, item.id)">{{ item.info }}</a-checkbox>
        <!-- 删除链接 -->
        <a slot="actions" @click="deleteListItem(item.id)">删除</a>
      </a-list-item>

      <!-- footer区域 -->
      <div slot="footer" class="footer">
        <!-- 未完成的任务个数 -->
        <span>{{ getNotDone }}条剩余</span>
        <!-- 操作按钮 -->
        <a-button-group>
          <a-button :type="whichbtn === 'all' ? 'primary' : 'default'" @click="changeBtn('all')">全部</a-button>
          <a-button :type="whichbtn === 'notDone' ? 'primary' : 'default'" @click="changeBtn('notDone')">未完成</a-button>
          <a-button :type="whichbtn === 'done' ? 'primary' : 'default'" @click="changeBtn('done')">已完成</a-button>
        </a-button-group>
        <!-- 把已经完成的任务清空 -->
        <a @click.prevent="removeDone">清除已完成</a>
      </div>
    </a-list>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'app',
  data() {
    return {}
  },
  computed: {
    ...mapState(['inputValue', 'whichbtn']),
    ...mapGetters(['getNotDone', 'getNewList'])
  },
  created() {
    this.$store.dispatch('getRequestList')
  },
  methods: {
    inputChange(e) {
      this.$store.commit('setInputValue', e.target.value)
    },
    addListItem() {
      if (this.inputValue.trim().length <= 0) return this.$message.warning('任务输入不能为空！')
      this.$store.commit('addItem')
    },
    deleteListItem(id) {
      this.$store.commit('deleteItem', id)
    },
    checkboxChange(e, id) {
      const obj = {
        checked: e.target.checked,
        id: id
      }
      this.$store.commit('changeChecked', obj)
    },
    changeBtn(btnName) {
      this.$store.commit('changeStateBtn', btnName)
    },
    removeDone() {
      this.$store.commit('removeDoneItem')
    }
  }
}
</script>

<style scoped>
#app {
  padding: 10px;
}

.my_ipt {
  width: 500px;
  margin-right: 10px;
}

.dt_list {
  width: 500px;
  margin-top: 10px;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
