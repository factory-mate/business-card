import Taro from '@tarojs/taro'
import type { File } from 'taro-ui/types/image-picker'

import { API_DOMAIN_PREFIX } from './request'

const API_PREFIX = '/api/sys_File'

export const FilesAPI = {
  upload: (data: UploadFileDto): Promise<UploadFileVo> =>
    new Promise((resolve, reject) => {
      Taro.uploadFile({
        url: `${API_DOMAIN_PREFIX}${API_PREFIX}/Add`,
        filePath: data.file.url,
        name: 'cfile',
        formData: {
          cFileType: data.fileType
        },
        success: (res) => {
          resolve(JSON.parse(res.data).data)
        },
        fail: (err) => {
          Taro.showToast({ title: '文件上传失败', icon: 'error', duration: 2000 })
          reject(err)
        }
      })
    })
}

export enum FileType {
  QRCODE = '1',
  INTRODUCTION = '2',
  PRODUCTION = '3'
}

interface UploadFileDto {
  file: File
  fileType?: FileType
}

interface UploadFileVo {
  UID: string
}
