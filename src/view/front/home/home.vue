<template>
  <div class='content-area'>
  <div class='content-detail'>
      <el-col class='login-col'>
        <!-- 用户登录区域 -->
        <div :showTitle='false'>
          <div slot='content' class='common-container bg-banner' v-loading="loading">
            <el-form :model="models" :rules="rules" ref="loginForm">
              <div  class = "login-name"><span>账号：</span></div>
              <el-form-item prop='username'>
                <i class='user-input'></i>
                <input class='custom-input' v-model='models.username' placeholder="请输入登录账号"/>
              </el-form-item>
              <input type="text" style="display: none;">
              <input type="password" style="display: none;">
              <div class = "login-name"><span >密码：</span></div>
              <el-form-item prop='password'>
                <i class='password-input'></i>
                <input class='custom-input' v-model='models.password' type='password' placeholder="请输入登录密码" @keyup.enter="signHandler"/>
              </el-form-item>
            </el-form>
            <button class='front-button login-btn' @click='signHandler'>
              <span class='btn-text'>登</span><span>录</span>
            </button>
            <el-checkbox v-model="rememberMe" style='float:left'>记住账号</el-checkbox>
          </div>
        </div>
      </el-col>
  </div>
  </div>
</template>
<script>
import Global from 'Utils/global'
import {login} from '@/service/auth'
export default {
  name: 'home',
  data () {
    return {
      rememberMe: false,
      models: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          {required: true, message: '请输入登录账号', trigger: 'blur'}
        ],
        password: [{required: true, message: '请输入登录密码', trigger: 'blur'}]
      },
      loading: false,
      isLogin: false,
      currImageBanner: 1
    }
  },
  methods: {
    signHandler () {
      let _this = this
      let params = {
        username: _this.models.username,
        password: _this.models.password
      }
      login(params).then(res => {
        if (res.code === 200) {
          _this.isLogin = true
          Global.setJwtToken(res.data)
          let user = {
            userId: _this.models.username
          }
          Global.setUserInfo(user)
          alert('登录成功')
          _this.$router.push('/admin/fileCompare')
        } else {
          Global.clearUserInfo()
          Global.clearJwtToken()
          alert('登陆失败！')
        }
      }).catch(error => {
        console.log(error)
        alert('登陆失败！')
        Global.clearUserInfo()
        Global.clearJwtToken()
      })
    },
    logOut () {
    }
  },
  mounted () {
    // todo，调用后台api接口完成token是否过期
    if (Global.getJwtToken() !== '') {
      // this.$router.push('/admin/userInfo')
      const { href } = this.$router.resolve({
        path: '/admin/fileCompare'
      })
      window.open(href, '_blank')
    }
  }
}
</script>
<style lang="scss" scoped>
.content-row {
  float: left;
  width: 450px;
  height: auto;
}
// 门户主体内容区域
.content-area {
  width: 450px;
  min-height: 400px;
  height: auto;
  position: relative;
  .login-banner {
    width: 100%;
    height: 189px;
    margin-bottom: 16px;
  }
  .custom-input {
    outline: none;
    width: 100%;
    height: 46px;
    background: rgba(40, 120, 198, 0);
    border: 1px solid rgba(41, 108, 174, 1);
    box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.19) inset;
    border-radius: 4px;
    padding-left: 40px;
    padding-right: 10px;
    box-sizing: border-box;
    float: left;
    position: relative;
  }
  // .user-input::before {
  //   content: "";
  //   height: 18px;
  //   width: 18px;
  //   position: absolute;
  //   top: 14px;
  //   left: 8px;
  //   background: url(/static/images/front/username.png);
  //   background-repeat: no-repeat;
  //   background-size: contain;
  // }
  // .password-input::before {
  //   content: "";
  //   height: 18px;
  //   width: 18px;
  //   position: absolute;
  //   top: 14px;
  //   left: 8px;
  //   background: url(/static/images/front/password.png);
  //   background-repeat: no-repeat;
  //   background-size: contain;
  // }
  .front-button {
    width: 100%;
    height: 46px;
    float: left;
    background-size: contain;
    background-repeat: no-repeat;
    outline: none;
    border: none;
  }
  .login-btn {
    margin-top: 20px;
    border-radius: 5px;
    background-color: rgba(41, 108, 174, 1);
    &:hover {
      background-color: orange;
    }
    span {
      font-size: 20px;
      margin-right: 40px;
      margin-left: 40px;
      color: #fff;
    }
  }
  .user-btn {
    background-image: url(/static/images/front/home-page/user-btn-n.png);
    &:hover {
      background-image: url(/static/images/front/home-page/user-btn-h.png);
    }
  }
  .logout-btn {
    background-image: url(/static/images/front/home-page/logout-btn-n.png);
    &:hover {
      background-image: url(/static/images/front/home-page/logout-btn-h.png);
    }
  }
  .user-center {
    position: relative;
    padding-left: 35px;
  }
  // .user-center::before {
  //   content: "";
  //   width: 22px;
  //   height: 22px;
  //   position: absolute;
  //   top: 10px;
  //   left: 45px;
  //   background: url(/static/images/front/user-btn.png);
  //   background-repeat: no-repeat;
  //   background-size: contain;
  // }
  .content-detail {
    width: 100%;
    position: relative;
    padding-left: 15px;
    padding-right: 15px;
    padding-bottom: 10px;
    padding-top: 20px;
    box-sizing: border-box;
    height: 450px;
    .login-col {
      background-color: #fff;
      text-align: center;
      margin-top: 150px;
      height: 360px;
      padding: 20px;
      width: 100%;
    }
  }
  .login-name {
    text-align: left;
    span {
      font-size: 16px;
      line-height: 40px;
      padding-top: 4px;
    }
  }
}
</style>
<style>
/* 重置登錄輸入框margin */
.bg-banner .el-form-item {
  margin-bottom: 20px;
}
.bg-banner .el-checkbox {
  margin: 20px 0;
}
.bg-banner .el-checkbox__label {
  color: #8b8b8b;
}
/* .gddt .content-panel .header .title i{
  margin-top: 8px !important;
} */
.bg-banner .el-checkbox:hover .el-checkbox__label {
  color: #000000;
}
.bg-banner .el-checkbox:hover .el-checkbox__inner {
  border-color: #409eff;
}
</style>
