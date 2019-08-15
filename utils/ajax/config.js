import axios from 'axios'

axios.setConfig = function (config) {
    axios.defaults.timeout = config.AJAX_TIMEOUT
    axios.defaults.withCredentials = true
}
export default axios