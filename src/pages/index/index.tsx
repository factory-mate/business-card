import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useState } from 'react'
import { AtButton } from 'taro-ui'

import { UsersAPI, type UserVo } from '@/api'
import { AuthorizationArea, BasicCard, CompanyInfo } from '@/components'
import { appConfig } from '@/config'

definePageConfig({
  navigationBarTitleText: '首页',
  enableShareAppMessage: true
})

export default function Index() {
  const [userDetail, setUserDetail] = useState<UserVo>({})

  Taro.useShareAppMessage(() => ({
    title: appConfig.name,
    path: `/pages/card/index?id=${Taro.getStorageSync('user').UserId}`
  }))

  async function fetchUserInfo() {
    Taro.showLoading({ title: '加载中...' })
    const userId = Taro.getStorageSync('user').UserId
    try {
      const { data } = await UsersAPI.getAllInfo(userId)
      setUserDetail(data)
    } catch {
      setUserDetail({})
    }
    Taro.hideLoading()
  }

  return (
    <AuthorizationArea onAuthSuccess={() => fetchUserInfo()}>
      <View className="p-2">
        <BasicCard
          data={userDetail}
          editable
          starable={false}
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
    </AuthorizationArea>
  )
}
