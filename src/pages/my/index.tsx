import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useState } from 'react'
import { AtList, AtListItem } from 'taro-ui'

definePageConfig({
  navigationBarTitleText: '我的',
  enableShareAppMessage: true
})

export default function Index() {
  const [isLogin, setIsLogin] = useState(false)
  const [version, setVersion] = useState('')

  Taro.useLoad(() => {
    const token = Taro.getStorageSync('token')
    setIsLogin(!!token)
    if (Taro.getAccountInfoSync().miniProgram.version) {
      setVersion(`v${Taro.getAccountInfoSync().miniProgram.version!}`)
    } else {
      setVersion('测试环境')
    }
  })

  function navToPrivacyPolicy() {
    Taro.navigateTo({ url: '/pages/privacy-policy/index' })
  }

  function logout() {
    Taro.showModal({
      title: '提示',
      content: '确定要退出登录吗？',
      success: (res) => {
        if (res.confirm) {
          Taro.clearStorageSync()
          Taro.switchTab({ url: '/pages/index/index' })
        }
      }
    })
  }

  return (
    <View>
      <AtList>
        <AtListItem
          title="隐私政策"
          arrow="right"
          onClick={() => navToPrivacyPolicy()}
        />
        {isLogin && (
          <AtListItem
            title="退出登录"
            onClick={() => logout()}
          />
        )}
      </AtList>
      <View className="absolute bottom-0 w-full text-center text-sm">
        <Text>当前版本：{version}</Text>
      </View>
    </View>
  )
}
