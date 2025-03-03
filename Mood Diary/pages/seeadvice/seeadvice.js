const util = require('../../utils/util.js')
var app = getApp()
Page({

  data: {
    aid: null,
    date: null,
    context: null,
    currentWordNumber: 0
  },

  onLoad(e) {
    this.setData({
      aid: e.aid,
      date: e.date
    })
    this.adviceInit()
  },

  adviceInit() {
    //测试内容
    // this.setData({
    //   context: "7777777777777777777777777",
    //   currentWordNumber: "7777777777777777777777777".length
    // })


    var that = this
    //传aid到后台，获取详细内容
    wx.request({
      //获取通知详细内容
      url: app.globalData.url + '/showOneAdvice',
      data: {
        
        aid: that.data.aid
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        //将传回来的值赋给当前页面变量
        that.setData({
          context: res.data.context,
          currentWordNumber: res.data.context.length
        })
      }
    })
  },

  back() {
    wx.navigateBack({
      delta: 0,
    })
  }
})