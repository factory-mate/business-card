import { Button, Image, Text, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useState } from 'react'
import { AtModal, AtModalContent, AtModalHeader } from 'taro-ui'
import LaAddressBook from '../../assets/share/LaAddressBook.png'
import LaMdiCardAccountDetailsIdCard from '../../assets/share/MdiCardAccountDetails.png'
import IcBaselineWechat from '../../assets/share/IcBaselineWechat.png'
import IcBaselineCall from '../../assets/share/IcBaselineCall.png'

import type { UserVo } from '@/api'
import { checkFileUrl, getFileUrl } from '@/utils'

interface OperationBarProps {
  data: UserVo
}

export default function OperationBar(props: OperationBarProps) {
  const { data } = props

  const [open, setOpen] = useState(false)

  const handleMakePhoneCall = () => Taro.makePhoneCall({ phoneNumber: data.cPhone! })

  const handleAddWechat = () => setOpen(true)

  const handleAddPhoneContact = () =>
    Taro.addPhoneContact({
      photoFilePath: '',
      firstName: data.cUserName ?? '',
      title: data.cPost,
      organization: data.cCompany,
      email: data.cEmail,
      mobilePhoneNumber: data.cPhone,
      url: data.cUrl,
      weChatNumber: data.cWetName,
      success: () => {
        Taro.showToast({ title: '保存成功', icon: 'success' })
      },
      fail: (err) => {
        Taro.showModal({
          title: '提示',
          content: '请检查是否开启通讯录权限：' + err.errMsg,
          showCancel: false
        })
      }
    })

  return (
    <View className="mt-2 flex items-center justify-between rounded-md border p-2 shadow-xl">
      {data.cPhone && (
        <View
          className="flex flex-col items-center justify-center"
          onClick={handleMakePhoneCall}
        >
          <Image
            src={IcBaselineCall}
            className="size-9"
            mode="aspectFit"
          />
          <Button
            style={{ border: 'none', fontSize: '12px' }}
            plain
            hoverClass="none"
          >
            拨打电话
          </Button>
        </View>
      )}
      {checkFileUrl(data.BarCodeInfo) && (
        <View
          className="flex flex-col items-center justify-center"
          onClick={handleAddWechat}
        >
          <Image
            src={IcBaselineWechat}
            className="size-9"
            mode="aspectFit"
          />
          <Button
            style={{ border: 'none', fontSize: '12px' }}
            plain
            hoverClass="none"
          >
            添加微信
          </Button>
        </View>
      )}
      <View>
        <Button
          style={{ border: 'none', fontSize: '12px' }}
          openType="share"
          plain
          hoverClass="none"
        >
          <View className="flex flex-col items-center justify-center">
            <Image
              src={LaMdiCardAccountDetailsIdCard}
              className="size-9"
              mode="aspectFit"
            />
            分享名片
          </View>
        </Button>
      </View>
      <View
        className="flex flex-col items-center justify-center"
        onClick={handleAddPhoneContact}
      >
        <Image
          src={LaAddressBook}
          className="size-9"
          mode="aspectFit"
        />
        <Button
          style={{ border: 'none', fontSize: '12px' }}
          plain
          hoverClass="none"
        >
          存到通讯录
        </Button>
      </View>
      {checkFileUrl(data.BarCodeInfo) && (
        <AtModal
          isOpened={open}
          onClose={() => setOpen(false)}
        >
          <AtModalHeader>添加微信</AtModalHeader>
          <AtModalContent>
            <View className="flex flex-col items-center">
              <Text>加我好友，了解更多服务</Text>
              <Image
                src={getFileUrl(data.BarCodeInfo)}
                mode="aspectFit"
                showMenuByLongpress
              />
              <Text>长按二维码添加好友</Text>
            </View>
          </AtModalContent>
        </AtModal>
      )}
    </View>
  )
}
