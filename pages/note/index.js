// pages/note/index.js
import Note from '../../models/Note'
import noteStore from '../../store/noteStore'

Page({

  data: {
    //notes
    notes: [],

    //动画延迟
    delay: true
  },

  onShow: function () {
    this.syncData()
  },

  onShareAppMessage: function () {},

  syncData() {
    this.data.notes = noteStore.getNotes()
    this.update()
    //动画结束后取消动画队列延迟
    setTimeout(() => {
      this.update({delay: false})
    },2000)
  },

  update(data) {
    data = data || this.data
    this.setData(data)
  },

  handleNoteClick(e) {
    //TODO
    wx.showToast({ title: '点击事件' })
  },

  handleNoteLongclick(e) {
    console.log(e)
  },

  handleNoteTouchEnd() {
    //TODO
    wx.showToast({ title: '点击结束事件' })
  },

  handleAddNote() {
    wx.navigateTo({
      url: '../note/create'
    })
  }
})