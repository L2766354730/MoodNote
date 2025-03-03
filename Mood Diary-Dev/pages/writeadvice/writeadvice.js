const util = require('../../utils/util.js')
var app = getApp()
Page({

  data: {
    mid: app.globalData.mid,
    date: null,
    context: null,
    texts: "",
    min: 5, //最少字数
    max: 500, //最多字数 
    currentWordNumber: 0,
  },

  onLoad() {
    this.setData({
      date: util.formatYearDate(new Date())
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
    }
    //最多字数限制
    if (len > this.data.max) return;
    // 当输入框内容的长度大于最大长度限制（max)时，终止setData()的执行
    this.setData({
      currentWordNumber: len, //当前字数  
      context: value
    });
    if(this.data.rcurrentWordNumber == 500){
      wx.showModal({
        title: '提示',
        content: '您输入的字数已达上限',
      })
    }
  },

  back() {
    var that = this
    //如果context为空
    if (!that.data.context) {
      wx.navigateBack({
        delta: 0,
      })
    } else {
      //提示是否发送
      wx.showModal({
        title: '是否发送？',
        content: '你要发送这条通知吗？',
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


  //发送通知
  send(){
    var that = this
    //最少字数限制
    if (this.data.currentWordNumber < this.data.min) {
      wx.showToast({
        title: '最少写五个字哦！',
        icon: 'none',
        duration: 2000 //持续的时间
      })
    } else {
      //测试
      // console.log(that.data.context)
      // wx.navigateBack({
      //   delta: 0,
      // })
      //正式
      wx.request({
        //像后端提交官方通知
        url: app.globalData.url + '/addAdvice',
        data: {
          mid: that.data.mid,
          date: that.data.date[0],
          context: that.data.context,
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