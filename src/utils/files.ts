import type { FileInfo } from '@/api'

export const checkFileUrl = (fileInfo: FileInfo = {}) => {
  const { cFilePath, cFileReName, cFileSuffix } = fileInfo
  return cFilePath && cFileReName && cFileSuffix
}

export const getFileUrl = (fileInfo: FileInfo = {}) => {
  const { cFilePath, cFileReName, cFileSuffix } = fileInfo
  return `${cFilePath}${cFileReName}${cFileSuffix}`
}
