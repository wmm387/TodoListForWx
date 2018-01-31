import util from '../utils/util'
import Store from  './Store'
import Todo from '../models/Todo'

class TodoStore extends Store {

   constructor() {
      super()
      this.todos = []
      this.key = '__todos__'
      this.__init()
   }

   __init() {
      let isInited = wx.getStorageSync('__todos_inited__')
      if (isInited) return

      this.todos = this.todos.concat([new Todo({
         title: '欢迎使用TodoList',
         completed: false,
         createdAt: new Date()
      }), new Todo({
         title: '点击勾选框或向右滑完成任务',
         completed: false,
         createdAt: new Date()
      }), new Todo({
         title: '点击进入详情可进行编辑',
         completed: false,
         createdAt: new Date()
      }), new Todo({
         title: '点击右边日期可修改日期',
         completed: false,
         createdAt: new Date()
      }), new Todo({
         title: '点击下面的 + 新建一项任务吧',
         completed: false,
         createdAt: new Date()
      }), new Todo({
         title: '长按或左滑可删除任务',
         completed: false,
         createdAt: new Date()
      }), new Todo({
         title: '这是一条已完成的任务',
         completed: true,
         date: new Date('2017/11/18'),
         createdAt: new Date(),
         completedAt: new Date('2017/11/18')
      })])
      this.save()
      wx.setStorageSync('__todos_inited__', true)
   }

   getTodos() {
      return this.todos
   }

   getTodo(uuid) {
      return this.todos.find((item) => item.uuid === uuid)
   }

   getTodoByIndex(index) {
     return this.todos[index]
   }

   getIndex(todo) {
      return this.todos.indexOf(todo)
   }

   getUncompletedTodos() {
      return this.todos.filter(item => !item.completed)
   }

   getCompletedTodos() {
      return this.todos.filter(item => item.completed)
   }

   getTodayCompletedTodos() {
      let todos = this.getCompletedTodos()
      let date = util.formatTime(new Date())
      return todos.filter(item => item.completedAt === date)
   }

   setTodos(todos) {
      this.todos = todos
   }

   clearTodos() {
      this.todos = []
   }

   editTodo(uuid, newTodo) {
     let todo = this.getTodo(uuid)
     if (todo) Object.assign(todo, newTodo)
   }

   addTodo(todo) {
      this.todos.push(todo)
   }

   removeTodo(uuid) {
      let todo = this.getTodo(uuid)
      let index = this.getIndex(todo)
      if (index < 0) return false
      return this.removeTodoByIndex(index)
   }

   removeTodoByIndex(index) {
      this.todos.splice(index, 1)
      return true
   }

   //获取日期统计数据
   getStatisticsByDate() {
      let result = []
      let todos = this.getCompletedTodos()
      let temp = {}
      todos.forEach((item) => {
         temp[item.completedAt] = temp[item.completedAt] ? temp[item.completedAt] + 1 : 1
      })
      for (let key in temp) {
         result.push({
            completedAt: key,
            count: temp[key]
         })
      }
      result = result.sort((a, b) => (a.completedAt > b.completedAt))
      return result
   }

   read() {
      let todos = wx.getStorageSync(this.key) || []
      this.todos = todos
   }

   save() {
      wx.setStorageSync(this.key, this.todos)
   }
}

export default new TodoStore()