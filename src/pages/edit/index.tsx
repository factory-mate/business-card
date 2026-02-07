import { Checkbox, Text, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useState } from 'react'
import { AtButton, AtForm, AtImagePicker, AtInput, AtTextarea } from 'taro-ui'
import type { AtImagePickerProps, File } from 'taro-ui/types/image-picker'

import { FilesAPI, FileType, UsersAPI, type UserVo } from '@/api'
import { getFileUrl } from '@/utils'

definePageConfig({
  navigationBarTitleText: '编辑名片',
  enableShareAppMessage: false
})

interface FileWithUid extends File {
  uid?: string
}

export default function Index() {
  const [formValue, setFormValue] = useState<UserVo>({
    cUserName: '',
    cPhone: '',
    cEmail: '',
    cWetName: '',
    cCompany: '',
    cDepartment: '',
    cPost: '',
    cUrl: '',
    cAddress: '',
    cCompanyIntroduce: ''
  })
  const [avatarFiles, setAvatarFiles] = useState<AtImagePickerProps['files']>([])
  const [wechatQrCodeFiles, setWechatQrCodeFiles] = useState<AtImagePickerProps['files']>([])
  const [listIntroduceFiles, setListIntroduceFiles] = useState<FileWithUid[]>([])
  const [listProjectFiles, setListProjectFiles] = useState<FileWithUid[]>([])
  const [privacyChecked, setPrivacyChecked] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  Taro.useLoad(async () => {
    await fetchUserInfo()
  })

  async function fetchUserInfo() {
    const userId = Taro.getStorageSync('user').UserId
    Taro.showLoading({ title: '加载中...' })
    try {
      const { data } = await UsersAPI.getAllInfo(userId)
      setFormValue(data)
      setAvatarFiles(data.PicInfo?.UID ? [{ url: getFileUrl(data.PicInfo) }] : [])
      setWechatQrCodeFiles(data.BarCodeInfo?.UID ? [{ url: getFileUrl(data.BarCodeInfo) }] : [])
      setListIntroduceFiles(
        data.list_IntroduceInfo?.map((item) => ({ url: getFileUrl(item), uid: item.UID })) ?? []
      )
      setListProjectFiles(
        data.list_ProjectInfo?.map((item) => ({ url: getFileUrl(item), uid: item.UID })) ?? []
      )
    } catch {
      setFormValue({})
    }
    Taro.hideLoading()
  }

  async function handleSubmit() {
    if (isSubmitting) {
      Taro.showToast({
        title: '请勿重复提交',
        icon: 'none'
      })
      return
    }
    if (!privacyChecked) {
      Taro.showToast({
        title: '请先阅读并同意《用户服务协议》及《隐私政策》',
        icon: 'none'
      })
      return
    }
    if (!formValue.cUserName) {
      Taro.showToast({
        title: '姓名不能为空',
        icon: 'none'
      })
      return
    }
    if (!formValue.cPhone) {
      Taro.showToast({
        title: '手机不能为空',
        icon: 'none'
      })
      return
    }
    if (!formValue.cCompany) {
      Taro.showToast({
        title: '公司不能为空',
        icon: 'none'
      })
      return
    }

    setIsSubmitting(true)

    const data = { ...formValue }

    try {
      if (avatarFiles.filter((i) => i.file).length > 0) {
        const { UID } = await FilesAPI.upload({
          file: avatarFiles[0],
          fileType: FileType.AVATAR
        })
        data.cPicUID = UID
      }
      if (wechatQrCodeFiles.filter((i) => i.file).length > 0) {
        const { UID } = await FilesAPI.upload({
          file: wechatQrCodeFiles[0],
          fileType: FileType.QRCODE
        })
        data.cWetBarCodeUID = UID
      }
      if (listIntroduceFiles.filter((i) => i.file).length > 0) {
        const UIDList = await Promise.all(
          listIntroduceFiles.map(async (file) => {
            let UID = ''
            if (file.file) {
              UID = (
                await FilesAPI.upload({
                  file,
                  fileType: FileType.INTRODUCTION
                })
              ).UID
            } else {
              UID = file.uid!
            }
            return UID
          })
        )
        data.list_IntroduceUID = UIDList
      } else {
        data.list_IntroduceUID = listIntroduceFiles.map((i) => i.uid!)
      }
      if (listProjectFiles.filter((i) => i.file).length > 0) {
        const UIDList = await Promise.all(
          listProjectFiles.map(async (file) => {
            let UID = ''
            if (file.file) {
              UID = (
                await FilesAPI.upload({
                  file,
                  fileType: FileType.PRODUCTION
                })
              ).UID
            } else {
              UID = file.uid!
            }
            return UID
          })
        )
        data.list_ProjectUID = UIDList
      } else {
        data.list_ProjectUID = listProjectFiles.map((i) => i.uid!)
      }
      await UsersAPI.edit(data)
      Taro.showToast({
        title: '保存成功',
        icon: 'success'
      })
      setTimeout(() => {
        Taro.switchTab({ url: '/pages/index/index' })
      }, 500)
    } catch {
      //
    }
    setIsSubmitting(false)
  }

  function navToPrivacyPolicy() {
    Taro.navigateTo({ url: '/pages/privacy-policy/index' })
  }

  return (
    <View className="pb-4">
      <AtForm onSubmit={() => handleSubmit()}>
        <View className="px-4 py-2">头像</View>
        <AtImagePicker
          className="px-1"
          files={avatarFiles}
          multiple={false}
          showAddBtn={avatarFiles.length === 0}
          onChange={(files) => setAvatarFiles(files)}
        />
        <AtInput
          name="cUserName"
          title="姓名"
          type="text"
          placeholder="请填写"
          cursor={-1}
          value={formValue.cUserName}
          onChange={(value) =>
            setFormValue({
              ...formValue,
              cUserName: value.toString()
            })
          }
          required
        />
        <AtInput
          name="cPhone"
          title="手机"
          type="text"
          placeholder="请填写"
          cursor={-1}
          value={formValue.cPhone}
          onChange={(value) =>
            setFormValue({
              ...formValue,
              cPhone: value.toString()
            })
          }
          required
        />
        <AtInput
          name="cEmail"
          title="邮箱"
          type="text"
          placeholder="请填写"
          cursor={-1}
          value={formValue.cEmail}
          onChange={(value) =>
            setFormValue({
              ...formValue,
              cEmail: value.toString()
            })
          }
        />
        <AtInput
          name="cWetName"
          title="微信号"
          type="text"
          placeholder="请填写"
          cursor={-1}
          value={formValue.cWetName}
          onChange={(value) =>
            setFormValue({
              ...formValue,
              cWetName: value.toString()
            })
          }
        />

        <View className="px-4 py-2">微信二维码</View>
        <AtImagePicker
          className="px-1"
          files={wechatQrCodeFiles}
          multiple={false}
          showAddBtn={wechatQrCodeFiles.length === 0}
          onChange={(files) => setWechatQrCodeFiles(files)}
        />

        <View className="bg-[#f5f5f5] p-2 text-sm text-gray-500">企业信息</View>

        <AtInput
          name="cCompany"
          title="公司"
          type="text"
          placeholder="请填写"
          cursor={-1}
          value={formValue.cCompany}
          onChange={(value) =>
            setFormValue({
              ...formValue,
              cCompany: value.toString()
            })
          }
          required
        />
        <AtInput
          name="cDepartment"
          title="部门"
          type="text"
          placeholder="请填写"
          cursor={-1}
          value={formValue.cDepartment}
          onChange={(value) =>
            setFormValue({
              ...formValue,
              cDepartment: value.toString()
            })
          }
        />
        <AtInput
          name="cPost"
          title="职位"
          type="text"
          placeholder="请填写"
          cursor={-1}
          value={formValue.cPost}
          onChange={(value) =>
            setFormValue({
              ...formValue,
              cPost: value.toString()
            })
          }
        />
        <AtInput
          name="cUrl"
          title="企业官网"
          type="text"
          placeholder="请填写"
          cursor={-1}
          value={formValue.cUrl}
          onChange={(value) =>
            setFormValue({
              ...formValue,
              cUrl: value.toString()
            })
          }
        />
        <AtInput
          name="cAddress"
          title="地址"
          type="text"
          placeholder="请填写"
          cursor={-1}
          value={formValue.cAddress}
          onChange={(value) =>
            setFormValue({
              ...formValue,
              cAddress: value.toString()
            })
          }
        />

        <View className="bg-[#f5f5f5] p-2 text-sm text-gray-500">公司介绍</View>
        <AtTextarea
          count
          value={formValue.cCompanyIntroduce ?? ''}
          onChange={(value) =>
            setFormValue({
              ...formValue,
              cCompanyIntroduce: value.toString()
            })
          }
          maxLength={200}
          height={250}
          placeholder="请输入"
        />

        <View className="bg-[#f5f5f5] p-2 text-sm text-gray-500">业务介绍</View>
        <AtImagePicker
          className="p-1"
          files={listIntroduceFiles}
          multiple
          showAddBtn
          onChange={(files) => setListIntroduceFiles(files)}
        />

        <View className="bg-[#f5f5f5] p-2 text-sm text-gray-500">行业案例</View>
        <AtImagePicker
          className="p-1"
          files={listProjectFiles}
          multiple
          showAddBtn
          onChange={(files) => setListProjectFiles(files)}
        />

        <View className="flex items-center">
          <Checkbox
            className="p-2"
            value=""
            checked={privacyChecked}
            onClick={() => setPrivacyChecked(!privacyChecked)}
          />

          <View className="text-sm">
            我已阅读并同意
            <Text
              className="text-blue-500"
              onClick={() => navToPrivacyPolicy()}
            >
              《用户服务协议》
            </Text>
            及
            <Text
              className="text-blue-500"
              onClick={() => navToPrivacyPolicy()}
            >
              《隐私政策》
            </Text>
          </View>
        </View>

        <View className="p-2">
          <AtButton
            type="primary"
            formType="submit"
            loading={isSubmitting}
            disabled={isSubmitting}
          >
            保存
          </AtButton>
        </View>
      </AtForm>
    </View>
  )
}
