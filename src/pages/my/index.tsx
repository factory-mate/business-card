import { AuthorizationArea } from '@/components'
import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useState } from 'react'
import { AtList, AtListItem } from 'taro-ui'

definePageConfig({
  navigationBarTitleText: '我的',
  enableShareAppMessage: false
})

export default function Index() {
  const [version, setVersion] = useState('')

  Taro.useLoad(() => {
    if (Taro.getAccountInfoSync().miniProgram.version) {
      setVersion(`v${Taro.getAccountInfoSync().miniProgram.version!}`)
    } else {
      setVersion('v0.0.1')
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
    <AuthorizationArea onAuthSuccess={() => {}}>
      <AtList>
        <AtListItem
          title="隐私政策"
          arrow="right"
          onClick={() => navToPrivacyPolicy()}
        />
        <AtListItem
          title="退出登录"
          onClick={() => logout()}
        />
      </AtList>
      <View className="absolute bottom-0 w-full text-center text-sm">
        <Text>当前版本：{version}</Text>
      </View>
    </AuthorizationArea>
  )
}
