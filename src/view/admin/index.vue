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
  name: 'AdminIndex',
  data () {
    return {
      resultList: []
    }
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
// 主页背景图片
.index-page {
  width: 1200px;
  margin: 0 auto;
  height: auto;
  display: block;
  overflow: hidden;
  // 标题及tab页面
  .title-area {
    width: 100%;
    height: 238px;
    float: left;
    position: relative;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    .title-text {
      width: 100%;
      height: 180px;
      float: left;
      position: relative;
      box-sizing: border-box;
      font-size: 40px;
      color: #fbfffc;
      line-height: 146px;
      text-align: left;
      font-weight: 500;
      padding-top: 66px;
      padding-left: 25px;
      background: linear-gradient(
        0deg,
        rgba(181, 179, 177, 1) 0%,
        rgba(193, 191, 187, 1) 4.7119140625%,
        rgba(218, 216, 215, 1) 11.6455078125%,
        rgba(245, 244, 244, 1) 24.658203125%,
        rgba(255, 255, 255, 1) 36.8408203125%,
        rgba(248, 247, 247, 1) 49.5849609375%,
        rgba(193, 189, 184, 1) 56.5185546875%,
        rgba(237, 234, 226, 1) 100%
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-family: MicrosoftYaHei;
    }
    .title-tab {
      width: auto;
      height: calc(100% - 184px);
      box-sizing: border-box;
      position: absolute;
      bottom: 10px;
    }
  }
  .content-area {
    width: 100%;
    height: auto;
    float: left;
    position: relative;
    background: #ffffff;
  }
}
</style>
