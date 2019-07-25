const { execSync } = require('child_process')

module.exports = {
  checkDevices: function() {
    try {
      const result = execSync('adb devices')
      const arrays = result.toString().split('\n').filter(it => it.length > 0)
      return arrays.length > 1
    } catch(ex) {

    }
    return false
  },
  setHttpProxy: function(ip, port) {
    try {
      const result = execSync(`adb shell settings put global http_proxy ${ip}:${port}`)
    } catch(ex) {

    }

  },
  resetHttpProxy: function() {
    try {
      execSync('adb shell settings delete global http_proxy')
      execSync('adb shell settings delete global global_http_proxy_host')
      execSync('adb shell settings delete global global_http_proxy_port')
      execSync('adb reboot')
    } catch(ex) {

    }
  },
  openBrowser: function(url) {
    try {
      execSync(`adb shell am start -a android.intent.action.VIEW -d ${url}`)
    } catch (ex) {

    }
  },
  showTopActivity: function() {
    try {
      return execSync('adb shell dumpsys activity | grep "mFocusedActivity"').toString()
    } catch (ex) {

    }
  }
}
