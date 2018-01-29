import Store from './Store'
import Note from '../models/Note'

/**
 * NoteStore 类
 */
class NoteStore extends Store {

   constructor() {
      super()
      this.notes = []
      this.key = '__notes__'
      this.__init()
   }

   //初始化
   __init() {
      let isInited = wx.getStorageSync('__notes_inited__')
      if(isInited) return

      this.notes = this.notes.concat([new Note({
         title: '欢迎使用TodoList笔记功能',
         content: 'TodoList笔记,随时随地记录您的思考和见闻,赶快使用吧!'
      }), new Note({
         title: '如何新建笔记?',
         content: '点击下方 + 按钮,输入标题和内容后点击保存就可以新建一个笔记了'
      }), new Note({
         title: '如何编辑笔记?',
         content: '点击笔记卡片即可进入编辑页面编辑您的笔记'
      }) ])

      this.save()
      wx.setStorageSync('__notes_inited__', true)
   }

   getNotes() {
      return this.notes
   }

   getNote(uuid) {
      return this.notes.find((item) => item.uuid === uuid)
   }

   getNoteByIndex(index) {
      return this.notes[index]
   }

   getIndex(note) {
      return this.notes.indexOf(note)
   }

   setNotes(notes) {
      this.notes = notes
   }

   addNote(note) {
      this.notes.push(note)
   }

   editNote(uuid, newNote) {
      let note = this.getNote(uuid)
      if (note) Object.assign(note, newNote)
   }

   removeNote(uuid) {
      let note = this.getNote(uuid)
      let index = this.getIndex(note)
      if (index < 0) return false
      return this.removeNoteByIndex(index)
   }

   removeNoteByIndex(index) {
      this.notes.splice(index, 1)
      return ture
   }

   read() {
      let notes = wx.getStorageSync(this.key) || []
      this.notes = notes
   }

   save() {
      wx.setStorageSync(this.key, this.notes)
   }
}

export default new NoteStore()