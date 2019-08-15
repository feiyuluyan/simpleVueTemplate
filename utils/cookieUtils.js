// 简单cookie操作工具类
let CookieUtil = {}


//获取cookie
CookieUtil.getCookie = function (name) {
  var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)")
  if (arr = document.cookie.match(reg))
    return (arr[2])
  else
    return null
}
 
CookieUtil.setCookie = function (c_name, value, expiredays) {
  var exdate = new Date()
  exdate.setTime(exdate.getTime() + expiredays)
  document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? '' : ';expires=' + exdate.toGMTString())
}
 
CookieUtil.delCookie = function (name) {
  var exp = new Date()
  exp.setTime(exp.getTime() - 1)
  var cval = this.getCookie(name)
  if (cval != null)
   document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString()
}

export default CookieUtil