import { Image, Text, View } from '@tarojs/components'
import { AtDivider } from 'taro-ui'

import type { UserVo } from '@/api'
import { getFileUrl } from '@/utils'

interface CompanyInfoProps {
  data: UserVo
}

export default function CompanyInfo(props: CompanyInfoProps) {
  const { data } = props

  return (
    <>
      {data.cCompanyIntroduce && (
        <View className="mt-2 px-4 pb-4 shadow-lg">
          <AtDivider
            content="公司介绍"
            height="60"
          />
          <Text
            className="text-sm text-[#888888]"
            userSelect
          >
            {data.cCompanyIntroduce}
          </Text>
        </View>
      )}

      {data.list_IntroduceInfo && data.list_IntroduceInfo.length > 0 && (
        <View className="mt-2 px-4 pb-4 shadow-lg">
          <AtDivider
            content="业务介绍"
            height="60"
          />
          {data.list_IntroduceInfo.map((item) => (
            <View
              key={item.UID}
              className="mt-1"
            >
              <Image
                src={getFileUrl(item)}
                className="w-full"
                mode="aspectFill"
              />
            </View>
          ))}
        </View>
      )}

      {data.list_ProjectInfo && data.list_ProjectInfo.length > 0 && (
        <View className="mt-2 px-4 pb-4 shadow-lg">
          <AtDivider
            content="行业案例"
            height="60"
          />
          {data.list_ProjectInfo.map((item) => (
            <View
              key={item.UID}
              className="mt-1"
            >
              <Image
                src={getFileUrl(item)}
                className="w-full"
                mode="aspectFill"
              />
            </View>
          ))}
        </View>
      )}
    </>
  )
}
