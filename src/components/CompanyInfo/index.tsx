import { Text, View } from '@tarojs/components'
import { AtDivider } from 'taro-ui'

import type { CardInfo } from '@/types'

interface CompanyInfoProps {
  cardInfo: CardInfo
}

export default function CompanyInfo(props: CompanyInfoProps) {
  const { cardInfo } = props
  return (
    <View>
      <AtDivider
        className="mt-2"
        content="公司介绍"
      />
      <Text>{cardInfo.description}</Text>

      <AtDivider
        className="mt-2"
        content="业务介绍"
      />
      <Text>{cardInfo.description}</Text>

      <AtDivider
        className="mt-2"
        content="行业案例"
      />
      <Text>{cardInfo.description}</Text>
    </View>
  )
}
