import Taro from '@tarojs/taro'

const API_DOMAIN_PREFIX = 'http://www.huiyoucloud.com:8089'

export const request = <T = any>(options: RequestOptions): Promise<Response<T>> =>
  new Promise((resolve, reject) => {
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
        const errorMessage = msg || errmsg?.[0]?.msg || errmsg?.[0]?.Value || errmsg || '请求错误'
        if (statusCode === 401 || statusCode === 403) {
          Taro.showToast({ title: errorMessage, icon: 'error' })
          Taro.removeStorageSync('token')
          Taro.removeStorageSync('user')
          Taro.redirectTo({ url: '/pages/login/index' })
        } else if (statusCode !== 200) {
          Taro.showToast({ title: errorMessage, icon: 'error' })
          reject(data)
        } else {
          if (!data.success) {
            Taro.showToast({ title: errorMessage, icon: 'error' })
            reject(data)
          }
          resolve(data)
        }
      },
      fail: (err) => {
        Taro.showToast({ title: err.errMsg ?? '请求错误', icon: 'error' })
        reject(err)
      }
    })
  })

interface RequestOptions {
  url: string
  method: 'GET' | 'POST'
  data?: any
}

interface Response<T = any> {
  msg: string
  success: boolean
  data: T
}