const util = require('../../utils/util.js')
var app = getApp()
Page({
  mood(e) {
    var mood = e.currentTarget.dataset.mood
    //测试
    // wx.reLaunch({
    //   url: '/pages/main/main?',
    // })
    //正式
    var date = new Date()
    //需要在这里向后端传入总体心情
    wx.request({
      url: app.globalData.url + '/mixOperate',
      data: {
        uid: wx.getStorageSync('uid'),
        date: util.formatYearDate(date)[0],
        dateMood: mood
      },
      header: {
        'content-type': 'application/json'
      },
      success() {
        wx.reLaunch({
          url: '/pages/main/main',
        })
      }
    })
  },

  cancel() {
    wx.reLaunch({
      url: '/pages/main/main',
    })
  }
})