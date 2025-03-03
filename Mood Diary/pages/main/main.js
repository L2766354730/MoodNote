const util = require('../../utils/util.js')
var app = getApp()
Page({

  data: {
    avatarUrl: "/images/头像.png",
    nickName: '未登录',
    date: null,
    daymood: '今日还未选心情',
    moodList: new Array(),
    noteList: new Array(),
    noteisHave: false,
    year: 0,
    month: 0,
    head: ['日', '一', '二', '三', '四', '五', '六'],
    dateArr: [],
    isToday: 0,
    pickToday: 0,
    isTodayWeek: false,
    todayIndex: 0,
    nottoday: false,
    havenote:'今日还未写笔记哦！'
  },

  onShow() {
    let date = new Date();
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    console.log(0)
    this.dateInit();
    this.setData({
      year: year,
      month: month,
      isToday: '' + year + '-' + month + '-' + now.getDate(),
      avatarUrl: app.globalData.avatarUrl,
      nickName: app.globalData.nickName,
      date: util.formatDate(date)
    })
    console.log(3)
    this.daymoodinit(util.formatYearDate(now)[0]);
    console.log(5)
    this.noteinit(util.formatYearDate(now)[0]);
  },

  noteinit(date) {
    var that = this
    //请求获取笔记列表
    wx.request({
      url: app.globalData.url + '/getNoteList',
      data: {
        uid: wx.getStorageSync('uid'),
        date: date
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        console.log(6)
        //获取后端传入的笔记列表
        var notelist = res.data.noteList
        //如果笔记列表不为空
        if (notelist) {
          //创建微信小程序存储数组值的变量
          var noteList = new Array();
          //创建构造函数note
          function Note(nid, context, time, mood) {
            this.nid = nid;
            this.context = context;
            this.time = time;
            this.mood = mood;
          }
          //遍历后端传来的值，将其加到我的数据中
          for (var i = 0; i < notelist.length; i++) {
            //对心情处理
            notelist[i].mood = '/images/' + notelist[i].mood + '.png';
            //赋值
            var note = new Note(notelist[i].nid, notelist[i].context+'...', notelist[i].time, notelist[i].mood)
            noteList[i] = note
          }
          //设置值
          that.setData({
            //笔记列表
            noteList: noteList,
            noteisHave: true
          })
        }
      }
    })
  },

  daymoodinit(date) {
    var that = this
    wx.request({
      //获取某日的总体心情
      url: app.globalData.url + '/gDateMood',
      data: {
        uid: wx.getStorageSync('uid'),
        date: date
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        console.log(4)
        if (res.data.daymood) {
          if (date == util.formatYearDate(new Date())) {
            that.setData({
              daymood: '今日心情：' + res.data.daymood
            })
          } else {
            that.setData({
              daymood: '该日心情：' + res.data.daymood
            })
          }
        } else {
          if (date == util.formatYearDate(new Date())) {
            that.setData({
              daymood: '今日还未选心情'
            })
            
          } else {
            that.setData({
              daymood: '该日未记录心情'
            })
          }
        }
      }
      //为测试所用,正式直接删掉
      // fail() {
      //   that.setData({
      //     daymood: '今日心情：开心'
      //   })
      // }
    })
  },

  backnow() {
    var date = {
      date: util.formatYearDate(new Date()).toString()
    }
    this.date(date)
    //自动展示为当前月份的日历页面
    this.dateInit()
    this.setData({
      nottoday: false
    })
  },

  date(e) {
    //判断是从组件传的值（即点击日期）还是从函数传的值（即点击回到今日）
    if (e.date) {
      var date = e.date
    } else {
      var date = e.currentTarget.dataset.date
    }

    //转换日期
    var dates = date.split("-")
    var month = dates[1]
    var day = dates[2]
    var thisdate = month + '月' + day + '日'
    if(date == util.formatYearDate(new Date())){
      this.setData({
        noteisHave: false,
        pickToday: date,
        date: thisdate,
        nottoday: false,
        havenote:'今日还未写笔记哦！'
      })
    }else{
      this.setData({
        noteisHave: false,
        pickToday: date,
        date: thisdate,
        nottoday: true,
        havenote:'该日还未写笔记哦！'
      })
    }
    
    //修改页面总体心情
    this.daymoodinit(date)
    //向后端请求日期下的笔记列表
    this.noteinit(date)
  },

  add() {
    wx.navigateTo({
      url: '/pages/notemood/notemood'
    })
  },

  daymood() {
    wx.showModal({
      title: '只能修改今日总体心情',
      content: '确认要修改吗？',
      success(res) {
        if (res.confirm) {
          wx.navigateTo({
            url: '/pages/daymood/daymood'
          })
        }
      }
    })
  },

  mine() {
    wx.navigateTo({
      url: '/pages/mine/mine',
    })
  },

  changenote(e) {
    //需向后端传入标识，表示是第一次进入修改笔记页面，目的为保证渲染层的正确
    var note = e.currentTarget.dataset.note
    var nid = note.nid
    var time = note.time
    var mood = note.mood
    wx.redirectTo({
      url: '/pages/note/note?mood=' + mood + '&nid=' + nid + '&time=' + time + '&flag=1',
    })
  },

  dateInit: function (setYear, setMonth) {
    //全部时间的月份都是按0~11基准，显示月份才+1
    let dateArr = []; //需要遍历的日历数组数据
    let arrLen = 0; //dateArr的数组长度
    let now = setYear ? new Date(setYear, setMonth) : new Date();
    let year = setYear || now.getFullYear();
    let nextYear = 0;
    let month = setMonth || now.getMonth(); //没有+1方便后面计算当月总天数
    let nextMonth = (month + 1) > 11 ? 1 : (month + 1);
    let startWeek = new Date(year + ',' + (month + 1) + ',' + 1).getDay(); //目标月1号对应的星期
    let dayNums = new Date(year, nextMonth, 0).getDate(); //获取目标月有多少天
    let obj = {};
    let num = 0;

    if (month + 1 > 11) {
      nextYear = year + 1;
      dayNums = new Date(nextYear, nextMonth, 0).getDate();
    }
    var that = this
    console.log(1)
    //得到当月心情表从后端
    wx.request({
      url: app.globalData.url + '/selectAllMood',
      data: {
        uid: wx.getStorageSync('uid'),
        year: year,
        month: month + 1
      },
      header: {
        'content-type': 'application/json'
      },

      success(res) {
        console.log(2)
        if (!res.data) {
          wx.showToast({
            title: '日期超出可用范围咯！',
            icon: 'none',
            duration: 2000 //持续的时间
          })
        } else {
          that.setData({
            moodList: res.data.moodList,
            year: year,
            month: month + 1
          })
          arrLen = startWeek + dayNums;
          for (let i = 0; i < arrLen; i++) {
            if (i >= startWeek) {
              num = i - startWeek + 1;
              obj = {
                isToday: '' + year + '-' + (month + 1) + '-' + num,
                dateNum: num,
                weight: 5,
                mood: '/images/' + that.data.moodList[num - 1] + '色.png'
              }
            } else {
              obj = {};
            }
            dateArr[i] = obj;
          }
          that.setData({
            dateArr: dateArr
          })

          let nowDate = new Date();
          let nowYear = nowDate.getFullYear();
          let nowMonth = nowDate.getMonth() + 1;
          let nowWeek = nowDate.getDay();
          let getYear = setYear || nowYear;
          let getMonth = setMonth >= 0 ? (setMonth + 1) : nowMonth;

          if (nowYear == getYear && nowMonth == getMonth) {
            that.setData({
              isTodayWeek: true,
              todayIndex: nowWeek
            })
          } else {
            that.setData({
              isTodayWeek: false,
              todayIndex: -1
            })
          }
        }
      }
      //为测试所用，正式直接删掉
      // fail() {
      //   arrLen = startWeek + dayNums;
      //   for (let i = 0; i < arrLen; i++) {
      //     if (i >= startWeek) {
      //       num = i - startWeek + 1;
      //       obj = {
      //         isToday: '' + year + '-' + (month + 1) + '-' + num,
      //         dateNum: num,
      //         weight: 5,
      //         mood: '/images/' + that.data.moodList[num - 1] + '色.png'
      //       }
      //     } else {
      //       obj = {};
      //     }
      //     dateArr[i] = obj;
      //   }
      //   that.setData({
      //     dateArr: dateArr
      //   })

      //   let nowDate = new Date();
      //   let nowYear = nowDate.getFullYear();
      //   let nowMonth = nowDate.getMonth() + 1;
      //   let nowWeek = nowDate.getDay();
      //   let getYear = setYear || nowYear;
      //   let getMonth = setMonth >= 0 ? (setMonth + 1) : nowMonth;

      //   if (nowYear == getYear && nowMonth == getMonth) {
      //     that.setData({
      //       isTodayWeek: true,
      //       todayIndex: nowWeek
      //     })
      //   } else {
      //     that.setData({
      //       isTodayWeek: false,
      //       todayIndex: -1
      //     })
      //   }
      // }
    })

  },
  lastMonth: function () {
    //全部时间的月份都是按0~11基准，显示月份才+1
    let year = this.data.month - 2 < 0 ? this.data.year - 1 : this.data.year;
    let month = this.data.month - 2 < 0 ? 11 : this.data.month - 2;

    this.dateInit(year, month);
  },
  nextMonth: function () {
    //全部时间的月份都是按0~11基准，显示月份才+1
    let year = this.data.month > 11 ? this.data.year + 1 : this.data.year;
    let month = this.data.month > 11 ? 0 : this.data.month;

    this.dateInit(year, month);
  },

  /**
   * 设置movable-view位移
   */
  setXmove: function (productIndex, xmove) {
    let noteList = this.data.noteList
    noteList[productIndex].xmove = xmove
    this.setData({
      noteList: noteList
    })
  },

  /**
   * 处理movable-view移动事件
   */
  handleMovableChange: function (e) {
    if (e.detail.source === 'friction') {
      if (e.detail.x < -30) {
        this.showDeleteButton(e)
      } else {
        this.hideDeleteButton(e)
      }
    } else if (e.detail.source === 'out-of-bounds' && e.detail.x === 0) {
      this.hideDeleteButton(e)
    }
  },

  /**
   * 显示删除按钮
   */
  showDeleteButton: function (e) {
    let productIndex = e.currentTarget.dataset.productindex
    this.setXmove(productIndex, -65)
  },

  /**
   * 隐藏删除按钮
   */
  hideDeleteButton: function (e) {
    let productIndex = e.currentTarget.dataset.productindex

    this.setXmove(productIndex, 0)
  },

  /**
   * 处理touchstart事件
   */
  handleTouchStart(e) {
    this.startX = e.touches[0].pageX
  },

  /**
   * 处理touchend事件
   */
  handleTouchEnd(e) {
    if (e.changedTouches[0].pageX < this.startX && e.changedTouches[0].pageX - this.startX <= -30) {
      this.showDeleteButton(e)
    } else if (e.changedTouches[0].pageX > this.startX && e.changedTouches[0].pageX - this.startX < 30) {
      this.showDeleteButton(e)
    } else {
      this.hideDeleteButton(e)
    }
  },

  /**
   * 删除产品
   */
  handleDeleteProduct: function ({
    currentTarget: {
      dataset: {
        nid
      }
    }
  }) {

    var that = this
    wx.showModal({
      title: '删除该条笔记',
      content: '确认要删除吗？',
      success(res) {
        if (res.confirm) {
          wx.request({
            //传入nid请求删除
            url: app.globalData.url + '/deleteNote',
            data: {
              nid: nid
            },
            header: {
              'content-type': 'application/json'
            },
            success() {
              let noteList = that.data.noteList
              let productIndex = noteList.findIndex(item => item.nid === nid)
              noteList.splice(productIndex, 1)

              that.setData({
                noteList
              })
              if (noteList[productIndex]) {
                that.setXmove(productIndex, 0)
              }
              if(!that.data.noteList[0]){
                that.setData({
                  noteisHave: false,
                })
              }
              
            },
            fail() {
              wx.showToast({
                title: '删除失败！',
                icon: 'none',
                duration: 2000 //持续的时间
              })
            }
          })
        }
      }
    })
  },
})