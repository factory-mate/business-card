import Taro from '@tarojs/taro'

import { request } from './request'

const API_PREFIX = '/api/sys_File'

export const FilesAPI = {
  getById: (id: string) =>
    request({
      url: `${API_PREFIX}/GetById`,
      method: 'GET',
      data: {
        val: id
      }
    }),
  add: (data: { filePath: string; fileType: string }) =>
    Taro.uploadFile({
      url: `${API_PREFIX}/Add`,
      filePath: data.filePath,
      name: 'file',
      formData: {
        cFileType: data.fileType
      },
      header: {
        authorization: `Bearer ${Taro.getStorageSync('token')}`
      },
      success: () => {}
    })
}
