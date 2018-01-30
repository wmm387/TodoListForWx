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
    //为了新建后列表能更新,此逻辑必须写在 onShow 事件
    this.syncData()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.syncData()
  },

  //分享
  onShareAppMessage: function (options) {},

  //同步数据
  syncData() {
    //获取列表
    this.data.todos = todoStore.getTodos()
    this.update()
    //更新置顶标题
    let uncompletedCount = todoStore.getUncompletedTodos().length
    let todayCompletedCount = todoStore.getTodayCompletedTodos().length
    let title = ['TodoList (进行中: ', uncompletedCount, ', 今日已完成: ',
                  todayCompletedCount, ') '].join('')
    wx.setTopBarText({ text: title })
  },

  handleTodoItemChange(e) {
    let index = e.currentTarget.dataset.index
    let todo = e.detail.data.todo
    let item = this.data.todos[index]
    Object.assign(item, todo)
    this.update()
  },

  handleTodoLongclick(e) {
    //获取index
    let index = e.currentTarget.dataset.index
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
  },

  handleTouchStart(e) {
    this.data.clientX = e.changedTouches[0].clientX
    this.data.clientY = e.changedTouches[0].clientY
  },

  handleTouchEnd(e) {
    let x = e.changedTouches[0].clientX
    let y = e.changedTouches[0].clientY
    let index = e.currentTarget.dataset.index
    if (x - this.data.clientX > 100 && Math.abs(y - this.data.clientY) < 30) {
      this.data.todos[index].completed = !this.data.todos[index].completed
    }
    if (this.data.clientX - x > 100 && Math.abs(y - this.data.clientY) < 30) {
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

  update(data) {
    data = data || this.data
    data.completedCount = todoStore.getCompletedTodos().length
    data.uncompletedCount = todoStore.getUncompletedTodos().length
    this.setData(data)
  },

  handleAddTodo(e) {
    wx.navigateTo({
      url: '../todo/create'
    })
  }

})