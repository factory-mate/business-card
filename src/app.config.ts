export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/edit/index',
    'pages/card-list/index',
    'pages/my/index',
    'pages/card/index',
    'pages/privacy-policy/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    list: [
      {
        pagePath: 'pages/index/index',
        text: '我的名片',
        iconPath: 'assets/tabbar/my-card.png',
        selectedIconPath: 'assets/tabbar/my-card.png'
      },
      {
        pagePath: 'pages/card-list/index',
        text: '名片夹',
        iconPath: 'assets/tabbar/card-list.png',
        selectedIconPath: 'assets/tabbar/card-list.png'
      },
      {
        pagePath: 'pages/my/index',
        text: '我的',
        iconPath: 'assets/tabbar/my.png',
        selectedIconPath: 'assets/tabbar/my.png'
      }
    ],
    selectedColor: '#0078d7'
  }
})
