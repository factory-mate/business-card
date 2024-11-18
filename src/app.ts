import 'taro-ui/dist/style/index.scss'
import './app.scss'

import { useLaunch } from '@tarojs/taro'
import type { PropsWithChildren } from 'react'

export default function App({ children }: PropsWithChildren) {
  useLaunch(() => {})

  return children
}
