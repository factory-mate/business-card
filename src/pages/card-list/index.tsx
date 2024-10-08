import { View } from '@tarojs/components'
import { memo, useState } from 'react'
import { AtTabs, AtTabsPane } from 'taro-ui'

const Row = memo(({ id, data, index }: { id: string; data: any[]; index: number }) => (
  <View
    id={id}
    className={index % 2 ? 'ListItemOdd' : 'ListItemEven'}
  >
    Row {index} : {data[index]}
  </View>
))
Row.displayName = 'Row'

function buildData(offset = 0) {
  return Array(100)
    .fill(0)
    .map((_, i) => i + offset)
}

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

  const [data, setData] = useState(buildData(0))

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
            <View>123</View>
          </AtTabsPane>
        ))}
      </AtTabs>
    </View>
  )
}
