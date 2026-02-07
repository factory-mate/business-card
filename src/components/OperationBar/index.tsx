import { Button, Image, Text, View } from '@tarojs/components'
import { addPhoneContact, makePhoneCall, useShareAppMessage } from '@tarojs/taro'
import { useState } from 'react'
import { AtModal, AtModalContent, AtModalHeader } from 'taro-ui'
import LaAddressBook from '../../assets/share/LaAddressBook.png'
import LaIdCard from '../../assets/share/LaIdCard.png'
import LaWeixin from '../../assets/share/LaWeixin.png'
import LaPhone from '../../assets/share/LaPhone.png'

import type { UserVo } from '@/api'
import { appConfig } from '@/config'
import { checkFileUrl, getFileUrl } from '@/utils'

interface OperationBarProps {
  data: UserVo
}

export default function OperationBar(props: OperationBarProps) {
  const { data } = props

  useShareAppMessage(() => ({
    title: appConfig.name,
    path: `/pages/card/index?id=${data.UID}`
  }))

  const [open, setOpen] = useState(false)

  const handleMakePhoneCall = () => makePhoneCall({ phoneNumber: data.cPhone! })

  const handleAddWechat = () => setOpen(true)

  const handleAddPhoneContact = () =>
    addPhoneContact({
      photoFilePath: '',
      firstName: data.cUserName ?? '',
      title: data.cPost,
      organization: data.cCompany,
      email: data.cEmail,
      mobilePhoneNumber: data.cPhone,
      url: data.cUrl,
      weChatNumber: data.cWetName
    })

  return (
    <View className="mt-2 flex items-center justify-between rounded-md border p-2 shadow-xl">
      {data.cPhone && (
        <View
          className="flex flex-col items-center justify-center"
          onClick={handleMakePhoneCall}
        >
          <Image
            src={LaPhone}
            className="size-6"
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
            src={LaWeixin}
            className="size-6"
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
              src={LaIdCard}
              className="size-6"
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
          className="size-6"
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
    </View>
  )
}
