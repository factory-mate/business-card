import { Text, Image, View } from '@tarojs/components'
import { useState } from 'react'
import LaStar from '../../../assets/share/LaStar.png'
import LaStarSolid from '../../../assets/share/LaStarSolid.png'
import { StarAPI } from '@/api'
import Taro from '@tarojs/taro'

export default function StarArea() {
  const [starUID, setStarUID] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleStar = () => {
    const userId = Taro.getStorageSync('user').UserId
    const collectId = Taro.getCurrentInstance().router?.params.id!

    if (!userId) {
      Taro.showModal({
        title: '提示',
        content: '请先登录后，再进行收藏操作',
        success: (res) => {
          if (res.confirm) {
            Taro.switchTab({ url: '/pages/index/index' })
          }
        }
      })
      return
    }

    if (isLoading) {
      return
    }

    setIsLoading(true)

    if (starUID) {
      StarAPI.del(starUID)
        .then((res) => {
          if (res.success) {
            Taro.showToast({
              title: '取消收藏成功',
              icon: 'success'
            })
          }
        })
        .finally(() => {
          getStarStatus()
          setIsLoading(false)
        })
    } else {
      StarAPI.add({
        cUserId: userId,
        cCollectId: collectId
      })
        .then((res) => {
          if (res.success) {
            Taro.showToast({
              title: '收藏成功',
              icon: 'success'
            })
          }
        })
        .finally(() => {
          getStarStatus()
          setIsLoading(false)
        })
    }
  }

  const getStarStatus = () => {
    const userId = Taro.getStorageSync('user').UserId
    const collectId = Taro.getCurrentInstance().router?.params.id!

    StarAPI.getForPage({
      PageSize: 1,
      PageIndex: 1,
      Conditions: `cUserID = ${collectId} && cCollectId = ${userId}`,
      OrderByFileds: ''
    }).then((res) => {
      if (res.success && res.data?.data?.length) {
        setStarUID(res.data.data[0].UID!)
      } else {
        setStarUID('')
      }
    })
  }

  Taro.useDidShow(() => {
    const userId = Taro.getStorageSync('user').UserId

    if (!userId) {
      return
    }

    getStarStatus()
  })

  return (
    <View
      className="absolute right-2 top-2 flex items-center text-yellow-500"
      onClick={handleStar}
    >
      <Image
        src={starUID ? LaStarSolid : LaStar}
        className="size-5"
        mode="aspectFit"
      />
      <Text className="ml-0.5 mt-0.5 text-sm">{starUID ? '已收藏' : '收藏'}</Text>
    </View>
  )
}
