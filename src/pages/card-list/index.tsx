import { View } from '@tarojs/components'
import { useState } from 'react'
import { AtTabs, AtTabsPane } from 'taro-ui'

definePageConfig({
  navigationBarTitleText: '名片夹',
  enableShareAppMessage: true
})

export default function Index() {
  const [current, setCurrent] = useState(0)

  const tabList = [{ title: '收藏' }, { title: '我看过的' }, { title: '我的访客' }]

  const mockList = [
    {
      avatar: 'https://api.dicebear.com/9.x/initials/svg?seed=1',
      name: 'Bruce',
      company: 'xxx 公司',
      time: '2021-09-01 12:00'
    }
  ]

  return (
    <View>
      <AtTabs
        current={current}
        tabList={tabList}
        onClick={(i) => setCurrent(i)}
      >
        {tabList.map((_, index) => (
          <AtTabsPane
            key={index}
            current={current}
            index={index}
          >
            <View className="mt-2 text-center">暂未开放</View>
          </AtTabsPane>
        ))}
      </AtTabs>
    </View>
  )
}
