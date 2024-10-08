import { Text, View } from '@tarojs/components'

definePageConfig({
  navigationBarTitleText: '我的',
  enableShareAppMessage: true
})

export default function Index() {
  return (
    <View className="text-center">
      <Text className="mt-4">暂未开放</Text>
    </View>
  )
}
