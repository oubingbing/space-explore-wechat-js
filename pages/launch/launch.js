const app = getApp();
const qiniuUploader = require("../../utils/qiniuUploader");
const uploader = require("../../utils/uploadImage");

Page({
  data: {
    shipId:null,
    textContent:null,
    uploadToken:null,
    imageArray: [],
    uploadToken: null,
    attachments: [],
  },
  onLoad: function (option) {

    let id = option.id;
    let fromType = option.from_type;
    
    console.log(`飞船Id：${id}`);
    console.log(`飞船来源${fromType}`);

    this.setData({
      shipId:id
    });
  },
  onShow: function () {
    //设置七牛上传token
    app.getUploadToken(token => {
      this.setData({
        uploadToken: token
      });
    });
  },
  /**
   * 分享页面
   */
  onShareAppMessage: function (res) {
    let id = this.data.shipId;

    return {
      title: '“您好，我是一艘人际飞船，请允许在您的星球上着陆”',
      path: `/pages/launch/launch?id=${id}&from_type=2`,
      imageUrl:'http://ozd5l7n8c.bkt.clouddn.com/d4704cae23380313d14ac943bb4ac05f.jpg',
      success: function (res) {
        // 转发成功
        console.log('转发成功')
      },
      fail: function (res) {
        // 转发失败
        console.log('转发失败')
      }
    }
  },
  /**
   * 装载信息
   */
  loadMessage:function(){

    let shipId = this.data.shipId;
    let message = this.data.textContent;
    let attachments = this.data.attachments;
    console.log('信息收集完毕');
    console.log(message);
    console.log(attachments);

    app.http('post', '/load_message/' + shipId, {
      content: message,
      attachments:attachments,
      from_type:1
    }, res => {
      console.log(res);
    });

  },
  /**
  * 获取输入内容
  */
  getTextContent: function (event) {
    let value = event.detail.value;
    this.setData({
      textContent: value
    });
  },
  /**
 * 选择图片并且上传到七牛
 */
  selectImage: function () {

    console.log('select image');
    let _this = this;

    if (_this.data.imageArray.length >= 9){
      return;
    }

    wx.chooseImage({
      count: 9, // 默认9
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {

        let temArray = _this.data.imageArray;
        let temUrlArray = _this.data.attachments;

        console.log(res.tempFilePaths);

        var filePaths = res.tempFilePaths;

        let position = res.tempFilePaths.length - 1;

        wx.showLoading({
          title: '加载中',
        })

        filePaths.map((item, index) => {
          temArray.push(item);

          uploader.upload(item, key => {
            console.log(index);
            console.log(position);
            if (position == index) {
              wx.hideLoading();
            }

            let temAttachments = _this.data.attachments;

            if (key != '' || key != null) {
              temAttachments.push(key);
              _this.setData({
                attachments: temAttachments
              });
            }

            console.log(key);
          })

        });

        _this.setData({
          imageArray: temArray
        });

      }
    })

  },
})
