import { Image, Text, View } from '@tarojs/components'

import type { CardInfo } from '@/types'

interface BasicCardProps {
  cardInfo: CardInfo
  editable?: boolean
}

export default function BasicCard(props: BasicCardProps) {
  const { cardInfo, editable } = props
  return (
    <View className="relative flex h-fit w-auto flex-col rounded-md p-4 shadow-xl">
      {editable && <Text className="absolute right-2 top-2 text-blue-400">编辑</Text>}

      <View className="flex items-center space-x-4">
        <View>
          <Image
            src={`https://api.dicebear.com/9.x/initials/svg?seed=${cardInfo.name}`}
            className="size-24 rounded-full"
          />
        </View>
        <View className="flex flex-col gap-1">
          <Text className="text-3xl font-semibold">{cardInfo.name}</Text>
          <Text>{cardInfo.department}</Text>
          <Text>{cardInfo.title}</Text>
        </View>
      </View>

      <View className="mt-2 flex flex-col gap-1">
        <Text className="text-lg font-semibold">{cardInfo.company}</Text>
        <Text>{cardInfo.address}</Text>
        <Text>网址：{cardInfo.website}</Text>
        <Text>手机：{cardInfo.phone}</Text>
        <Text>邮箱：{cardInfo.email}</Text>
        <Text>微信：{cardInfo.wechat}</Text>
      </View>
    </View>
  )
}
