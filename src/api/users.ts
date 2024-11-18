import { request } from './request'

const API_PREFIX = '/api/sys_User'

export interface UserVo {
  cUserCode?: string
  cUserName?: string
  cPost?: string
  cDepartment?: string
  cCompany?: string
  cAddress?: string
  cUrl?: string
  cPhone?: string
  cEmail?: string
  cWetName?: string
  cCompanyIntroduce?: string
  cWetBarCodeUID?: string
  list_IntroduceUID?: string[]
  list_ProjectUID?: string[]
}

export const UsersAPI = {
  getAllInfo: (id: string) =>
    request<UserVo>({
      url: `${API_PREFIX}/GetAllInfo`,
      method: 'POST',
      data: {
        conditions: `UID = ${id}`
      }
    }),
  getById: (id: string) =>
    request<UserVo>({
      url: `${API_PREFIX}/GetById`,
      method: 'GET',
      data: {
        val: id
      }
    }),
  edit: (data: UserVo) =>
    request({
      url: `${API_PREFIX}/Edit`,
      method: 'POST',
      data
    })
}
