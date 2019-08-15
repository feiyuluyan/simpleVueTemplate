<template>
  <div class='content-column'>
    <div class = 'result'>
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item name="index" v-for="(item,index) in dataList" :key="index">
          <template slot="title">
            <span>{{item.columnName}}</span>
          </template>
          <span class="data-value">暂无内容</span>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>
<script>
import {getList} from '@/service/column'
import Global from 'Utils/global'
export default {
  name: 'column',
  data () {
    return {
      activeNames: ['1'],
      dataList: [],
      isLogin: false
    }
  },
  methods: {
    handleChange (val) {
      console.log(val)
    },
    getList () {
      // let param = {
      let userId = Global.getUserInfo().userId
      // }
      getList(userId).then(res => {
        if (res.code === 200) {
          console.log(res)
          this.dataList = res.data
        } else {
          alert('查询失败')
        }
      }).catch(err => {
        alert('查询失败' + err)
      })
    }
  },
  mounted () {
  },
  created () {
    this.getList()
  }
}
</script>
<style lang="scss" scoped>
.content-column {
  padding: 150px 0;
  width: 100%;
  min-height: 800px;
  margin: 0 auto;
  height: auto;
  background-color: darkcyan;
  display: block;
  overflow: hidden;
  .result {
    text-align: left;
    margin: 0 20px;
    background-color: coral;
    span {
      padding: 0 20px;
    }
    .data-value {
      background-color:darkgrey;
      width: 100%;
    }
  }
}
</style>

<style lang="scss">
.el-collapse-item__content {
  background-color:darkgrey;
}
</style>
