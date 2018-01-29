const app = getApp()

Page({

   data: {},

   onLoad: function(options) {
      setTimeout(() => {
         this.openPage()
      }, 1500)
   },

   //跳转
   openPage(replace) {
      let options = {url: '../todo/index'}
      wx.switchTab(options)
   }
})
