import { Checkbox, Text, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useState } from 'react'
import { AtButton, AtForm, AtInput, AtTextarea } from 'taro-ui'

import { UsersAPI, type UserVo } from '@/api'

definePageConfig({
  navigationBarTitleText: '编辑名片',
  enableShareAppMessage: true
})

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
  const [privacyChecked, setPrivacyChecked] = useState(false)

  Taro.useDidShow(async () => {
    await fetchUserInfo()
  })

  async function fetchUserInfo() {
    const userId = Taro.getStorageSync('user').UserId
    try {
      const { data } = await UsersAPI.getById(userId)
      setFormValue(data)
    } catch {
      setFormValue({})
    }
  }

  async function handleSubmit() {
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
    try {
      await UsersAPI.edit(formValue)
      Taro.showToast({
        title: '保存成功',
        icon: 'success'
      })
      Taro.switchTab({ url: '/pages/index/index' })
    } catch {
      //
    }
  }

  function navToPrivacyPolicy() {
    Taro.navigateTo({ url: '/pages/privacy-policy/index' })
  }

  return (
    <View className="pb-4">
      <AtForm onSubmit={() => handleSubmit()}>
        <AtInput
          name="cUserName"
          title="姓名"
          type="text"
          placeholder="请填写"
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
          value={formValue.cWetName}
          onChange={(value) =>
            setFormValue({
              ...formValue,
              cWetName: value.toString()
            })
          }
        />

        <View className="bg-[#f5f5f5] p-2 text-sm text-gray-500">企业信息</View>

        <AtInput
          name="cCompany"
          title="公司"
          type="text"
          placeholder="请填写"
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
          maxLength={500}
          placeholder="请输入"
        />

        <View className="bg-[#f5f5f5] p-2 text-sm text-gray-500">业务介绍</View>

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
          >
            保存
          </AtButton>
        </View>
      </AtForm>
    </View>
  )
}