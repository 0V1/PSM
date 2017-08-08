// index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidden_import: true,
    hidden_export: true,
    content_import: '',
    content_export: ''
  },
  /**
   * 取消
   */
  cancel: function () {
    this.setData({
      hidden_import: true,
      hidden_export: true
    });
  },
  /**
   * 导入
   */
  confirm: function () {
    wx.setStorageSync('keyChains', this.data.content_import)
    this.setData({
      content_import: '',
      hidden_import: true
    });
    wx.showToast({
      title: "导入成功",
      icon: "success",
      duration: 1500
    });
  },
  /**
   * 拷贝
   */
  copy: function () {
    this.setData({
      hidden_export: true
    });
    wx.setClipboardData({
      data: JSON.stringify(wx.getStorageSync("keyChains")),
      success: function () {
        wx.showToast({
          title: '已复制到剪贴板',
          icon: 'success',
          duration: 700
        })
      }
    })
  },
  setImport: function (e) {
    this.data.content_import = e.detail.value;    
  },
  /**
   * 【操作说明】
   */
  operation: function () {
    wx.navigateTo({
      url: 'operation/index'
    })
  },
  /**
   * 【清空缓存】
   */
  clear: function () {
    wx.clearStorageSync();
    wx.showToast({
      title: "清空成功",
      icon: "success",
      duration: 1500
    });
  },
  /**
   * 【导出】
   */
  exportALL: function () {
    var keyChains = wx.getStorageSync("keyChains");
    if (keyChains){
      this.setData({
        hidden_export: false,
        content_export: JSON.stringify(keyChains)
      })
    }else{
      wx.showToast({
        title: '没有可导出的密码。',
      })
    }
  },
  /**
   * 【导入】
   */
  importALL: function () {
    this.setData({
      hidden_import: false
    })
  },
  /**
   * 【关于】
   */
  about: function () {
    wx.navigateTo({
      url: 'about/index'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})