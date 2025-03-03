var app = getApp()
Page({
  logout(){
    wx.setStorageSync('nickName', null)
    wx.setStorageSync('avatarUrl', null)
    wx.setStorageSync('mid', null)
    app.globalData.nickName = null
    app.globalData.avatarUrl = null
    app.globalData.mid = null
    wx.reLaunch({
      url: '/pages/feedback/feedback',
    })
  }
})