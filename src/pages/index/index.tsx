import { View } from '@tarojs/components'
import { useShareAppMessage } from '@tarojs/taro'
import { AtButton } from 'taro-ui'

import { BasicCard, CompanyInfo } from '@/components'
import { appConfig } from '@/config'

definePageConfig({
  navigationBarTitleText: '首页',
  enableShareAppMessage: true
})

export default function Index() {
  useShareAppMessage(() => ({
    title: appConfig.name,
    path: '/pages/share/index'
  }))

  const cardInfo = {
    name: 'Bruce',
    department: 'xxx 部门',
    title: 'xxx 职位',
    company: 'xxx 公司',
    address: 'xxx 地址',
    phone: 'xxx 电话',
    email: 'xxx 邮箱',
    wechat: 'xxx 微信',
    website: 'xxx 网站',
    description: 'xxx 公司描述'
  }

  return (
    <View className="p-2">
      <BasicCard
        cardInfo={cardInfo}
        editable
      />

      <AtButton
        className="!mt-2"
        type="primary"
        openType="share"
      >
        分享我的名片
      </AtButton>

      <CompanyInfo cardInfo={cardInfo} />
    </View>
  )
}
