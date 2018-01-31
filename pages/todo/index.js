// pages/todo/index.js
import Todo from '../../models/Todo'
import todoStore from '../../store/todoStore'

//获取应用实例
const app = getApp()

Page({

  data: {
    // todos
    todos: [],

    //todo计数
    uncompletedCount: 0,
    completedCount: 0,

    //记录手指点击坐标
    clientX: 0,
    clientY: 0
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.syncData()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.syncData()
  },

  //同步数据
  syncData() {
    //获取列表
    this.data.todos = todoStore.getTodos()
    this.update()
  },

  //清单状态改变事件
  handleTodoItemChange(e) {
    let index = e.currentTarget.dataset.index
    let todo = e.detail.data.todo
    let item = this.data.todos[index]
    Object.assign(item, todo)
    this.update()
  },

  //长按进行编辑事件
  handleTodoLongclick(e) {
    wx.navigateTo({
      url: '../todo/create?index=' + e.currentTarget.dataset.index,
    })
  },

  //记录滑动起始坐标
  handleTouchStart(e) {
    if (e.changedTouches) {
      this.data.clientX = e.changedTouches[0].clientX
      this.data.clientY = e.changedTouches[0].clientY
    }
  },
  //通过坐标大小判断滑动状态
  handleTouchEnd(e) {
    let x = e.changedTouches[0].clientX
    let y = e.changedTouches[0].clientY
    let index = e.currentTarget.dataset.index
    if (x - this.data.clientX > 80 && Math.abs(y - this.data.clientY) < 30) {
      this.data.todos[index].completed = !this.data.todos[index].completed
    }
    if (this.data.clientX - x > 80 && Math.abs(y - this.data.clientY) < 30) {
      wx.showModal({
        title: '删除提示',
        content: '确定要删除这项任务吗?',
        success: (e) => {
          if (e.confirm) {
            this.data.todos.splice(index, 1)
            this.update()
          }
        }
      })
    }
    this.update()
  },

  //更新数据
  update(data) {
    data = data || this.data
    data.completedCount = todoStore.getCompletedTodos().length
    data.uncompletedCount = todoStore.getUncompletedTodos().length
    this.setData(data)
  },

  //跳转添加清单事件
  handleAddTodo(e) {
    wx.navigateTo({
      url: '../todo/create'
    })
  }
})