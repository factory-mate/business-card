import { request } from './request'

const API_PREFIX = '/api/login'

export const AuthAPI = {
  login: (data: LoginDto) =>
    request<LoginVo>({
      url: `${API_PREFIX}/LoginIn`,
      method: 'POST',
      data
    }),
  logout: (data: { UserID: string }) =>
    request({
      url: `${API_PREFIX}/LogOut`,
      method: 'GET',
      data
    }),
  refresh: (data: { cJwtToken: string }) =>
    request({
      url: `${API_PREFIX}/LoginRefresh`,
      method: 'POST',
      data
    }),
  verifyToken: () =>
    request({
      url: `${API_PREFIX}/TokenVerify`,
      method: 'GET'
    })
}

interface LoginDto {
  js_code: string
}

interface LoginVo {
  token: string
  token_user: {
    UserId: string
    UserCode: string
    UserName: string
    UserStatus: string
    UserIoc: string
    Parm01: string
    Parm02: string
    Parm03: string
  }
}
