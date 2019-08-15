import Global from 'Utils/global'
import axios from 'Utils/ajax'

export const getList = (params) => {
  return axios.ajax(Global.getContextPath() + '/column/getColumn/' + params, 'post')
}
