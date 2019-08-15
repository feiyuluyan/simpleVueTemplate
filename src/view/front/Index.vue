<template>
  <div class='index-page'>
    <!-- 页面主体区域 -->
    <div class='content-area'>
      <router-view/>
    </div>
  </div>
</template>
<script>
export default {
  name: 'IndexPage',
  data () {
    return {
      resultList: []
    }
  },
  methods: {
    TabChange (valArray) {
      // 路由更新
    }
  }
}
</script>
<style lang="scss" scoped>
// 主页背景图片
.index-page {
  width: 100%;
  margin: 0 auto;
  height: auto;
  display: block;
  overflow: hidden;
  // 标题及tab页面
  .content-area {
    height: auto;
    margin: auto;
    position: relative;
  }
}
</style>
