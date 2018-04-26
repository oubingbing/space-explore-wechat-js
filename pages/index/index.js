
const app = getApp()

Page({
  data: {
    tipHeader: '想知道你的人际关系能达到一个什么样的深度吗',
    tipFooter: '发射一艘人际飞船来探测一下吧',
    spaceShips:[]
  },
  onLoad: function () {
    this.getSpaceShip();
  },
  /**
   * 获取飞船列表
   */
  getSpaceShip:function(){

    console.log('获取飞船');
    
    let _this = this;

    app.http('get', '/space_ships', {}, res => {

      console.log(res.data.data.page_data);

      let ships = res.data.data.page_data;
      let localShips = _this.data.spaceShips;

      ships.map(item => {
        localShips.push(item);
      });

      _this.setData({
        spaceShips: localShips
      });

    });
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
  * 发射飞船
  */
  launch: function (event) {

    console.log(event);

    let shipId = event.target.dataset.ship;

    wx.navigateTo({
      url: `/pages/launch/launch?id=${shipId}&from_type=1`
    })
  },
})
