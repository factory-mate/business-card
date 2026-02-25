import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useState, type PropsWithChildren } from 'react'
import { AtButton } from 'taro-ui'
import { AuthAPI } from '@/api'

interface AuthorizationAreaProps extends PropsWithChildren {
  onAuthSuccess?: () => void
}

export default function AuthorizationArea(props: AuthorizationAreaProps) {
  const { children, onAuthSuccess } = props

  const [isLogin, setIsLogin] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  Taro.useDidShow(async () => {
    const token = Taro.getStorageSync('token')
    setIsLogin?.(!!token)
    if (token) {
      onAuthSuccess?.()
    }
  })

  async function handleAdd() {
    if (isSubmitting) {
      return
    }
    Taro.showLoading({ title: '加载中...' })
    setIsSubmitting(true)
    try {
      const { code } = await Taro.login()
      const { data } = await AuthAPI.login({ js_code: code })
      Taro.setStorageSync('token', data.token)
      Taro.setStorageSync('user', data.token_user)
    } catch {
      //
    }
    onAuthSuccess?.()
    setIsLogin(true)
    setIsSubmitting(false)
    Taro.hideLoading()
  }

  function handleViewCard() {
    Taro.navigateTo({ url: '/pages/card/index?id=56826d9b-4e59-4a77-b8bc-81a1c4e90e30' })
  }

  if (!isLogin) {
    return (
      <View className="flex h-screen flex-col items-center justify-center space-y-4">
        <View>创建名片需要您的授权</View>
        <AtButton onClick={handleViewCard}>查看名片示例</AtButton>
        <AtButton
          type="primary"
          loading={isSubmitting}
          disabled={isSubmitting}
          onClick={() => handleAdd()}
        >
          授权并创建名片
        </AtButton>
      </View>
    )
  }

  return <>{children}</>
}
