var app = getApp()
Page({
  data: {
    userInfo: false,
    nickName: null,
    avatarUrl: null,
    mid: null,
    adviceList: null,
    isHave: false,
    password: null
  },

  onShow() {
    //判断此前是否授权登录，使用mid来判断
    if (wx.getStorageSync('mid')) {
      this.setData({
        userInfo: true,
        mid: wx.getStorageSync('mid')
      })
      this.adviceInit()
    }

  },

  password(e) {
    var password = e.detail.value
    this.setData({
      password: password
    })
  },

  see(e) {
    let aid = e.currentTarget.dataset.aid
    let date = e.currentTarget.dataset.date
    wx.navigateTo({
      url: '/pages/seeadvice/seeadvice?aid=' + aid + '&date=' + date,
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
                    that.adviceInit()
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

  adviceInit() {
    //测试
    // this.setData({
    //   adviceList: [{
    //     aid: 1,
    //     date: "2012年10月",
    //     content: "我爱你中国"
    //   }, {
    //     aid: 2,
    //     date: "2012年10月",
    //     content: "我爱你中国"
    //   }],
    //   isHave: true
    // })
    //正式
    var that = this
    wx.request({
      //获取advice列表
      url: app.globalData.url + '/showAdviceList',
      data: {
        mid: that.data.mid
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        var advicelist = res.data.adviceList;
        if (advicelist) {
          //创建一个微信小程序端储存advicelist的值的变量
          var advicelists = new Array();
          //创建构造函数advice
          function Advice(aid, date, content) {
            this.aid = aid;
            this.date = date;
            this.content = content;
          }
          //遍历后端传来的值，将其加到advice中
          for (var i = 0; i < advicelist.length; i++) {
            var advice = new Advice(advicelist[i].aid, advicelist[i].date, advicelist[i].context+'...')
            advicelists[i] = advice
          }
          that.setData({
            adviceList: advicelists,
            isHave: true
          })
        }
      }
    })
  },

  add() {
    wx.navigateTo({
      url: '/pages/writeadvice/writeadvice',
    })
  }


})