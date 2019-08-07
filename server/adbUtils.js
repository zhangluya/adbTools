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
      execSync('adb shell settings delete global global_http_proxy')
      execSync('adb shell settings delete global global_http_proxy_host')
      execSync('adb shell settings delete global global_http_proxy_port')
      execSync('adb reboot')
    } catch(ex) {

    }
  },
  showProxy: function() {
    try {
      const proxy = execSync('adb shell settings get global global_http_proxy').toString()
      const host = execSync('adb shell settings get global global_http_proxy_host').toString()
      const port = execSync('adb shell settings get global global_http_proxy_port').toString()
      return { proxy, host, port }
    } catch (ex) {
      console.error(ex)
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
      return execSync('adb shell dumpsys activity top | grep ACTIVITY').toString()
    } catch (ex) {

    }
  }
}
