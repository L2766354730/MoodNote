// app.js
App({
  onLaunch() {
    this.globalData.uid = wx.getStorageSync('uid')
    this.globalData.nickName = wx.getStorageSync('nickName')
    this.globalData.avatarUrl = wx.getStorageSync('avatarUrl')
    

  },
  globalData: {
    url:'http://localhost:8080',
    userInfo: {
      uid:null,
      nickName:null,
      avatarUrl:null
    }
  },

})
