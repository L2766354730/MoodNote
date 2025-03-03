const util = require('../../utils/util.js')
var app = getApp()
Page({

  data: {
    mid: app.globalData.mid,
    fid: null,
    fdate: null,
    rdate: null,
    fcontext: null,
    rcontext: null,
    texts: "",
    min: 5, //最少字数
    max: 500, //最多字数 
    rcurrentWordNumber: 0,
    fcurrentWordNumber: 0
  },

  onLoad(e) {
    this.setData({
      fid: e.fid,
      fdate: e.date,
      rdate: util.formatYearDate(new Date())
    })

    this.feedbackInit()
  },

  feedbackInit() {
    //测试内容
    // this.setData({
    //   fcontext: "7777777777777777777777777",
    //   fcurrentWordNumber: "7777777777777777777777777".length
    // })


    var that = this
    //传fid到后台，获取详细内容
    wx.request({
      //获取反馈详细内容
      url: app.globalData.url + '/getFeedBackContext',
      data: {
        fid: that.data.fid
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        console.log(res.data)
        var fcontext = res.data.context
        //将传回来的值赋给当前页面变量
        that.setData({
          fcontext: fcontext,
          fcurrentWordNumber: fcontext.length
        })
      }
    })
  },

  input(e) {
    // 获取输入框的内容
    var value = e.detail.value;
    // 获取输入框内容的长度
    var len = parseInt(value.length);
    //最少字数限制
    if (len < this.data.min) {
      this.setData({
        texts: "加油，至少要输入5个字哦"
      })
    } else if (len >= this.data.min) {
      this.setData({
        texts: " "
      })
      if(this.data.rcurrentWordNumber == 500){
        wx.showModal({
          title: '提示',
          content: '您输入的字数已达上限',
        })
      }
    }
    //最多字数限制
    if (len > this.data.max) return;
    // 当输入框内容的长度大于最大长度限制（max)时，终止setData()的执行
    this.setData({
      rcurrentWordNumber: len, //当前字数  
      rcontext: value
    });
  },

  back() {
    var that = this
    //如果rcontext为空
    if (!that.data.rcontext) {
      wx.navigateBack({
        delta: 0,
      })
    } else {
      //提示是否发送
      wx.showModal({
        title: '是否发送？',
        content: '你要发送这条回执吗？',
        success: function (res) {
          if (res.confirm) { //这里是点击了确定以后
            console.log('用户点击确定')
            that.send()
          } else { //这里是点击了取消以后
            console.log('用户点击取消')
            wx.navigateBack({
              delta: 0,
            })
          }
        }
      })
    }
  },


  //发送反馈回执
  send(){
    var that = this
    //最少字数限制
    if (this.data.rcurrentWordNumber < this.data.min) {
      wx.showToast({
        title: '最少写五个字哦！',
        icon: 'none',
        duration: 2000 //持续的时间
      })
    } else {
      //测试
      // console.log(that.data.rcontext)
      // wx.navigateBack({
      //   delta: 0,
      // })
      //正式
      wx.request({
        //像后端提交反馈回执
        url: app.globalData.url + '/mupdateFeedBack',
        data: {
          mid: that.data.mid,
          fid: that.data.fid,
          rdate: that.data.rdate[0],
          rcontext: that.data.rcontext,
        },
        header: {
          'content-type': 'application/json'
        },
        success() {
          //提交成功
          wx.navigateBack({
            delta: 0,
          })
        }
      })
    }
  },

  //提交
  submit() {
    this.send()
  }
})