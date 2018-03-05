
const app = getApp()

Page({
  data: {
    airShips:[]
  },
  onLoad: function () {

  },
  /**
  * 进入建造飞船页面
  */
  launchShip: function () {
    wx.navigateTo({
      url: '/pages/build/build'
    })
  },
  /**
  * 进入航行日志页面
  */
  visitLog: function () {
    wx.navigateTo({
      url: '/pages/visit_log/visit_log'
    })
  },
  /**
* 进入航行日志页面
*/
  launch: function () {
    wx.navigateTo({
      url: '/pages/launch/launch'
    })
  },
})
