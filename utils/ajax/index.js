import axios from './config'
import Global from 'Utils/global'

/**
 * 
 * 简单封装axios，用于api鉴权，token验证等处理
 *
 */
axios.ajax = function ajax (url, method, params, form = false) {
  return new Promise((resolve, reject) => {
    let config = null
    if (form) {
      config = {
        url: url,
        method: method,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
      config.transformRequest = [
        function (data) {
            let ret = ''
            for (let it in data) {
              ret +=
                encodeURIComponent(it) +
                '=' +
                encodeURIComponent(data[it]) +
                '&'
            }
            return ret
        }
      ]
    } else {
      config = {
        url: url,
        method: method,
        headers: {
            'Content-type': 'application/json;charset=utf-8'
        }
      }
      // token 验证相关
      if (Global.getJwtToken()) {
        config.headers['jwt_token'] = Global.getJwtToken()
      }
    }
    if (method && method.toLowerCase() === 'get') {
      config.params = params
    } else {
      config.data = params
    }
    // todo http request
    
    console.log('1')
    httpRequest(resolve, reject, config)
  })
}

let httpRequest = function (resolve, reject, config, isRestry) {
  axios(config)
    .then(response => {
      //  请求成功
      if (response.status === 200) {
        resolve (response.data.result ? response.data.result : response.data)
      } else {
        // 请求失败
        resolve (response.data.result ? response.data.result : response.data)
      }
    }).catch(error => {
        reject(true)
    })
}

axios.fileUpload = (url, formData) => {
  return new Promise((resolve, reject) => {
    let config = null
    config = {
      url: url,
      method: 'post',
      header: {
        'Content-Type': 'multipart/form-data'
      },
      // 上传进度，超过99就固定在99
      data: formData
    }
    if (Global.getJwtToken()) {
      config.header['jwt_token'] = Global.getJwtToken()
    }

    console.log(config)
    httpRequest(resolve, reject, config)
  })
}

export default axios
