// pages/note/create.js
import Note from '../../models/Note'
import noteStore from '../../store/noteStore'
Page({

  data: {
    edit: false,
    note: new Note()
  },

  onLoad: function (options) {
    //是否编辑
    if (options.uuid) {
      this.data.edit = true
      let editNote = noteStore.getNote(options.uuid)
      this.data.note = new Note(editNote)
    } else {
      this.data.note = new Note()
    }
    this.update()
  },

  onShareAppMessage: function () {},

  handleTitleChange(e) {
    this.data.note.title = e.detail.value
    this.update()
  },

  handleContentChange(e) {
    this.data.note.content = e.detail.value
    this.update()
  },

  handleCancelTap(e) {
    wx.navigateBack()
  },

  handleSaveTap(e) {
    if(this.data.edit) {
      noteStore.editNote(this.data.note.uuid, this.data.note)
    } else {
      noteStore.addNote(this.data.note)
    }
    noteStore.save()
    wx.navigateBack()
    wx.showToast({title: '保存成功'})
  },

  update(data) {
    data = data || this.data
    this.setData(data)
  }
})