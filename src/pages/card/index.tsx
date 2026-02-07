import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useState } from 'react'

import { UsersAPI, type UserVo } from '@/api'
import { BasicCard, CompanyInfo, OperationBar } from '@/components'

definePageConfig({
  navigationBarTitleText: '查看名片',
  enableShareAppMessage: true
})

export default function Index() {
  const [userDetail, setUserDetail] = useState<UserVo>({})

  Taro.useLoad(async () => {
    await fetchUserInfo()
  })

  async function fetchUserInfo() {
    const userId = Taro.getCurrentInstance().router?.params.id
    Taro.showLoading({ title: '加载中...' })
    try {
      const { data } = await UsersAPI.getAllInfo(userId!)
      setUserDetail(data)
    } catch {
      setUserDetail({})
    }
    Taro.hideLoading()
  }

  return (
    <View className="p-2">
      <BasicCard
        data={userDetail}
        editable={false}
        starable
        recordable
      />
      <OperationBar data={userDetail} />
      <CompanyInfo data={userDetail} />
    </View>
  )
}
