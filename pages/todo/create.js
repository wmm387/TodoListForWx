// pages/todo/create.js
import Todo from '../../models/Todo'
import todoStore from '../../store/todoStore'

Page({

  data: {
    //todo
    todo: new Todo(), 
  },

  onLoad: function (options) {
    this.data.todo = new Todo()
    this.update()  
  },

  //分享
  onShareAppMessage: function (options) {},

  //Todo改变事件
  handleTodoItemChange(e) {
    let todo = e.detail.data.todo
    Object.assign(this.data.todo, todo)
    this.update()
  },

  //描述输入事件
  handleDescChange(e) {
    this.data.todo.desc = e.detail.value
    this.update()
  },

  //取消按钮点击事件
  handleCancelTap(e) {
    wx.navigateBack()
  },

  //保存按钮点击事件
  handleSaveTap(e) {
    todoStore.addTodo(this.data.todo)
    todoStore.save()
    wx.navigateBack()
  },

  update(data) {
    data = data || this.data
    this.setData(data)
  }
})