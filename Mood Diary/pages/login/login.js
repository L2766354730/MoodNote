var app = getApp()

Page({

  onLoad: function () {
    //判断此前是否授权登录（正式）
    if (app.globalData.uid || wx.getStorageSync('uid')) {

      wx.redirectTo({
        url: '/pages/main/main'
      })
    }
    // //测试
    // if (app.globalData.nickName) {
    //   wx.redirectTo({
    //     url: '/pages/main/main'
    //   })
    // }
  },

  login() {

    wx.getUserProfile({
      desc: '必须授权才可以继续使用',
      success: e => {
        wx.login({
          success(res) {
            if (res.code) {
              //请求获取uid
              wx.request({
                url: app.globalData.url + '/login',
                data: {
                  code: res.code
                },
                header: {
                  'content-type': 'application/json'
                },
                success(res) {
                  //设置进入缓存uid
                  wx.setStorageSync('uid', res.data.uid)
                  //设置进入全局变量uid
                  app.globalData.uid = res.data.uid
                  //设置进入全局变量
                  app.globalData.nickName = e.userInfo.nickName
                  app.globalData.avatarUrl = e.userInfo.avatarUrl
                  //设置进入缓存
                  wx.setStorageSync('nickName', e.userInfo.nickName)
                  wx.setStorageSync('avatarUrl', e.userInfo.avatarUrl)
                  wx.redirectTo({
                    url: '/pages/main/main'
                  })
                }
              })
            } else {
              wx.showToast({
                title: '登录失败！',
                icon: 'none',
                duration: 2000 //持续的时间
              })
            }
          }
        })

      },
      fail: res => {
        wx.showToast({
          title: '授权失败',
          icon: 'none',
          duration: 2000 //持续的时间
        })
      }
    })
  }
})