import { Button, Image, Text, View } from '@tarojs/components'
import { addPhoneContact, makePhoneCall, useShareAppMessage } from '@tarojs/taro'
import { useState } from 'react'
import { AtModal, AtModalContent, AtModalHeader } from 'taro-ui'

import { appConfig } from '@/config'

import qrcode from '../../assets/sample/qrcode.jpg'

export default function OperationBar() {
  useShareAppMessage(() => ({
    title: appConfig.name,
    path: '/pages/share/index'
  }))

  const [open, setOpen] = useState(false)

  const handleMakePhoneCall = () => makePhoneCall({ phoneNumber: '10086' })

  const handleAddWechat = () => setOpen(true)

  const handleAddPhoneContact = () =>
    addPhoneContact({
      photoFilePath: '',
      firstName: '张三',
      title: '开发',
      organization: '慧友科技股份有限公司',
      email: 'recall4056@gmail.com',
      mobilePhoneNumber: '10086',
      url: 'https://baidu.com',
      weChatNumber: 'Recall4056'
    })

  return (
    <View className="mt-2 flex items-center justify-between rounded-md border p-2 shadow-xl">
      <View>
        <Button
          style={{ border: 'none', fontSize: '14px' }}
          plain
          hoverClass="none"
          onClick={handleMakePhoneCall}
        >
          拨打电话
        </Button>
      </View>
      <View>
        <Button
          style={{ border: 'none', fontSize: '14px' }}
          plain
          hoverClass="none"
          onClick={handleAddWechat}
        >
          添加微信
        </Button>
      </View>
      <View>
        <Button
          style={{ border: 'none', fontSize: '14px' }}
          openType="share"
          plain
          hoverClass="none"
        >
          分享名片
        </Button>
      </View>
      <View>
        <Button
          style={{ border: 'none', fontSize: '14px' }}
          plain
          hoverClass="none"
          onClick={handleAddPhoneContact}
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
              src={qrcode}
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
