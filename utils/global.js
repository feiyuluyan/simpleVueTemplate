import CookieUtil from './cookieUtils'
import Constant from './Constant'
import axios from './ajax'

let global = {}

let CONTEXT_PATH = ''

let userInfo = ''

/**
 * set contextPath for axios `ajax`
 */
global.setContextPath = function (value) {
  CONTEXT_PATH = value
}
global.getContextPath = function () {
  return CONTEXT_PATH
}


/**
 * set jwtToken for api鉴权
 */
global.getJwtToken = function () {
  let token = CookieUtil.getCookie(Constant.JWT_TOKEN)
  if (token === undefined || token === null || token === 'null' || token === '' || token.length <= 0) {
    token = ''
  }
  return token
}

/**
 * save&update jwtToken
 */
global.setJwtToken = function (token) {
  let expireTime = Constant.EXPIRE_TIME
  global.expireTime = expireTime
  localStorage.setItem(Constant.EXPIRE_TIME, expireTime)
  CookieUtil.setCookie(Constant.JWT_TOKEN, token, expireTime)
}

/**
 * set loginin user info.
 */
global.setUserInfo = function (info) {
  let expireTime = localStorage.getItem(Constant.EXPIRE_TIME)
  CookieUtil.setCookie(Constant.USER_INFO, JSON.stringify(info), expireTime ? parseInt(expireTime) : 0)
}

/**
 * get loginin user info .
 */
global.getUserInfo = function () {
  let userInfoStr = CookieUtil.getCookie(Constant.USER_INFO)
  if (userInfoStr === undefined || userInfoStr === null || userInfoStr === 'null' || userInfoStr === '' || userInfoStr.length <= 0) {
    return ''
  }
  let user = JSON.parse(unescape(userInfoStr))
  return user
}

global.getEnv = function () {
  let env = 'development'
  if (process.env.NODE_ENV) {
    env = process.env.NODE_ENV
  }
  return env
}

// 初始化加载配置文件
global.init = function () {
    return new Promise((resolve, reject) => {
      let env = this.getEnv()
      axios.get(`static/config/config-${env}.json`).then((res) => {
        let params = res.data
        console.log(params)
        // CONTEXT PATH for axios.
        if (params['CONTEXT_PATH']) {
          this.setContextPath(params['CONTEXT_PATH'])
        }
        resolve(true)
      }).catch((err) => {
        console.error('global init err', err)
        reject(true)
      })
    })
  }
  export default global