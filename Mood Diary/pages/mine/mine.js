const util = require('../../utils/util.js')
var app = getApp()
Page({

  data: {
    avatarUrl: app.globalData.avatarUrl,
    nickName: app.globalData.nickName,
    daymood: null,
  },

  onLoad() {
    this.daymoodinit()
  },

  daymoodinit() {
    var that = this
    var date = util.formatYearDate(new Date())[0]
    wx.request({
      //获取某日的总体心情
      url: app.globalData.url + '/gDateMood',
      data: {
        uid: wx.getStorageSync('uid'),
        date: date
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {

        if (res.data.daymood) {
          if (date == util.formatYearDate(new Date())) {
            that.setData({
              daymood: '今日心情：' + res.data.daymood
            })
          } else {
            that.setData({
              daymood: '该日心情：' + res.data.daymood
            })
          }
        } else {
          if (date == util.formatYearDate(new Date())) {
            that.setData({
              daymood: '今日还未选心情'
            })

          } else {
            that.setData({
              daymood: '该日未记录心情'
            })
          }
        }
      }
    })
  },


  feedback() {
    wx.navigateTo({
      url: '/pages/feedback/feedback',
    })

  },

  email() {
    wx.navigateTo({
      url: '/pages/email/email',
    })
  },

  // 退出登录
  loginOut() {
    wx.showModal({
      title: '退出登录',
      content: '确认退出？',
      success(res) {
        if (res.confirm) {
          wx.setStorageSync('nickName', null)
          wx.setStorageSync('avatarUrl', null)
          wx.setStorageSync('uid', null)
          wx.setStorageSync('feedbackcontext', null)
          app.globalData.nickName = null
          app.globalData.avatarUrl = null
          app.globalData.uid = null
          wx.reLaunch({
            url: '/pages/login/login',
          })
        }
      }
    })

  },
  // 分享
  onShareAppMessage: function () {
    var title = '心情每日记录';
    var cover_img = '/images/阳光.png';
    return {
      title: title,
      path: '/pages/login/login',
      imageUrl: cover_img,
      success: function (res) {}
    }
  },
})