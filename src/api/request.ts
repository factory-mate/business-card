import Taro from '@tarojs/taro'

export const API_DOMAIN_PREFIX = 'https://huiyoucloud.com:8099'

// interface CustomOptions {
//   skipErrorMsg?: boolean
// }

export const request = <T = any>(
  options: RequestOptions
  // customOptions: CustomOptions = {}
): Promise<Response<T>> =>
  new Promise((resolve, reject) => {
    // const { skipErrorMsg } = customOptions
    Taro.request({
      url: API_DOMAIN_PREFIX + options.url,
      method: options.method,
      header: {
        'content-type': 'application/json',
        authorization: `Bearer ${Taro.getStorageSync('token')}`
      },
      timeout: 30000,
      data: options.data,
      success: (res) => {
        const { data, statusCode } = res
        const { msg, errmsg } = data
        const errorMessage = (
          msg ||
          errmsg?.[0]?.msg ||
          errmsg?.[0]?.Value ||
          errmsg ||
          '请求错误'
        ).toString()
        if (statusCode === 401 || statusCode === 403) {
          Taro.showToast({ title: errorMessage, icon: 'error', duration: 2000 })
          Taro.removeStorageSync('token')
          Taro.removeStorageSync('user')
          // Taro.switchTab({ url: '/pages/index/index' })
        } else if (statusCode !== 200) {
          Taro.showToast({ title: errorMessage, icon: 'error', duration: 2000 })
          reject(data)
        } else {
          if (!data.success) {
            Taro.showToast({ title: errorMessage, icon: 'error', duration: 2000 })
            reject(data)
          }
          resolve(data)
        }
      },
      fail: (err) => {
        Taro.showToast({
          title: err.errMsg ?? '请求错误',
          icon: 'error',
          duration: 2000
        })
        reject(err)
      }
    })
  })

interface RequestOptions {
  url: string
  method: 'GET' | 'POST' | 'DELETE'
  data?: any
}

interface Response<T = any> {
  msg: string
  success: boolean
  data: T
}
