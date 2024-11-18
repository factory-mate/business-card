import { Text, View } from '@tarojs/components'
import { AtDivider } from 'taro-ui'

import type { UserVo } from '@/api'

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

      {data.cCompanyIntroduce && (
        <>
          <AtDivider
            className="mt-2"
            content="业务介绍"
          />
          <Text>{data.cCompanyIntroduce}</Text>
        </>
      )}

      {data.cCompanyIntroduce && (
        <>
          <AtDivider
            className="mt-2"
            content="行业案例"
          />
          <Text>{data.cCompanyIntroduce}</Text>
        </>
      )}
    </View>
  )
}
