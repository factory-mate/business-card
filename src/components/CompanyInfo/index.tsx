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
    <View>
      {data.cCompanyIntroduce && (
        <>
          <AtDivider
            className="mt-2"
            content="公司介绍"
          />
          <Text>{data.cCompanyIntroduce}</Text>
        </>
      )}

      {data.list_IntroduceInfo && data.list_IntroduceInfo.length > 0 && (
        <>
          <AtDivider
            className="mt-2"
            content="业务介绍"
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
        </>
      )}

      {data.list_ProjectInfo && data.list_ProjectInfo.length > 0 && (
        <>
          <AtDivider
            className="mt-2"
            content="行业案例"
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
        </>
      )}
    </View>
  )
}
