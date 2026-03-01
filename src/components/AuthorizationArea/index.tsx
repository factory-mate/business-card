import Taro from '@tarojs/taro'
import { type PropsWithChildren } from 'react'

interface AuthorizationAreaProps extends PropsWithChildren {}

export default function AuthorizationArea(props: AuthorizationAreaProps) {
  const { children } = props

  Taro.useDidShow(async () => {
    const token = Taro.getStorageSync('token')
    if (!token) {
      Taro.redirectTo({ url: '/pages/auth/index' })
    }
  })

  return <>{children}</>
}
