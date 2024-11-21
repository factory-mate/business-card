import { View } from '@tarojs/components'

definePageConfig({
  navigationBarTitleText: '隐私政策',
  enableShareAppMessage: true
})

export default function Index() {
  return (
    <View className="space-y-2 p-2">
      <View className="text-sm">
        <View className="mb-1">一、收集你的微信昵称、头像</View>
        <View className="text-xs">
          <View>
            为了更好地为您提供会员服务，开发者将在获取你的明示同意后，收集你的微信昵称、头像。
          </View>
          <View>为了展示个人头像，开发者将在获取你的明示同意后，收集你的微信昵称、头像。</View>
          <View>
            为了保障你正常使用我们的服务，维护我们服务的正常运行，改进及优化我们的服务体验以及保障你的帐号安全，开发者将在获取你的明示同意后，收集你的微信昵称、头像。
          </View>
          <View>
            为了向你提供基础会员服务，帮助你完成注册成为会员，开发者将在获取你的明示同意后，收集你的微信昵称、头像。
          </View>
          <View>
            为了减少用户注册流程，快速实现登录，开发者将在获取你的明示同意后，收集你的微信昵称、头像。
          </View>
        </View>
      </View>

      <View className="text-sm">
        <View className="mb-1">二、收集你的位置信息</View>
        <View className="text-xs">
          <View>
            为了获取位置信息以显示你附近的服务/信息，开发者将在获取你的明示同意后，收集你的位置信息。
          </View>
          <View>
            为了更好地为你提供周边门店/自提点，开发者将在获取你的明示同意后，收集你的位置信息。
          </View>
          <View>
            为了便捷你发现周边的餐饮、商店等生活服务信息，开发者将在获取你的明示同意后，收集你的位置信息。
          </View>
          <View>为了打卡定位，开发者将在获取你的明示同意后，收集你的位置信息。</View>
        </View>
      </View>

      <View className="text-sm">
        <View className="mb-1">三 、收集你的地址</View>
        <View className="text-xs">
          <View>开发者收集你的地址，用于获取地址以显示你附近的服务/信息。</View>
          <View>
            开发者收集你的地址，用于微信运动距离。 开发者收集你的地址，用于核实商品订单发货地区。
          </View>
        </View>
      </View>

      <View className="text-sm">
        <View className="mb-1">四、收集你的手机号</View>
        <View className="text-xs">
          <View>为了更好地为您提供会员服务，开发者将在获取你的明示同意后，收集你的手机号。</View>
          <View>
            为了更好地为您提供商品订单发货服务，开发者将在获取你的明示同意后，收集你的手机号。
          </View>
          <View>为了用作唯一的用户标识，开发者在征得你明确同意后，收集您的手机号。</View>
          <View>为了登录或注册，开发者会在征得你明确同意后，收集你的手机号。</View>
        </View>
      </View>

      <View>
        <View className="text-sm">
          <View className="mb-1">五、其他</View>
          <View className="text-xs">
            <View>
              为了注册、登录小程序，开发者收集你的用户信息（微信昵称、头像、性别、地区）。
            </View>
            <View>
              为了更好地为您提供刷脸认证服务，开发者将在获取你的明示同意后，访问你的摄像头。
            </View>
            <View>为了上传图片或视频，开发者会在征得你的明确同意后，接入你的摄像头。</View>
            <View>为了用于社区发帖上传音频，开发者将在获取你的明示同意后，访问你的麦克风。</View>
            <View>
              为了通过语音与其他用户交流互动，开发者将在获取你的明示同意后，访问你的麦克风。
            </View>
            <View>
              为了通过语音与其他用户进行交流和交互，开发人员将在获得您的明确同意后，访问您的麦克风。
            </View>
            <View>
              为了下载商品分享的海报，开发者在征得你明确同意后，使用你的相册（只写）权限。
            </View>
            <View>为了保障你正常编辑个人信息等服务，</View>
            <View>开发者将在获取你的明示同意后，使用你的相册（仅写入）权限。</View>
            <View>开发者访问你的蓝牙，用于设备连接。</View>
            <View>开发者收集你选中的照片或视频信息，用于方便地提交表单、发布留言等信息。</View>
            <View>开发者收集你选中的照片或视频信息，用于上传图片或者视频。</View>
            <View>开发者收集你的通讯录（仅写入）权限，用于保存信息到你的通讯录。</View>
            <View>
              开发者收集你的发票信息，用于维护消费功能 开发者读取你的剪切板，用于复制文本等相关信息
            </View>
            <View>开发者收集你的设备信息，用于保障你正常使用网络服务</View>
            <View>开发者收集你的相册（仅写入）权限，用于保存图片到手机相册。</View>
            <View>
              开发者收集你选中的文件，用于上传文件信息。
              开发者获取你选择的位置信息，用于获取位置信息
            </View>
            <View>开发者收集你的手机号码，用于网约车司机与你取得联系。</View>
            <View>开发者收集你的身份证号码，用于法律实名制要求，为你提供车票购买服务。</View>
            <View>开发者收集你的身份证号码，用于实名认证后才能使用相关网络服务。</View>
            <View>开发者获取你选择的位置信息，用于线下导航服务 开发者收集你的</View>
            <View>收款账号（银行卡等），用于（您自己的余额提现等）。</View>
            <View>开发者收集你的邮箱，用于（发送必要的重要信息通知）。</View>
            <View>
              开发者收集你的设备信息，用于（优化小程序系统）。 开发者收集你的操作日志，用于运维。
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}
