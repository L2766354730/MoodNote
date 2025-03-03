const util = require('../../utils/util.js')
var app = getApp()
Page({

  data: {
    fid: null,
    fdate: null,
    rdate: null,
    fcontext: null,
    rcontext: null,
    rcurrentWordNumber: 0,
    fcurrentWordNumber: 0
  },

  onLoad(e) {
    this.setData({
      fid: e.fid,
      fdate: e.date
    })

    this.feedbackRespondInit()
  },

  feedbackRespondInit() {
    //测试内容
    // this.setData({
    //   fcontext: "7777777777777777777777777",
    //   fcurrentWordNumber: "7777777777777777777777777".length,
    //   rcontext: "7777777777777777777777777",
    //   rdate: util.formatYearDate(new Date()),
    //   rcurrentWordNumber: "7777777777777777777777777".length
    // })


    var that = this
    //传fid到后台，获取详细内容
    wx.request({
      //获取反馈加回执详细内容
      url: app.globalData.url + '/rshowFeedBack',
      data: {
        fid: that.data.fid
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        console.log(res.data)
        //将传回来的值赋给当前页面变量
        var fcontext=res.data.context
        var rcontext=res.data.rcontext
        var rdate=res.data.rdate
        that.setData({
          fcontext: fcontext,
          fcurrentWordNumber: fcontext.length,
          rcontext: rcontext,
          rdate: rdate,
          rcurrentWordNumber: rcontext.length
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