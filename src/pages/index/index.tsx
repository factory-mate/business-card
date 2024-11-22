import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useRef, useState } from 'react'
import { AtButton } from 'taro-ui'

import { AuthAPI, UsersAPI, type UserVo } from '@/api'
import { BasicCard, CompanyInfo } from '@/components'
import { appConfig } from '@/config'

definePageConfig({
  navigationBarTitleText: '首页',
  enableShareAppMessage: true
})

export default function Index() {
  const [isLogin, setIsLogin] = useState(false)
  const isAddLoading = useRef(false)
  const [userDetail, setUserDetail] = useState<UserVo>({})

  Taro.useShareAppMessage(() => ({
    title: appConfig.name,
    path: `/pages/share/index?id=${Taro.getStorageSync('user').UserId}`
  }))

  Taro.useDidShow(async () => {
    const token = Taro.getStorageSync('token')
    setIsLogin(!!token)
    if (token) {
      await fetchUserInfo()
    }
  })

  async function handleAdd() {
    if (isAddLoading.current) {
      return
    }
    Taro.showLoading({ title: '加载中...' })
    isAddLoading.current = true
    try {
      const { code } = await Taro.login()
      const { data } = await AuthAPI.login({ js_code: code })
      Taro.setStorageSync('token', data.token)
      Taro.setStorageSync('user', data.token_user)
      setIsLogin(true)
      await fetchUserInfo()
    } catch {
      //
    }
    Taro.hideLoading()
    isAddLoading.current = false
  }

  async function fetchUserInfo() {
    const userId = Taro.getStorageSync('user').UserId
    try {
      const { data } = await UsersAPI.getAllInfo(userId)
      setUserDetail(data)
    } catch {
      setUserDetail({})
    }
  }

  if (!isLogin) {
    return (
      <View className="flex h-screen flex-col items-center justify-center space-y-8">
        <View>创建名片需要您的授权</View>
        <AtButton
          type="primary"
          onClick={() => handleAdd()}
        >
          授权并创建名片
        </AtButton>
      </View>
    )
  }

  return (
    <View className="p-2">
      <BasicCard
        data={userDetail}
        editable
      />

      <AtButton
        className="!mt-2"
        type="primary"
        openType="share"
      >
        分享我的名片
      </AtButton>

      <CompanyInfo data={userDetail} />
    </View>
  )
}
