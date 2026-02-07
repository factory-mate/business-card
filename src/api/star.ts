import type { FileInfo } from './files'
import type { Page, PageDto } from './page'
import { request } from './request'

export interface StarVo {
  UID?: string
  cCollectID?: string
  cCollectName?: string
  cCollectPost?: string
  dCreateTime?: string
  CollectPicInfo?: FileInfo
}

interface StarAddDto {
  cUserId: string
  cCollectId: string
}

const API_PREFIX = '/api/FM_Collect'

export const StarAPI = {
  add: (data: StarAddDto) =>
    request({
      url: `${API_PREFIX}/Add`,
      method: 'POST',
      data
    }),
  del: (id: string) =>
    request({
      url: `${API_PREFIX}/Del`,
      method: 'DELETE',
      data: [id]
    }),
  getForPage: (data: PageDto) =>
    request<Page<StarVo>>({
      url: `${API_PREFIX}/GetForPage`,
      method: 'POST',
      data
    })
}
