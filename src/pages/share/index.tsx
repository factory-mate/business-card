import { View } from '@tarojs/components'

import { BasicCard, CompanyInfo, OperationBar } from '@/components'

definePageConfig({
  navigationBarTitleText: '查看名片',
  enableShareAppMessage: true
})

export default function Index() {
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
      <BasicCard cardInfo={cardInfo} />
      <OperationBar />
      <CompanyInfo cardInfo={cardInfo} />
    </View>
  )
}
