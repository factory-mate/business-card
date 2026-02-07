import { ScrollView, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useMemo, useRef, useState } from 'react'
import { AtList, AtListItem, AtTabs, AtTabsPane } from 'taro-ui'

import './index.scss'
import { AuthorizationArea } from '@/components'
import { StarAPI, ViewAPI, type StarVo, type ViewVo } from '@/api'
import { getFileUrl } from '@/utils'

definePageConfig({
  navigationBarTitleText: '名片夹',
  enableShareAppMessage: false,
  onReachBottomDistance: 100
})

export default function Index() {
  const tabList = [{ title: '收藏' }, { title: '我看过的' }, { title: '我的访客' }]

  const pageParam = useRef({
    pageIndex: 1,
    pageSize: 10,
    total: 0
  })

  const [current, setCurrent] = useState(0)
  const [loading, setLoading] = useState(false)
  const [listData, setListData] = useState<(StarVo & ViewVo)[]>([])

  const getStarPageData = () => {
    setLoading(true)
    Taro.showLoading({ title: '加载中...' })

    const userId = Taro.getStorageSync('user').UserId

    StarAPI.getForPage({
      PageSize: 10,
      PageIndex: pageParam.current.pageIndex,
      Conditions: `cCollectId = ${userId}`,
      OrderByFileds: 'dCreateTime desc'
    })
      .then((res) => {
        if (res.success) {
          if (res.data?.data.length) {
            setListData((x) => [...x, ...res.data.data])
          }
          pageParam.current = { ...pageParam.current, total: res.data.dataCount }
        }
      })
      .finally(() => {
        Taro.hideLoading()
        setLoading(false)
      })
  }

  const getMyViewPageData = () => {
    setLoading(true)
    Taro.showLoading({ title: '加载中...' })

    const userId = Taro.getStorageSync('user').UserId

    ViewAPI.getForPage({
      PageSize: 10,
      PageIndex: pageParam.current.pageIndex,
      Conditions: `cUserId = ${userId}`,
      OrderByFileds: 'dCreateTime desc'
    })
      .then((res) => {
        if (res.success) {
          if (res.data?.data.length) {
            setListData((x) => [...x, ...res.data.data])
          }
          pageParam.current = { ...pageParam.current, total: res.data.dataCount }
        }
      })
      .finally(() => {
        Taro.hideLoading()
        setLoading(false)
      })
  }

  const getMyVisitorPageData = () => {
    setLoading(true)
    Taro.showLoading({ title: '加载中...' })

    const userId = Taro.getStorageSync('user').UserId

    ViewAPI.getForPage({
      PageSize: 10,
      PageIndex: pageParam.current.pageIndex,
      Conditions: `cViewId = ${userId}`,
      OrderByFileds: 'dCreateTime desc'
    })
      .then((res) => {
        if (res.success) {
          if (res.data?.data.length) {
            setListData((x) => [...x, ...res.data.data])
          }
          pageParam.current = { ...pageParam.current, total: res.data.dataCount }
        }
      })
      .finally(() => {
        Taro.hideLoading()
        setLoading(false)
      })
  }

  const resetPageParam = () => {
    pageParam.current = { ...pageParam.current, pageIndex: 1, total: 0 }
  }

  const handleClickTab = (index: number) => {
    setCurrent(index)
    resetPageParam()
    setListData([])
    getPageData(index)
  }

  const getPageData = (c: number) => {
    switch (c) {
      case 0:
        getStarPageData()
        break
      case 1:
        getMyViewPageData()
        break
      case 2:
        getMyVisitorPageData()
        break
      default:
        return
    }
  }

  const handleScrollToLower = () => {
    if (loading) {
      return
    }
    const noMore = listData.length >= pageParam.current.total
    if (noMore) {
      return
    }
    pageParam.current = { ...pageParam.current, pageIndex: pageParam.current.pageIndex + 1 }
    getPageData(current)
  }

  return (
    <AuthorizationArea
      onAuthSuccess={() => {
        setCurrent(0)
        resetPageParam()
        setListData([])
        getPageData(0)
      }}
    >
      <View className="card-list">
        <AtTabs
          current={current}
          tabList={tabList}
          onClick={handleClickTab}
        >
          {tabList.map((_, index) => (
            <AtTabsPane
              key={index}
              current={current}
              index={index}
            >
              <ScrollView
                className="h-[calc(100vh-90px)]"
                scrollY
                scrollWithAnimation
                scrollTop={0}
                lowerThreshold={50}
                upperThreshold={20}
                onScrollToLower={() => handleScrollToLower()}
              >
                <AtList>
                  {listData.map((i) => {
                    if (current === 0) {
                      return (
                        <AtListItem
                          title={i.cCollectName}
                          note={i.cCollectPost}
                          extraText={i.dCreateTime}
                          thumb={getFileUrl(i.CollectPicInfo)}
                          onClick={() =>
                            Taro.navigateTo({ url: `/pages/card/index?id=${i.cCollectID}` })
                          }
                        />
                      )
                    } else if (current === 1) {
                      return (
                        <AtListItem
                          title={i.cUserName}
                          note={i.cUserPost}
                          extraText={i.dCreateTime}
                          thumb={getFileUrl(i.UserPicInfo)}
                          onClick={() =>
                            Taro.navigateTo({ url: `/pages/card/index?id=${i.cUserID}` })
                          }
                        />
                      )
                    }
                  })}
                </AtList>
              </ScrollView>
            </AtTabsPane>
          ))}
        </AtTabs>
      </View>
    </AuthorizationArea>
  )
}
