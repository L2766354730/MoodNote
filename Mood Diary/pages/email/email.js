var app = getApp()
Page({

  back() {
    wx.navigateBack({
      delta: 0,
    })
  },


  feedbackRespond() {
    wx.navigateTo({
      url: '/pages/resandadv/resandadv?title=反馈回执',
    })
  },

  advice() {
    wx.navigateTo({
      url: '/pages/resandadv/resandadv?title=官方通知',
    })
  },

})