# demo-front

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


## 1.路径说明


- [后端管理类vue](src/view/admin)

- [门户类vue](src/view/front)

- [前后端axios接口定义](src/service)

- [页面路由](src/router/index.js)

- [页面通用类vue组件](src/components)

- [前端配置文件](static/config)

- [资源文件](static/images)

- [公用工具](utils)

- [模块依赖](package.json)


```json
'src/view/admin': 后端管理类vue
'src/view/front'：门户类vue
'src/service': 前后端axios接口定义，最好一个js对应一个数据库表或es索引值
'src/router': 页面路由，module文件为了初期开发方便，后期可已其他形势对路由划分模块
'src/components': 页面通用类vue组件，业务相关组件请存放至view下业务文件夹下
'static/config':前端配置文件，build后仍然可修改，提供类似profile的方式分为development与production两个环境配置文件
'static/images': 页面引入相关图表等内容
'utils': 存放公用工具js，global全局配置js，以及对axios的简单封装
'utils/ajax': 对axios做简单的封装，用于后期api接口鉴权header统一处理、异常信息的统一处理
'package.json': nodejs模块依赖

```

test user
username = admin
passowrd = 123456
