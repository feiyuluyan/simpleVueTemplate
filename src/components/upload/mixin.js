// import Global from 'Utils/global'

export const mixin = {
  data () {
    return {
      accepts: '',
      fileTypeText: '',
      maxFileSize: 0
    }
  },
  mounted () {
    this.maxFileSize = 500 * 1024 * 1024
  },
  methods: {
    filesTypeValidate (fileList) {
      for (let file of fileList) {
        let suffix = file.name.substring(file.name.lastIndexOf('.'))
        if (this.accepts !== '' && this.accepts.toUpperCase().indexOf(suffix.toUpperCase()) < 0) {
          window.message('只能上传' + this.fileTypeText + '类型的文件')
          return false
        }
        if (file.size > this.maxFileSize) {
          window.message('上传文件大小不能超过' + this.maxFileSize / 1024 / 1024 + 'MB')
          return false
        }
      }
      return true
    }
  }
}
