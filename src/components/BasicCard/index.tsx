import { Image, Text, View } from '@tarojs/components'
import Taro from '@tarojs/taro'

import type { UserVo } from '@/api'

interface BasicCardProps {
  data: UserVo
  editable?: boolean
}

export default function BasicCard(props: BasicCardProps) {
  const { data, editable } = props

  function handleEdit() {
    Taro.navigateTo({
      url: '/pages/edit/index'
    })
  }

  return (
    <View className="relative flex h-fit w-auto flex-col rounded-md p-4 shadow-xl">
      {editable && (
        <Text
          className="absolute right-2 top-2 text-blue-400"
          onClick={() => handleEdit()}
        >
          编辑
        </Text>
      )}

      <View className="flex items-center space-x-4">
        <View>
          <Image
            src={`https://api.dicebear.com/9.x/initials/svg?seed=${data.cUserName ?? '用户'}`}
            className="size-24 rounded-full"
          />
        </View>
        <View className="flex flex-col gap-1">
          <Text className="text-3xl font-semibold">{data.cUserName}</Text>
          <Text>{data.cDepartment}</Text>
          <Text>{data.cPost}</Text>
        </View>
      </View>

      <View className="mt-2 flex flex-col gap-1">
        <Text className="text-lg font-semibold">{data.cCompany}</Text>
        <Text>{data.cAddress}</Text>
        {data.cUrl && <Text>网址：{data.cUrl}</Text>}
        {data.cPhone && <Text>手机：{data.cPhone}</Text>}
        {data.cEmail && <Text>邮箱：{data.cEmail}</Text>}
        {data.cWetName && <Text>微信：{data.cWetName}</Text>}
      </View>
    </View>
  )
}
