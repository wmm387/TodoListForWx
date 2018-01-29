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
    wx.navigateTo({
      url: '../note/create?id=' + e.currentTarget.dataset.index,
    })
  },

  handleNoteLongclick(e) {
    let index = e.currentTarget.dataset.index
    wx.showModal({
      title: '删除提示',
      content: '确定要删除此便签吗?',
      success: (e) => {
        if(e.confirm) {
          this.data.notes.splice(index, 1)
          this.update()
        }
      }
    })
  },

  handleAddNote() {
    wx.navigateTo({
      url: '../note/create'
    })
  }
})