const util = require('../../utils/util.js')
var app = getApp()
Page({

  data: {
    uid: app.globalData.uid,
    history: false,
    context: null,
    texts: "",
    min: 5, //最少字数
    max: 150, //最多字数 (根据自己需求改变) 
    currentWordNumber: 0
  },

  onLoad() {
    //从缓存中查看是否有历史未提交内容
    if (wx.getStorageSync('feedbackcontext')) {
      this.setData({
        history: true,
        context: wx.getStorageSync('feedbackcontext'),
        currentWordNumber: wx.getStorageSync('feedbackcontext').length
      })
    }
  },

  input(e) {
    this.setData({
      context: e.detail.value
    })
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
      currentWordNumber: len //当前字数  
    });
    if(this.data.currentWordNumber == 150){
      wx.showModal({
        title: '提示',
        content: '您输入的字数已达上限',
      })
    }
  },

  back() {
    //将反馈内容缓存到本地
    if(this.data.context){
      wx.setStorageSync('feedbackcontext', this.data.context)
    }
    wx.navigateBack({
      delta: 0,
    })
  },


  //提交反馈
  submit(e) {
    var that = this
    let date = new Date()
    //最少字数限制
    if (this.data.currentWordNumber < this.data.min) {
      wx.showToast({
        title: '最少写五个字哦！',
        icon: 'none',
        duration: 2000 //持续的时间
      })
    } else {
      //测试提交成功
      //置缓存中的反馈内容为空
      // wx.setStorageSync('feedbackcontext', null)
      // that.setData({
      //   history: false,
      //   context: null,
      //   currentWordNumber: 0
      // })
      //正式
      wx.request({
        //像后端提交反馈内容
        url: app.globalData.url + '/uaddFeedBack',
        data: {
          uid: that.data.uid,
          date: util.formatYearDate(date) + '',
          context: e.detail.value.feedback,
        },
        header: {
          'content-type': 'application/json'
        },
        success() {
          //提交成功
          //置缓存中的反馈内容为空
          wx.setStorageSync('feedbackcontext', null)
          that.setData({
            history: false,
            context: null,
            currentWordNumber: 0
          })
          wx.showToast({
            title: '提交成功！',
            icon: 'none',
            duration: 2000 //持续的时间
          })
        }

      })
    }
  }
})