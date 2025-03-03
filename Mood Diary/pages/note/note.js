const util = require('../../utils/util.js')
var app = getApp()
Page({
  data: {
    nid: null,
    mood: null,
    time: null,
    uid: app.globalData.uid,
    currentWordNumber: 0,
    context: '',
    save: '',
    isSave: false,
    success: null,
    daymood: false
  },

  onLoad(e) {
    let date = new Date()
    //需要判断是否为从修改心情来的页面,但是本身页面进入时isSave就是false，所以在下面对是否是第一次进入修改笔记页面做判断

    //需要做三个条件的判断：添加，添加的修改心情，修改
    if (e.nid) {
      //nid不为空，页面为修改笔记内容页面
      if (e.flag == 1) {
        //需要对是第一次进入修改笔记页面，还是修改心情后进入修改笔记页面进行判断,目的是为了mood图片的渲染正确，以及对当前页面笔记是否保存做判断
        this.setData({
          mood: e.mood,
          isSave: true //是第一次
        })
      } else {
        //从修改心情页面进入的，需要将isSave变为false
        this.setData({
          mood: '/images/' + e.mood + '.png',
          isSave: false
        })
      }
      var that = this
      wx.request({
        //向后端请求获取完整内容
        url: app.globalData.url + '/selectNoteByNid',
        data: {
          nid: e.nid
        },
        header: {
          'content-type': 'application/json'
        },
        success(res) {
          //save表示，这是后端已保存的内容
          var save = res.data.context
          if (e.flag == 1) {
            var context = res.data.context
          }else{
            var context = e.context
          }
          var nid = e.nid
          var time = e.time
          var currentWordNumber = context.length
          that.setData({
            save: save,
            context: context,
            nid: nid,
            time: time,
            currentWordNumber: currentWordNumber
          })
        }
      })
      //测试：即正式直接删掉这段代码
      // var save = '122'
      // var context = '122'
      // var currentWordNumber = context.length
      // this.setData({
      //   save: save,
      //   time: e.time,
      //   nid: e.nid,
      //   context: context,
      //   currentWordNumber: currentWordNumber,
      // })
    } else if (e.time) {
      //nid为空，但时间不为空，页面为添加的修改心情后跳转到的页面
      //一定是从修改心情来的,一定是未保存状态，无需做变化
      var context = e.context
      var currentWordNumber = context.length
      this.setData({
        mood: '/images/' + e.mood + '.png',
        time: e.time,
        context: context,
        currentWordNumber: currentWordNumber,
      })
    } else {
      //页面为初次点击添加页面
      this.setData({
        mood: '/images/' + e.mood + '.png',
        time: util.formatDate(date) + ' ' + util.formatTime(date),
      })
    }
  },

  changemood() {
    //这里分为种情况：添加的修改心情，修改的修改心情。
    if (!this.data.nid) {
      //添加笔记页面的修改心情，不传nid
      var context = this.data.context
      var time = this.data.time
      wx.navigateTo({
        url: '/pages/notemood/notemood?context=' + context + '&time=' + time
      })
    } else if (this.data.nid) {
      //修改心情页面的进行修改心情
      var context = this.data.context
      var time = this.data.time
      var nid = this.data.nid
      wx.navigateTo({
        url: '/pages/notemood/notemood?nid=' + nid + '&context=' + context + '&time=' + time
      })
    }
    //不存在其他情况了
    else {
      wx.showToast({
        title: '出现错误！',
        icon: 'none',
        duration: 2000 //持续的时间
      })
    }
  },

  // savenote() {
  //   var that = this
  //   var a = that.data.mood.split("/")
  //   var b = a[2].split(".")
  //   var mood = b[0]
  //   //笔记内容不为空，要保存，分为两种情况，一是有nid，即修改笔记，二是没有nid，即添加笔记
  //   if (that.data.nid) {
  //     //nid有值，即为修改
  //     wx.request({
  //       url: app.globalData.url + '/updateNoteByNid',
  //       data: {
  //         context: that.data.context,
  //         mood: mood,
  //         nid: that.data.nid
  //       },
  //       header: {
  //         'content-type': 'application/json'
  //       },
  //       success() {
  //         console.log(true)
  //         that.setData({
  //           success: true
  //         })
  //       },
  //       fail() {
  //         console.log(false)
  //         that.setData({
  //           success: false
  //         })
  //       }
  //     })
  //   } else {
  //     var date = new Date()
  //     //没有nid，即为添加笔记
  //     //需要判断该日是否有总体心情
  //     that.isdaymood()
  //     if (that.data.daymood) {
  //       //如果有总体心情，什么都不做
  //     } else {
  //       //没有总体心情，将笔记心情存为总体心情
  //       this.setdaymood()
  //     }

  //     wx.request({
  //       url: app.globalData.url + '/insertNote',
  //       data: {
  //         uid: app.globalData.uid,
  //         date: util.formatYearDate(date),
  //         ntime: time,
  //         ncontext: that.data.context,
  //         mood: mood
  //       },
  //       header: {
  //         'content-type': 'application/json'
  //       },
  //       success(res) {
  //         //将当前页面内容标记为已保存,并将保存后的nid传给当前页面的nid，即如今的页面变为修改笔记的页面
  //         that.setData({
  //           success: true,
  //           nid: res.data.nid
  //         })
  //       },
  //       fail() {
  //         that.setData({
  //           success: false
  //         })
  //       }
  //     })
  //   }

  // },


  back() {
    var that = this
    //判断内容是否被改过
    let save = that.data.save
    let context = that.data.context
    if (save != context) {
      that.setData({
        isSave: false
      })
    }
    //如果当前页面内容已被保存,就直接跳转到主页
    if (that.data.isSave) {
      wx.redirectTo({
        url: '/pages/main/main',
      })
    } else {
      //保存

      //提示是否保存
      wx.showModal({
        title: '是否保存？',
        content: '你要保存这条笔记吗？',
        success: function (res) {
          if (res.confirm) { //这里是点击了确定以后
            //如果context为空，则提示用户写点笔记吧！
            if (!that.data.context) {
              wx.showToast({
                title: '写点笔记再保存吧！',
                icon: 'none',
                duration: 2000 //持续的时间
              })
            }
            //笔记内容不为空
            else {
              //如果要保存，分为两种情况，一是有nid，即修改笔记，二是没有nid，即添加笔记
              var a = that.data.mood.split("/")
              var b = a[2].split(".")
              var mood = b[0]
              
              var date = new Date()
              if (that.data.nid) {
                //nid有值，即为修改
                wx.request({
                  url: app.globalData.url + '/updateNoteByNid',
                  data: {
                    context: that.data.context,
                    mood: mood,
                    nid: that.data.nid
                  },
                  header: {
                    'content-type': 'application/json'
                  },
                  success() {
                    wx.redirectTo({
                      url: '/pages/main/main',
                    })
                  }
                })
              } else {
                var time = that.data.time
                time = time.split(" ")[1]
                //没有nid，即为添加笔记
                wx.request({
                  url: app.globalData.url + '/insertNote',
                  data: {
                    uid: app.globalData.uid,
                    date: util.formatYearDate(date)[0],
                    ntime: time,
                    ncontext: that.data.context,
                    mood: mood
                  },
                  header: {
                    'content-type': 'application/json'
                  },
                  success() {
                    wx.redirectTo({
                      url: '/pages/main/main',
                    })
                  }
                })
              }

            }
          } else { //这里是点击了取消以后
            wx.reLaunch({
              url: '/pages/main/main',
            })
          }
        }
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
    this.setData({
      currentWordNumber: len //当前字数  
    });
  },

  clear() {
    this.setData({
      currentWordNumber: 0,
      context: ''
    })
  },

  save() {
    var a = this.data.mood.split("/")
    var b = a[2].split(".")
    var mood = b[0]
    //如果context为空，则提示用户写点笔记吧！
    if (!this.data.context) {
      wx.showToast({
        title: '写点笔记再保存吧！',
        icon: 'none',
        duration: 2000 //持续的时间
      })
    } else {
      var that = this
      var date = new Date()
      //context不为空，保存
      //判断内容是否被改过
      let save = that.data.save
      let context = that.data.context
      if (save != context) {
        that.setData({
          isSave: false
        })
      }
      if (this.data.isSave) {
        //当前笔记已保存，则不做任何操作
        wx.showToast({
          title: '当前页面内容已保存，请勿重复点击',
          icon: 'none',
          duration: 2000 //持续的时间
        })
      } else {
        //笔记内容不为空，要保存，分为两种情况，一是有nid，即修改笔记，二是没有nid，即添加笔记
        if (that.data.nid) {
          //nid有值，即为修改
          wx.request({
            url: app.globalData.url + '/updateNoteByNid',
            data: {
              context: that.data.context,
              mood: mood,
              nid: that.data.nid
            },
            header: {
              'content-type': 'application/json'
            },
            success() {
              //将当前修改后的页面内容标记为已保存
              that.setData({
                isSave: true,
                save: that.data.context
              })
              wx.showToast({
                title: '已保存',
                icon: 'none',
                duration: 2000 //持续的时间
              })
            },
            fail() {
              wx.showToast({
                title: '保存失败！',
                icon: 'none',
                duration: 2000 //持续的时间
              })
            }
          })
        } else {
          //没有nid，即为添加笔记
          var time = that.data.time
          time = time.split(" ")[1]
          wx.request({
            url: app.globalData.url + '/insertNote',
            data: {
              uid: app.globalData.uid,
              date: util.formatYearDate(date)[0],
              ntime: time,
              ncontext: that.data.context,
              mood: mood
            },
            header: {
              'content-type': 'application/json'
            },
            success(res) {
              //将当前页面内容标记为已保存,并将保存后的nid传给当前页面的nid，即如今的页面变为修改笔记的页面
              that.setData({
                isSave: true,
                save: that.data.context,
                nid: res.data.nid
              })
              wx.showToast({
                title: '已保存',
                icon: 'none',
                duration: 2000 //持续的时间
              })
            },
            fail() {
              wx.showToast({
                title: '保存失败！',
                icon: 'none',
                duration: 2000 //持续的时间
              })
            }
          })
        }
      }
    }

  }
})