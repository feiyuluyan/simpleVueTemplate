import Global from 'Utils/global'
import axios from 'Utils/ajax'

export const login = (params) => {
  return axios.ajax(Global.getContextPath() + '/auth/login', 'post', params)
}
