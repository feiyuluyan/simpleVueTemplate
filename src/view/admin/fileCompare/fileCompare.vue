<template>
  <div class='content-column'>
    <upload-tools></upload-tools>
  </div>
</template>
<script>
import uploadTools from '@/components/uploadTools'
export default {
  name: 'column',
  components: {
    uploadTools
  },
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
  min-height: 937px;
  margin: 0 auto;
  background-color: #fff;
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
