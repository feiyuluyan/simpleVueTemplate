import Global from 'Utils/global'
import axios from 'Utils/ajax'

// formData的格式 new FormData() append('file', file) append('id', id)
export const ftpUpload = (params) => {
  return axios.fileUpload(Global.getContextPath() + '/common/upload', params)
}
