
const app = getApp();

Page({

  data: {
    spaceName:null,
    matherPlant:null
  },
  onLoad: function () {

  },
  /**
   * 新建飞船 
   */
  create:function(){

    let spaceName = this.data.spaceName;
    let matherPlant = this.data.matherPlant;

    console.log('create space');
    console.log("飞船：" + spaceName);
    console.log("母星：" + matherPlant);

    if (spaceName == null){
      wx.showLoading({
        title: '我需要一个名字',
      })
      setTimeout(res => {
        wx.hideLoading();
      }, 1500);
      return;
    }

    if (matherPlant == null){
      wx.showLoading({
        title: '母星，请告诉我的您的名字',
      })
      setTimeout(res => {
        wx.hideLoading();
      }, 1500);
      return;
    }

    app.http('post', '/create_space', {
      space_name: spaceName,
      plant_name: matherPlant
    }, res => {
      console.log(res);
    });

  },
  /**
   * 获取飞船的名字
   */
  getSpaceName: function (event){
    let value = event.detail.value;
    this.setData({
      spaceName: value
    });
  },
  /**
   * 获取母星的名字
   */
  getMotherPlant: function (event){
    let value = event.detail.value;
    this.setData({
      matherPlant: value
    });
  }
})