import { Image, Text, View } from '@tarojs/components'

import type { UserInfo } from '../../types'

interface Props {
  userInfo: UserInfo
}

export default function Card(props: Props) {
  const { userInfo } = props
  return (
    <View className="relative flex h-fit w-auto flex-col rounded-md p-4 shadow-xl">
      <Text className="absolute right-2 top-2 text-blue-400">编辑</Text>

      <View className="flex items-center space-x-4">
        <View>
          <Image
            src={`https://api.dicebear.com/9.x/initials/svg?seed=${userInfo.name}`}
            className="size-24 rounded-full"
          />
        </View>
        <View className="flex flex-col gap-1">
          <Text className="text-3xl font-semibold">{userInfo.name}</Text>
          <Text>{userInfo.department}</Text>
          <Text>{userInfo.title}</Text>
        </View>
      </View>

      <View className="mt-2 flex flex-col gap-1">
        <Text className="text-lg font-semibold">{userInfo.company}</Text>
        <Text>{userInfo.address}</Text>
        <Text>网址：{userInfo.website}</Text>
        <Text>手机：{userInfo.phone}</Text>
        <Text>邮箱：{userInfo.email}</Text>
        <Text>微信：{userInfo.wechat}</Text>
      </View>
    </View>
  )
}
