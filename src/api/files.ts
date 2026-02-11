import Taro from '@tarojs/taro'
import type { File } from 'taro-ui/types/image-picker'

import { API_DOMAIN_PREFIX } from './request'

export interface FileInfo {
  UID?: string
  cFilePath?: string
  cFileReName?: string
  cFileName?: string
  cFileSuffix?: string
}

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
          const parsedData = JSON.parse(res.data)
          if (parsedData.success) {
            resolve(parsedData.data)
          } else {
            Taro.showToast({
              title: '文件服务器错误',
              icon: 'none',
              duration: 2000
            })
            reject(new Error('文件服务器错误'))
          }
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
  PRODUCTION = '3',
  AVATAR = '4'
}

interface UploadFileDto {
  file: File
  fileType?: FileType
}

interface UploadFileVo {
  UID: string
}
