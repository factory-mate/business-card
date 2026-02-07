import type { FileInfo } from './files'
import type { Page, PageDto } from './page'
import { request } from './request'

export interface ViewVo {
  UID?: string
  cUserID?: string
  cUserName?: string
  cUserPost?: string
  cViewName?: string
  cViewPost?: string
  dCreateTime?: string
  ViewPicInfo?: FileInfo
  UserPicInfo?: FileInfo
}

interface ViewAddDto {
  cUserId: string
  cViewId: string
}

const API_PREFIX = '/api/FM_View'

export const ViewAPI = {
  add: (data: ViewAddDto) =>
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
    request<Page<ViewVo>>({
      url: `${API_PREFIX}/GetForPage`,
      method: 'POST',
      data
    })
}
