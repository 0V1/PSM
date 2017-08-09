//app.js
App({
  onLaunch: function() {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    //初始化分类列表
    var navItems = wx.getStorageSync('navItems') || this.init_navItems;
    wx.setStorageSync('navItems', navItems);
  },

  getUserInfo: function(cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.getUserInfo({
        withCredentials: false,
        success: function(res) {
          that.globalData.userInfo = res.userInfo
          typeof cb == "function" && cb(that.globalData.userInfo)
        }
      })
    }
  },
  globalData: {
    userInfo: null
  },
  //分类列表
  init_navItems: [
    {
      id: 0,
      name: '全部'
    },
    {
      id: 999,
      name: '添加'
    }
  ],
  /**
   * 获取分类列表
   */
  getNavItems: function () {
    var navItems = wx.getStorageSync('navItems') || this.init_navItems;
    return navItems;
  },
  /**
   * 获取分类列表
   */
  getKeyChains: function () {
    var keyChains = wx.getStorageSync("keyChains")||{};
    return keyChains;
  },
})
