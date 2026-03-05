import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useRef, useState } from 'react'
import { AtButton } from 'taro-ui'

import { UsersAPI, type UserVo } from '@/api'
import { AuthorizationArea, BasicCard, CompanyInfo } from '@/components'
import { appConfig } from '@/config'
import { getFileUrl } from '@/utils'

definePageConfig({
  navigationBarTitleText: '首页',
  enableShareAppMessage: true
})

export default function Index() {
  const [userDetail, setUserDetail] = useState<UserVo>({})
  const userDetailRef = useRef<UserVo>({})
  const shareImageUrl = useRef('')

  Taro.useShareAppMessage(() => ({
    title: appConfig.name,
    path: `/pages/card/index?id=${Taro.getStorageSync('user').UserId}`,
    imageUrl: shareImageUrl.current
  }))

  Taro.useDidShow(async () => {
    if (!Taro.getStorageSync('token')) {
      return
    }
    await fetchUserInfo()
    generateSilentImage()
  })

  Taro.useReady(() => {
    generateSilentImage()
  })

  Taro.useDidShow(() => {
    generateSilentImage()
  })

  const generateSilentImage = async (): Promise<any> => {
    if (!userDetailRef.current.UID) {
      return
    }

    const baseWidth = 500
    const baseHeight = 600
    const dpr = Taro.getWindowInfo().pixelRatio

    const canvas = Taro.createOffscreenCanvas({
      type: '2d',
      width: baseWidth * dpr,
      height: baseHeight * dpr
    })

    const ctx: any = canvas.getContext('2d')
    ctx.scale(dpr, dpr)

    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, baseWidth, baseHeight)

    const img = canvas.createImage()
    img.src = getFileUrl(userDetailRef.current.PicInfo)

    await new Promise((resolve, reject) => {
      img.onload = () => {
        ctx.save()
        ctx.beginPath()
        ctx.ellipse(95, 105, 75, 75, 0, 0, 2 * Math.PI)
        ctx.clip()
        ctx.drawImage(img, 20, 30, 150, 150)
        ctx.restore()
        resolve(true)
      }
      img.onerror = reject
    })

    const texts = [
      {
        text: userDetailRef.current.cUserName,
        x: 200,
        y: 65,
        font: 'bold 40px sans-serif',
        color: '#000000'
      },
      {
        text: userDetailRef.current.cDepartment,
        x: 200,
        y: 115,
        font: '24px sans-serif',
        color: '#999999'
      },
      {
        text: userDetailRef.current.cPost,
        x: 200,
        y: 165,
        font: '24px sans-serif',
        color: '#999999'
      },
      {
        text: userDetailRef.current.cCompany,
        x: 30,
        y: 230,
        font: 'bold 40px sans-serif',
        color: '#000000'
      },
      {
        text: userDetailRef.current.cAddress,
        x: 30,
        y: 270,
        font: '24px sans-serif',
        color: '#999999'
      },
      { text: `网址：${userDetailRef.current.cUrl}`, x: 30, y: 310, font: '24px sans-serif' },
      { text: `手机：${userDetailRef.current.cPhone}`, x: 30, y: 350, font: '24px sans-serif' },
      { text: `邮箱：${userDetailRef.current.cEmail}`, x: 30, y: 390, font: '24px sans-serif' }
    ]

    texts.forEach((item) => {
      ctx.font = item.font || '24px sans-serif'
      ctx.fillStyle = item.color || '#999999'
      ctx.fillText(item.text, item.x, item.y)
    })

    const tempFilePath = await new Promise((resolve, reject) => {
      Taro.canvasToTempFilePath({
        canvas: canvas as any,
        success: (res) => resolve(res.tempFilePath),
        fail: reject
      })
    })

    shareImageUrl.current = tempFilePath as string
  }

  async function fetchUserInfo() {
    Taro.showLoading({ title: '加载中...' })
    const userId = Taro.getStorageSync('user').UserId
    try {
      const { data } = await UsersAPI.getAllInfo(userId)
      setUserDetail(data)
      userDetailRef.current = data
    } catch {
      setUserDetail({})
      userDetailRef.current = {}
    }
    Taro.hideLoading()
  }

  return (
    <AuthorizationArea>
      <View className="p-2">
        <BasicCard
          data={userDetail}
          editable
          starable={false}
        />

        <AtButton
          className="!mt-2"
          type="primary"
          openType="share"
        >
          分享我的名片
        </AtButton>

        <CompanyInfo data={userDetail} />
      </View>
    </AuthorizationArea>
  )
}
