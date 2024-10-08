import { Text, View } from '@tarojs/components'
import { AtButton, AtDivider } from 'taro-ui'

import { Card } from './components'

export default function Index() {
  const userInfo = {
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
    <View className="w-auto p-2">
      <Card userInfo={userInfo} />

      <AtButton
        className="!mt-2"
        type="primary"
      >
        分享我的名片
      </AtButton>

      <AtDivider
        className="mt-2"
        content="公司介绍"
      />
      <Text>{userInfo.description}</Text>

      <AtDivider
        className="mt-2"
        content="业务介绍"
      />
      <Text>{userInfo.description}</Text>
    </View>
  )
}
