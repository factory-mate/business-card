export interface PageDto extends FullPageDto {
  PageIndex: number
  PageSize: number
}

export interface FullPageDto {
  OrderByFileds: string
  Conditions: string
}

export interface Page<T> {
  pageIndex: number
  pageCount: number
  dataCount: number
  pageSize: number
  data: T[]
}
