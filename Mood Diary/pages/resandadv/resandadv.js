var app = getApp()
Page({
  data: {
    title: null,
    isHave: false,
    emailList: null
  },

  back() {
    wx.navigateBack({
      delta: 0,
    })
  },

  onLoad(e) {
    //测试
    // console.log(e)
    // this.setData({
    //   emailList:[{isRead:true,context:'123',date:'12345',eid:1},{isRead:false,context:'12323',date:'1223345',eid:2}]
    // })
    // console.log(this.data.emailList)
    //正式
    var title = e.title
    if(title=='官方通知'){
      this.adviceInit()
    }else{
      this.feedbackRespondInit()
    }
    if (this.data.emailList) {
        this.setData({
          title: title,
          isHave: true
        })
    } else {
      this.setData({
        title: title,
        isHave: false
      })
    }
  },

  onShow() {
    //测试
    // console.log(this.data.emailList)
    //正式
    var title = this.data.title
    if(title=='官方通知'){
      this.adviceInit()
    }else{
      this.feedbackRespondInit()
    }
  },

  
  //官方通知初始化
  adviceInit() {
    var that = this
    wx.request({
      url: app.globalData.url + '/ushowAdviceList',
      data: {
        uid: app.globalData.uid
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        //用户有信息
        var emaillist = res.data.adviceList;
        if (emaillist) {
          //创建一个微信小程序端储存emaillist的值的变量
          var emaillists = new Array();
          //创建构造函数email
          function Email(isRead, context, date, eid) {
            this.isRead = isRead;
            this.context = context;
            this.date = date;
            this.eid = eid;
          }
          //遍历后端传来的值，将其加到email中
          for (var i = 0; i < emaillist.length; i++) {
            var email = new Email(emaillist[i].isRead, emaillist[i].context+'...', emaillist[i].date, emaillist[i].aid)
            emaillists[i] = email
          }
          that.setData({
            emailList: emaillists,
            isHave:true
          })
        }
      }
    })
  },

  //反馈回执初始化
  feedbackRespondInit() {
    var that = this
    wx.request({
      url: app.globalData.url + '/showFeedBackList',
      data: {
        uid: app.globalData.uid
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        //用户有信息
        var emaillist = res.data.feedbackList;
        if (emaillist) {
          //创建一个微信小程序端储存emaillist的值的变量
          var emaillists = new Array();
          //创建构造函数email
          function Email(isRead, context, date, eid) {
            this.isRead = isRead;
            this.context = context;
            this.date = date;
            this.eid = eid;
          }
          //遍历后端传来的值，将其加到email中
          for (var i = 0; i < emaillist.length; i++) {
            var email = new Email(emaillist[i].isRead, emaillist[i].rcontext+'...', emaillist[i].rdate, emaillist[i].fid)
            emaillists[i] = email
          }
          that.setData({
            emailList: emaillists,
            isHave:true
          })
        }
      }
    })
  },


  context(e) {
    var eid = e.currentTarget.dataset.eid
    var date = e.currentTarget.dataset.date
    if (this.data.title == '反馈回执') {
      //向下一个页面传入的信息id
      wx.navigateTo({
        url: '/pages/seefeedbackRespond/seefeedbackRespond?fid=' + eid + '&date=' + date,
      })
    } else if (this.data.title == '官方通知') {
      //向下一个页面传入的信息id
      wx.navigateTo({
        url: '/pages/seeadvice/seeadvice?aid=' + eid + '&date=' + date,
      })
    }
  }
})