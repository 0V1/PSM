var util = require('../../utils/util.js');
//获取应用实例
var app = getApp();
Page({
  data: {
    reminder: "还没有需要管理的密码，添加一个吧！",
    keyChains: [],
    hasObject:true
  },
  onLoad: function (options) {
    console.info("main.onLoad");
    wx.removeStorageSync("keyChains_");
    var index = options.index;
    var search = options.search;

    var keyChains_ = wx.getStorageSync("keyChains");
    //根据类型跳转过来
    if(index){
      var navItems = wx.getStorageSync('navItems');
      var type_name = navItems[index].name;
    
      if ('全部' === type_name) {}
      else{
        for (var key in keyChains_) {
          if (type_name !== keyChains_[key].type) {
            delete keyChains_[key];
          }
        }
      }
      //更新数据
      wx.setStorageSync("keyChains_", keyChains_);
      this.setData({
        keyChains: wx.getStorageSync("keyChains_"),
        hasObject: util.isEmptyObject(keyChains_)
      })
    }
    //根据搜索条件跳转过来
    if(search){
      console.info(search);
      var keyChains_search = {};
      for (var key in keyChains_) {
        var object2str = keyChains_[key].type + "" + keyChains_[key].description + "" + keyChains_[key].account + "" + keyChains_[key].password;
        
        if (util.contains(object2str, search)){
          keyChains_search[key] = keyChains_[key];
        }
      }
      //更新数据
      wx.setStorageSync("keyChains_", keyChains_search);
      this.setData({
        keyChains: wx.getStorageSync("keyChains_"),
        hasObject: util.isEmptyObject(keyChains_search)
      })
    }
  },
  /**
  * 生命周期函数--监听页面显示
  */
  onShow: function () {
    console.info("main.onShow");
    //更新数据
    this.setData({
      "keyChains": wx.getStorageSync("keyChains_")
    })
  },
  /**
   * 维护数据
   */
  onUpdate: function (e) {
    var id = e.currentTarget.id;

    wx.navigateTo({
      url: '../update/update?id=' + id
    })
  },
  /**
   * 删除事件
   */
  onDelete: function (e) {
    var that = this;
    var id = e.currentTarget.id;
    var keyChains_ = this.data.keyChains;
    wx.showModal({
      title: '确认提示',
      content: '确认删除当前项？',
      confirmText: '删除',
      confirmColor: '#FF3030',
      success: function (res) {
        if (res.confirm) {
          delete keyChains_[id];
          wx.setStorageSync('keyChains', keyChains_);
          that.setData({
            keyChains: wx.getStorageSync("keyChains")
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  /**
   * 复制账户事件
   */
  copy_account: function (evnent) {
    var keyChains = this.data.keyChains;
    console.info(keyChains[evnent.currentTarget.id].account);
    wx.setClipboardData({
      data: keyChains[evnent.currentTarget.id].account,
      success: function () {
        wx.showToast({
          title: '已复制账号到剪贴板',
          icon: 'success',
          duration: 700
        })
      }
    })
  },
  /**
   * 复制密码事件
   */
  copy_password: function (evnent) {
    var keyChains = this.data.keyChains;
    console.info(keyChains[evnent.currentTarget.id].password);
    wx.setClipboardData({
      data: keyChains[evnent.currentTarget.id].password,
      success: function () {
        wx.showToast({
          title: '已复制密码账号到剪贴板',
          icon: 'success',
          duration: 700
        })
      }
    })
  },
  //【生成密码】事件处理函数
  autoCreate: function () {
    wx.navigateTo({
      url: '../autoCreate/autoCreate'
    })
  },
})