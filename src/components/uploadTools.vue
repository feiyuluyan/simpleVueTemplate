<template>
<!-- 用法： <kt-upload v-model='fileList'></kt-upload> -->
<!-- fileList里的file格式为数据库里的附件格式: [{WJID,WJLX,WJMC,WJMS,SLTP,WLLJ,WYLJ,XSSX}] -->
  <div class="kt-upload-container">
    <section class="label" :style="{width: labelWidth + 'px'}">
      <div class="label-text"><span class="redstar" v-show="required">*</span>{{labelText}}</div>
      <div class="small-label-text"><slot></slot></div>
      <!-- 按钮区域 -->
      <div class="kt-upload-button-wrapper" v-show="showButton">
        <button @click="buttonClick" class="kt-button-mini-small-upload" type="button">
        </button>
        <input
        type="file" ref="file" multiple
        :accept="fileAccept"
        style="visibility: hidden; position: absolute" @change="fileSelected">
      </div>
    </section>
    <section class="list-container" :style="{width: 'calc(100% - ' + labelWidth + 'px'}">
        <section class="kt-upload-button-row">
         <span>{{acceptTip}}</span>
        </section>
      <section class="kt-upload-filelist-row">
        <!-- 文件列表区域 -->
        <div class="kt-list-item"
        v-for="(file, index) in fileList" :key="index">
          <span class="kt-item-name">
            <a :download="file.WJMC" :href="file.WLLJ">{{file.WJMC}}</a></span>
          <!-- 进度条百分比 -->
          <span class="kt-item-progress" v-if="file.uploading">
            {{file.progress}}%
          </span>
          <!-- 删除按钮 -->
          <span class="kt-button-noborder-delete" @click="fileDelete(file)" v-else-if="showButton"></span>
          <a :download="file.WJMC" :href="file.WLLJ" v-if="!showButton" style='box-sizing: border-box;'>
            <span class="kt-button-noborder-download"></span>
          </a>
          <!-- 进度条 -->
          <span class="kt-item-progress-bar" v-if="file.uploading">
            <span :style="{width: file.progress + '%'}"></span>
          </span>
        </div>
      </section>
    </section>
    <a ref='fileId' :href="href"></a>
  </div>
</template>
<script>
import { ftpUpload } from '@/service/ftpUpload.js'
import { mixin } from './upload/mixin'

export default {
  model: {
    prop: 'list',
    event: 'change'
  },
  mixins: [mixin],
  props: {
    fileAccept: {
      type: String,
      default: '.doc,.docx,.pdf',
      required: false
    },
    acceptTip: {
      type: String,
      default: '(可上传类型：.doc、.docx、.pdf)',
      required: false
    },
    list: {
      type: Array
    },
    ftpPath: {
      type: String,
      required: false,
      default: 'EQ_DEFAULT'
    },
    // 是否展示上传图标这一行，默认显示
    showButton: {
      type: Boolean,
      required: false,
      default: true
    },
    // 后台是否需要将doc转为pdf，默认转换
    needConvert: {
      type: Boolean,
      required: false,
      default: true
    },
    labelWidth: {
      type: String,
      required: false,
      default: '110'
    },
    labelText: {
      type: String,
      required: false,
      default: '附件信息:'
    },
    fileTypeLimitedText: {
      type: String,
      required: false,
      default: ''
    },
    required: {
      type: Boolean,
      required: false,
      default: false
    },
    handleBeforeUpload: {
      type: Function,
      required: false,
      default: (fileList) => { console.log(fileList) }
    }
  },
  data () {
    return {
      fileList: [],
      maxFileSize: 0,
      href: ''
    }
  },
  mounted () {
    this.fileList = JSON.parse(JSON.stringify(this.list || []))
    this.accepts = this.fileAccept
    this.fileTypeText = this.fileTypeLimitedText || this.accepts
  },
  methods: {
    buttonClick () {
      this.$refs.file.click()
    },
    // 选择文件
    fileSelected (e) {
      let files = e.target.files
      if (!this.filesTypeValidate(files)) {
        this.$refs.file.value = ''
        return
      }
      this.fileUpload(files)
      this.handleBeforeUpload(files)
    },
    // 文件上传
    fileUpload (files) {
      let _this = this
      let form = new FormData()
      for (let file of files) {
        form.append('file', file)
      }
      ftpUpload(form).then((res) => {
        if (res.code === 200) {
          _this.href = '/static/temp/' + res.data
          setTimeout(function () {
            _this.$refs.fileId.click()
          }, 1000)
        } else {
          window.message('解析失败')
        }
      }).catch((err) => {
        console.log(err)
        window.message('解析失败')
      })
    },
    // 添加到文件列表里
    addFileList (id, file) {
      let oneFile = {
        WJID: id,
        id: id,
        WJMC: file.name || '',
        progress: 0,
        uploading: true
      }
      this.fileList.push(oneFile)
    },
    // 进度条处理
    uploadProgress (id, progress) {
      let index = this.findFile(id)
      if (index === -1) return
      this.fileList[index].progress = progress
    },
    // 上传成功
    uploadSuccess (id, data) {
      let index = this.findFile(id)
      data.file.XSSX = Number(index) + 1
      this.$set(this.fileList, index, data.file)
      if (this.list == null) {
        let list = []
        list.push(data.file)
        this.$emit('change', list)
      } else {
        this.list.push(data.file)
      }
    },
    // 删除文件
    fileDelete (file, e) {
      this.$ktConfirm('是否删除该文件？')
        .then(() => {
          let index = this.findFile(file.WJID)
          this.fileList.splice(index, 1)
          this.list.splice(index, 1)
        })
    },
    // 根据id在fileList里找文件，返回index，找不到返回-1
    findFile (id) {
      for (let index in this.fileList) {
        if (this.fileList[index].WJID === id) {
          return index
        }
      }
      return -1
    }
  },
  watch: {
    list (newVal, oldVal) {
      this.fileList = JSON.parse(JSON.stringify(this.list || []))
    }
  }
}
</script>
<style lang="scss" scoped>
@mixin flex {
  display: flex;
  align-items: center;
}
.kt-upload-container {
  width: 100%;
  float: left;
  .label {
    float: left;
    font-size: 16px;
    color: #333333;
    text-align: right;
    box-sizing: border-box;
    padding-right: 12px;
    .label-text {
      height: 40px;
      line-height: 40px;
      font-family: MicrosoftYahei;
      .redstar {
        color: red;
        margin-right: 4px;
      }
    }
    .small-label-text {
      font-size: 12px;
      margin-top: -10px;
      margin-bottom: 5px;
    }
    .kt-upload-button-wrapper {
      >>> button {
        margin-right: 3px;
      }
    }
  }
  .list-container {
    float: left;
    margin-bottom: 20px;
    .kt-upload-button-row {
      width: 100%;
      height: 40px;
      line-height: 40px;
      text-align: left;
      float: left;
      >>> span {
        float: left;
        color: #b2b2b2;
        font-size: 14px;
      }
    }
    .kt-upload-filelist-row {
      width: 100%;
      float: left;
      .kt-list-item {
        float: left;
        width: 100%;
        position: relative;
        height: 40px;
        color: #333333;
        font-size: 16px;
        @include flex;
        border-bottom: 1px dashed #c5c5c5;
        justify-content: space-between;
        .kt-item-name {
          cursor: pointer;
          &:hover {
            color: rgba(29, 148, 209, 1);
            text-decoration: underline;
          }
        }
        .kt-item-progress {
          color: rgb(103, 194, 58);
        }
        .kt-item-delete {
          cursor: pointer;
          color: #de4029;
          line-height: 1.5;
          @include flex;
          margin-right: 3px;
          &:hover {
            text-decoration: underline;
          }
        }
        .kt-item-progress-bar {
          position: absolute;
          width: 100%;
          bottom: 0;
          left: 0;
          height: 5px;
          >>> span {
            float: left;
            height: 100%;
            background-color: rgb(103, 194, 58);
            transition: width 0.1s;
            border-radius: 2px;
          }
        }
      }
    }
  }
}
</style>
