Page({
  data: {
    time: null,
    context: '',
    nid: null,
    isChange:true
  },

  onLoad(e) {
    //这里分为三种情况：添加笔记前的选择心情，添加笔记时的修改心情，修改笔记时的修改心情
    if (e.nid) {
      //nid有值,修改笔记时的修改心情，即四个值全都有,用nid来代替
      var nid = e.nid
      var context = e.context
      var time = e.time
      this.setData({
        nid: nid,
        context: context,
        time: time,
      })
    } else if (e.time) {
      //笔记有时间，即添加笔记时的修改心情
      var context = e.context
      var time = e.time
      this.setData({
        context: context,
        time: time,
      })
    } else {
      //添加笔记前的选择心情
      //什么都不做
    }
  },

  mood(e) {
    //这里分为三种情况：添加笔记前的选择心情，添加笔记时的修改心情，修改笔记时的修改心情
    var mood = e.currentTarget.dataset.mood
    var that = this
    if(this.data.nid){
      //nid有值,修改笔记时的修改心情，即四个值全都有,用nid来代替
      wx.reLaunch({
        url: '/pages/note/note?mood=' + mood + '&nid=' + that.data.nid + '&context=' + that.data.context + '&time=' + that.data.time + '&isChange=' + that.data.isChange
      })
    } else if(this.data.time){
      //笔记有时间，即添加笔记时的修改心情
      wx.reLaunch({
        url: '/pages/note/note?mood=' + mood + '&context=' + that.data.context + '&time=' + that.data.time + '&isChange=' + that.data.isChange
      })
    } else{
      //添加笔记前的选择心情
      wx.reLaunch({
        url: '/pages/note/note?mood=' + mood
      })
    }
  },

  cancel() {
    wx.navigateBack({
      delta: 0,
    })
  }
})