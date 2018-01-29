// components/todo-item/todo-item.js
import Todo from '../../models/Todo'
import util from '../../utils/util'

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    todo: {
      type: Todo,
      default: new Todo()
    },

    autoFocus: {
      type: Boolean,
      default: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleCompletedChange(e) {
      let index = e.detail.dataset.index
      let checked = e.detail.data.checked
      this.data.todo.completed = checked
      this.data.todo.completedAt = util.formatTime(new Date())
      this.update()
    },

    handleTitleChange(e) {
      this.data.todo.title = e.detail.value
      this.update()
    },

    handleDateChange(e) {
      this.data.todo.date = e.detail.value.replace(/\-/g, '/')
      this.update()
    },

    update(data) {
      data = data || this.data
      this.setData(data)
      this.triggerEvent('change', this)
    }
  }
})
