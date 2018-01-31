// pages/todo/create.js
import Todo from '../../models/Todo'
import todoStore from '../../store/todoStore'

Page({

  data: {
    //todo
    todo: new Todo(),
    //编辑标识
    edit: false,
  },

  onLoad: function (options) {
    //通过是否有传入的参数进行编辑状态判断
    if (options.index) {
      this.data.edit = true
      let editTodo = todoStore.getTodoByIndex(options.index)
      this.data.todo = new Todo(editTodo)
    } else {
      this.data.todo = new Todo()
    }
    this.update()
  },

  //清单标题修改事件
  handleTitleChange(e) {
    this.data.todo.title = e.detail.value
    this.update()
  },

  //保存按钮点击事件
  handleSaveTap(e) {
    //判断是否在编辑状态
    if (this.data.edit) {
      todoStore.editTodo(this.data.todo.uuid, this.data.todo)
    } else {
      todoStore.addTodo(this.data.todo)
    }
    todoStore.save()
    wx.navigateBack()
    wx.showToast({ title: '保存成功' })
  },

  //更新数据
  update(data) {
    data = data || this.data
    this.setData(data)
  }
})