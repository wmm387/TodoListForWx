// components/todo-item/todo-item.js
import Todo from '../../models/Todo'
import util from '../../utils/util'

Component({

  properties: {
    todo: {
      type: Todo,
      defalut: new Todo()
    },
  },

  data: {},

  methods: {

    //checkbox点击事件
    handleCheckToggle(e) {
      this.data.todo.completed = !this.data.todo.completed
      this.setData(this.data)
      this.triggerEvent('change', this)
    },
  }
})
