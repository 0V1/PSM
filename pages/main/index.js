var util = require('../../utils/util.js');
//获取应用实例
var app = getApp();
Page({
  data: {
    grids: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    //按钮计时
    startTime: '',
    endTime:'',
    //是否显示删除图标
    hiden_cancel: false,
    //开启新增分类
    hidden_Add_Type: true,
    //新增分类名称
    add_Type_Name:'',
    //查询条件
    search_str:"",
    //分类列表
    navItems: [],
  },
  onLoad: function () {
    console.info("main.onLoad");
    //更新数据
    this.setData({
      navItems: wx.getStorageSync('navItems')
    })
  },
  /**
  * 生命周期函数--监听页面显示
  */
  onShow: function () {
    console.info("main.onShow");
    this.setData({
      search_str: '',
      navItems: wx.getStorageSync('navItems')
    })
  },
  /**
   * 点击事件
   */
  onTap: function (e) {
    if (this.data.endTime - this.data.startTime < 350) {
      this.goToList(e);
    }
  },
  /**
   * 开始计时
   */
  startTime: function (e) {
    this.data.startTime = e.timeStamp;
  },
  /**
   * 结束计时
   */
  endTime: function (e) {
    this.data.endTime = e.timeStamp;
  },
  /**
   * 进入列表页
   */
  goToList: function (e) {
    var index = e.currentTarget.id;
    console.info("index" + index);
    var navItems = wx.getStorageSync('navItems');
    console.info(navItems[index]);
    if (index != (navItems.length-1)){
      wx.navigateTo({
        url: '../list/index?index=' + index
      })
    }else{
      this.setData({
        hidden_Add_Type: false
      });
    }
  },
  /**
   * 显示删除图标
   */
  onShowCancel: function (e) {
    console.info(this.data.hiden_cancel);
    this.setData({
      hiden_cancel: true
    })
  },
  /**
   * 增加分类
   */
  onCreate: function () {
    var navItems = wx.getStorageSync('navItems');
    for (var i = 0; i < navItems.length; i++) {
      console.info(this.data.add_Type_Name);
      console.info(navItems[i].name);
      if (this.data.add_Type_Name === navItems[i].name){
        wx.showToast({
          title: '分类【' + this.data.add_Type_Name+'】已存在！',
          mask: true,
          image:'../../images/main/close.png',
        });
        return;
      }
    }

    var item = {
      id: util.generateUUID(),
      name: this.data.add_Type_Name
    }
    navItems.splice(navItems.length - 1, 0, item);
    wx.setStorageSync('navItems', navItems);
    this.setData({
      navItems: navItems,
      hidden_Add_Type: true,
      add_Type_Name: ''
    });
  },
  /**
   * 删除分类
   */
  onDelete: function (e) {
    var that = this;
    var index = e.currentTarget.id;
    var navItems = wx.getStorageSync('navItems');
  
    if (index == (navItems.length - 1) || index==0) return;
    wx.showModal({
      title: '删除分类',
      content: '确认删除【' + navItems[index].name + '】？',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定，将删除此项分类' + navItems[index].name )
          navItems.splice(index,1);
          wx.setStorageSync("navItems", navItems);
        } 
      },
      complete: function () {
        //刷新
        that.onLoad();  
      }
    })
  },

  /**
   * 取消
   */
  onCancel: function () {
    this.setData({
      hidden_Add_Type: true,
      add_Type_Name: ''
    });
  },
  /**
   * 查询事件
   */
  onSearch:function () {
    console.info("onSearch:" + this.data.search_str);
    var search = this.data.search_str;
    if(search){
      console.info("search="+search);
      wx.navigateTo({
        url: '../list/index?search=' + search
      })
    }
  },
  /**
   * set值
   */
  setAddTypeName: function (e) {
    this.data.add_Type_Name = e.detail.value;
  },
  setQueryInput: function (e) {
    this.setData({
      search_str : e.detail.value
    })
  },
  /**
   * 清除值
   */
  cleanQueryInput: function (e) {
    this.setData({
      search_str: ''
    })
  }
})