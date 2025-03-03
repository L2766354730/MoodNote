var app = getApp()
Page({

  onShow() {
    this.respondedInit()
  },

  back() {
    wx.navigateBack({
      delta: 0,
    })
  },

  see(e) {
    let fid = e.currentTarget.dataset.fid
    let date = e.currentTarget.dataset.date
    wx.navigateTo({
      url: '/pages/seerespondation/seerespondation?fid=' + fid + '&date=' + date,
    })
  },

  respondedInit() {
    // 测试
    // this.setData({
    //   respondedList: [{
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
    wx.request({
      //获取responded列表（已回复）
      url: app.globalData.url + '/respondedList',
      data: {
        mid: wx.getStorageSync('mid')
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        console.log(res.data)
        var respondedlist = res.data.respondedList;
        if (respondedlist) {
          //创建一个微信小程序端储存respondedlist的值的变量
          var respondedlists = new Array();
          //创建构造函数responded
          function Responded(fid, date, content) {
            this.fid = fid;
            this.date = date;
            this.content = content;
          }
          //遍历后端传来的值，将其加到responded中
          for (var i = 0; i < respondedlist.length; i++) {
            var responded = new Responded(respondedlist[i].fid, respondedlist[i].date, respondedlist[i].context+'...')
            respondedlists[i] = responded
          }
          that.setData({
            respondedList: respondedlists,
            isHave: true
          })
        }
      }
    })
  }

})