// add.js
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //所属类型
    index: 0,
    type_name: '',
    //所有类型
    navItems: [],
    //加密字符 值和items的check匹配
    encryption: [],
    //密码长度
    ps_len: 8,
    //是否生成密码
    hasCreate: false,
    //是否设置有效期
    hasTime: false,
    date: '',
    valid_time: '',
    //账号描述
    description: '',
    //账号
    account: '',
    //密码
    password: '',
    //加密选项组
    items: [
      {
        name: '小写字母',
        value: ['abcdefghijklmnopqrstuvwxyz'],
        checked: 'true'
      },
      {
        name: '大写字母',
        value: ['ABCDEFGHIJKLMNOPQRSTUVWXYZ']
      },
      {
        name: '纯数字',
        value: '0123456789',
        checked: 'true'
      },
      {
        name: '特殊符',
        value: '!@#$%'
      },
    ]
  },
  /**
   * 初始化页面
   */
  init_page: function () {
    this.setData({
      index: 0,
      type_name: '',
      description: '',
      account: '',
      password: '',
      encryption: ['abcdefghijklmnopqrstuvwxyz', '0123456789'],
      ps_len: 8,
      hasCreate: false,
      hasTime: false,
      date: '',
      valid_time: ''
    });
  },
  /**
   * 保存数据事件
   */
  formSubmit: function (event) {
    var id = (new Date().getTime());
    var keyChains = wx.getStorageSync('keyChains') || {};
    keyChains[id] = {
      type: this.data.type_name,
      description: event.detail.value.description,
      account: event.detail.value.account,
      password: event.detail.value.password,
      create_time: util.formatTime(new Date()),
      update_time: util.formatTime(new Date()),
      valid_time: this.data.valid_time,
      state: 1
    };
    console.log(keyChains)
    wx.setStorageSync('keyChains', keyChains);

    wx.showToast({
      title: "保存成功",
      icon: "success",
      duration: 1500

    });
    //刷新页面
    this.init_page();
    //返回首页
    // setTimeout(function () {
    //     wx.switchTab({
    //       url: '../main/main',
    //     })
    // }, 1500);
  },

  /**
   * 页面重置
   */
  formReset: function (options) {
    console.log('formReset');
    //刷新页面
    this.init_page();
  },
  /**
   * 设置分类
   */
  bindTypeChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var index = e.detail.value;
    var navItems = wx.getStorageSync('navItems');

    this.setData({
      index: e.detail.value,
      type_name: navItems[index].name
    })
  },
  //设置有效期
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)

    this.setData({
      valid_time: e.detail.value,
    })
  },
  /**
   * checkbox事件
   */
  checkboxChange: function (e) {

    console.log('checkbox发生change事件，携带value值为：', e.detail.value);

    this.data.encryption = e.detail.value;

    this.createPassword();
  },
  /**
   * 生成密码
   */
  switchChange: function (e) {
    var hasCreate = e.detail.value;
    console.log('switch 发生 change 事件，携带值为', hasCreate)
    this.setData({
      hasCreate: hasCreate
    });

    if (!hasCreate) {
      this.setData({
        password: ''
      });
    } else {
      this.createPassword();
    }
  },
  /**
   * 重新生成密码
   */
  onRefresh: function () {
    this.createPassword();
  },
  /**
   * 有效期限
   */
  switchChange2: function (e) {
    var hasTime = e.detail.value;
    console.log('switch2 发生 change 事件，携带值为', hasTime)

    if (hasTime) {
      this.setData({
        hasTime: hasTime,
        date: util.formatTime2(new Date()),
        valid_time: this.data.date
      });
    } else {
      this.setData({
        hasTime: hasTime,
        date: '',
        valid_time: ''
      });
    }
  },
  /**
   * 创建新密码
   */
  createPassword: function () {
    //重置密码
    this.data.password = '';
    //组合密码
    var str = this.data.encryption.join("");
    var j;
    for (var i = 0; i < this.data.ps_len; i++) {
      j = Math.floor(Math.random() * str.length);
      this.data.password += str.charAt(j);
    }
    //更新密码
    this.setData({
      password: this.data.password
    });
  },
  //set值
  setDescription: function (e) {
    this.data.description = e.detail.value;
  },
  setAccount: function (e) {
    this.data.account = e.detail.value;
  },
  setPassword: function (e) {
    this.data.password = e.detail.value;
  },
  setEncryption: function (e) {
    this.data.encryption = e.detail.value;
  },
  setPs_len: function (e) {
    this.data.ps_len = e.detail.value
    console.info(this.data.ps_len)
    this.createPassword();
  },
  //清除值
  clearDescription: function () {
    this.setData({
      description: ''
    });
  },
  clearAccount: function () {
    this.setData({
      account: ''
    });
  },
  clearPassword: function () {
    this.setData({
      password: ''
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var navItems = wx.getStorageSync('navItems');
    navItems.splice(navItems.length - 1, 1);
    var keyChains = wx.getStorageSync('keyChains') || {};
    var keyChain = keyChains[options.id];
    
    this.init_page();
    for (var i = 0; i < navItems.length; i++) {
      if(navItems[i].name == keyChain.type){
        this.setData({
          'index':i,
        })
      }
    }

    this.setData({
      'id': options.id,
      'navItems': navItems,
      'description': keyChain.description,
      'account': keyChain.account,
      'password': keyChain.password,
      'date': keyChain.valid_time
    })
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
    console.info("onShow");
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