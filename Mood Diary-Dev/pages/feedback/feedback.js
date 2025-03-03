var app = getApp()
Page({
  data: {
    userInfo: false,
    nickName: null,
    avatarUrl: null,
    mid: null,
    feedbackList: null,
    isHave: false,
    password: null
  },

  onShow() {
    //判断此前是否授权登录（正式）
    if (app.globalData.mid || wx.getStorageSync('mid')) {
      this.setData({
        userInfo: true,
        mid: wx.getStorageSync('mid'),
        nickName: wx.getStorageSync('nickName'),
        avatarUrl: wx.getStorageSync('avatarUrl')
      })
      this.feedbackInit()
    }
    //测试
    // if (wx.getStorageSync('nickName')) {
    //   console.log(wx.getStorageSync('nickName'))
    //   this.setData({
    //     userInfo: true,
    //     nickName: wx.getStorageSync('nickName'),
    //     avatarUrl: wx.getStorageSync('avatarUrl')
    //   })
    // }

  },

  password(e) {
    var password = e.detail.value
    this.setData({
      password: password
    })
  },

  login() {
    var that = this
    wx.getUserProfile({
      desc: '必须授权才可以继续使用',
      success: e => {
        wx.login({
          success(res) {
            if (res.code) {
              console.log(that.data.password)
              //请求获取mid
              wx.request({
                url: app.globalData.url + '/mlogin',
                data: {
                  code: res.code,
                  password: that.data.password
                },
                header: {
                  'content-type': 'application/json'
                },
                success(res) {
                  if (res.data) {
                    console.log(res)
                    //设置进入缓存mid
                    wx.setStorageSync('mid', res.data.mid)
                    //设置进入全局变量mid
                    app.globalData.mid = res.data.mid
                    //设置进入全局变量
                    app.globalData.nickName = e.userInfo.nickName
                    app.globalData.avatarUrl = e.userInfo.avatarUrl
                    //设置进入缓存
                    wx.setStorageSync('nickName', e.userInfo.nickName)
                    wx.setStorageSync('avatarUrl', e.userInfo.avatarUrl)
                    wx.setStorageSync('mid', res.data.mid)
                    console.log(res.data.mid)
                    that.setData({
                      userInfo: true,
                      nickName: app.globalData.nickName,
                      avatarUrl: app.globalData.avatarUrl,
                      mid: res.data.mid
                    })
                    that.feedbackInit()
                  } else {
                    console.log('密码错误' + res.errMsg)
                    wx.showToast({
                      title: '密码错误！',
                      icon: 'none',
                      duration: 2000 //持续的时间
                    })
                  }

                },
                fail() {
                  console.log('密码错误' + res.errMsg)
                  wx.showToast({
                    title: '密码错误！',
                    icon: 'none',
                    duration: 2000 //持续的时间
                  })
                }
              })
            } else {
              console.log('登录失败！' + res.errMsg)
              wx.showToast({
                title: '登录失败！',
                icon: 'none',
                duration: 2000 //持续的时间
              })
            }
          },
          fail() {
            console.log('登录失败！' + res.errMsg)
            wx.showToast({
              title: '登录失败！',
              icon: 'none',
              duration: 2000 //持续的时间
            })
          }
        })
        //测试
        // //设置进入全局变量
        // app.globalData.nickName = res.userInfo.nickName
        // app.globalData.avatarUrl = res.userInfo.avatarUrl
        // //设置进入缓存
        // wx.setStorageSync('nickName', res.userInfo.nickName)
        // wx.setStorageSync('avatarUrl', res.userInfo.avatarUrl)
        // that.setData({
        //   userInfo: true,
        //   nickName: app.globalData.nickName,
        //   avatarUrl: app.globalData.avatarUrl
        // })
      },
      fail: res => {
        console.log('授权失败', res)
        wx.showToast({
          title: '授权失败',
          icon: 'none',
          duration: 2000 //持续的时间
        })
      }
    })
  },

  writefeedrespond(e) {
    let fid = e.currentTarget.dataset.fid
    let date = e.currentTarget.dataset.date
    wx.navigateTo({
      url: '/pages/writefeedback/writefeedback?fid=' + fid + '&date=' + date,
    })
  },

  responded() {
    wx.navigateTo({
      url: '/pages/responded/responded',
    })
  },

  feedbackInit() {
    //测试
    // this.setData({
    //   feedbackList: [{
    //     fid: 1,
    //     date: "2012年10月",
    //     content: "我爱你中国"
    //   }, {
    //     fid: 2,
    //     date: "2012年10月",
    //     content: "我爱你中国"
    //   }],
    //   isHave: true
    // })
    var that = this
    console.log(that.data.mid)
    wx.request({
      //获取反馈列表(未回复)
      url: app.globalData.url + '/feedList',
      data: {
        mid: that.data.mid
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        console.log(res.data)
        var feedbacklist = res.data.feedbackList;
        if (feedbacklist) {
          //创建一个微信小程序端储存feedbacklist的值的变量
          var feedbacklists = new Array();
          //创建构造函数feedback
          function Feedback(fid, date, content) {
            this.fid = fid;
            this.date = date;
            this.content = content;
          }
          //遍历后端传来的值，将其加到feedback中
          for (var i = 0; i < feedbacklist.length; i++) {
            var feedback = new Feedback(feedbacklist[i].fid, feedbacklist[i].date, feedbacklist[i].context+'...')
            feedbacklists[i] = feedback
          }
          that.setData({
            feedbackList: feedbacklists,
            isHave: true
          })
        }
        else{
          that.setData({
            feedbackList: null,
            isHave: false
          })
        }
      }
    })
  },

  logout() {
    wx.navigateTo({
      url: '/pages/logout/logout',
    })
  }
})