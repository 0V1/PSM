// pages/main/index.js
var wxlocker = require("../../utils/wxlocker.js");
//获取应用实例
var app = getApp();
Page({
  data:{
     title:'请设置手势密码',
     resetHidden:false,
     titleColor:""
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数

    wxlocker.lock.init();
    this.initState();
  },
  onReady:function(){
    
  },
  onShow:function(){
    
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },

  onUnload:function(){
    // 页面关闭

  },
  //设置提示语与重置按钮
  initState:function(){
    var resetHidden = wxlocker.lock.resetHidden;
    var title = wxlocker.lock.title;
    var titleColor = wxlocker.lock.titleColor;
    this.setData({
      resetHidden:resetHidden,
      title:title,
      titleColor:titleColor
    });
  },
  /**
   * 手势开始触发
   * 一次
   */
  touchS:function(e){//touchstart事件绑定
    // console.info('S');
    wxlocker.lock.bindtouchstart(e);
  },
  /**
   * 手势移动触发
   * 多次
   */
  touchM:function(e){//touchmove事件绑定
    // console.info('M');
    wxlocker.lock.bindtouchmove(e);
  },
  /**
   * 手势结束触发
   * 一次
   */
  touchE:function(e){//touchend事件绑定
    // console.info('E');
    wxlocker.lock.bindtouchend(e,this.lockSucc);
    this.initState();
  },
  lockSucc:function(){//解锁成功的回调函数
    console.log("解锁成功！");
    //do something
    wx.switchTab({
      url: "/pages/main/index"
    })
  },
  /**
   * 重置
   */
  lockreset:function(){
    var that = this;
    wx.showModal({
      title: '确认重置',
      content: '重置后所有数据初始化，不可恢复，请慎重操作。',
      success: function (res) {
        if (res.confirm) {
          //清空缓存
          wx.clearStorageSync();
          //重置手势密码
          wxlocker.lock.updatePassword();
          that.initState();
          //初始化分类列表
          app.initNavItems();
          wx.showToast({
            title: "重置成功",
            icon: "success",
            duration: 1500
          });
        }
      }
    })
  }
})