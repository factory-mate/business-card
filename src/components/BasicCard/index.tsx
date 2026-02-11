import { Image, Text, View } from '@tarojs/components'
import Taro from '@tarojs/taro'

import { ViewAPI, type UserVo } from '@/api'
import StarArea from './StarArea'
import { checkFileUrl, getFileUrl } from '@/utils'
interface BasicCardProps {
  data: UserVo
  editable?: boolean
  starable?: boolean
  recordable?: boolean
}

export default function BasicCard(props: BasicCardProps) {
  const { data, editable, starable, recordable } = props

  const handleEdit = () =>
    Taro.navigateTo({
      url: '/pages/edit/index'
    })

  Taro.useDidShow(() => {
    const userId = Taro.getStorageSync('user').UserId
    const viewId = Taro.getCurrentInstance().router?.params.id!

    if (!recordable || !userId) {
      return
    }

    ViewAPI.add({
      cUserId: userId,
      cViewId: viewId
    })
  })

  return (
    <View className="relative flex h-fit w-auto flex-col rounded-md p-4 shadow-lg">
      {editable && (
        <Text
          className="absolute right-2 top-2 text-blue-400"
          onClick={() => handleEdit()}
        >
          编辑
        </Text>
      )}

      {starable && <StarArea />}

      <View className="flex items-center space-x-4">
        <View>
          {checkFileUrl(data.PicInfo) ? (
            <Image
              src={getFileUrl(data.PicInfo)}
              className="size-28"
              mode="widthFix"
            />
          ) : (
            <Image
              src="https://api.dicebear.com/9.x/initials/svg?seed=用户"
              className="size-28 rounded-full"
            />
          )}
        </View>
        <View className="flex flex-col gap-1">
          <Text
            className="text-3xl font-semibold"
            userSelect
          >
            {data.cUserName}
          </Text>
          <Text
            className="text-sm text-[#888888]"
            userSelect
          >
            {data.cDepartment}
          </Text>
          <Text
            className="text-sm text-[#888888]"
            userSelect
          >
            {data.cPost}
          </Text>
        </View>
      </View>

      <View className="mt-2 flex flex-col gap-1">
        <Text
          className="text-lg font-semibold"
          userSelect
        >
          {data.cCompany}
        </Text>
        <Text
          className="text-sm text-[#888888]"
          userSelect
        >
          {data.cAddress}
        </Text>
        {data.cUrl && (
          <Text
            className="text-sm text-[#888888]"
            userSelect
          >
            网址：{data.cUrl}
          </Text>
        )}
        {data.cPhone && (
          <Text
            className="text-sm text-[#888888]"
            userSelect
          >
            手机：{data.cPhone}
          </Text>
        )}
        {data.cEmail && (
          <Text
            className="text-sm text-[#888888]"
            userSelect
          >
            邮箱：{data.cEmail}
          </Text>
        )}
        {/* {data.cWetName && <Text className="text-[#888888]" userSelect>微信：{data.cWetName}</Text>} */}
      </View>
    </View>
  )
}
