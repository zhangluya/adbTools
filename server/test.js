

const interfaces = require('os').networkInterfaces()
const net = require('net')
const readline = require('readline')
const adbUtils = require('./adbUtils')
const ui = require('./ui')

let currentSocket = null
let ip = ""

function initLocalIp(){
  for (let name in interfaces) {
    const alias = interfaces[name]
    alias.forEach(it => {
      if (it.family === 'IPv4' && it.address !== '127.0.0.1' && !alias.internal) {
        ip = it.address
      }
    })
  }
  console.log(`Result: ${ip}`)
}
initLocalIp()

if (!adbUtils.checkDevices()) {
  console.error('请使用USB连接手机，并打开调试模式！')
  return
}

const SET_PROXY = '1'
const RESET_PROXY = '2'
const INSTALL_SSL = '3'
const SHOW_TOP_ACTIVITY = '4'
const SHOW_PROXY = '5'
const EXIT = '6'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

function quesition() {
  let result = ''
  rl.question(ui, answer => {
    switch (answer) {
      case SET_PROXY:
        adbUtils.setHttpProxy(ip, '8888')
        break
      case RESET_PROXY:
        adbUtils.resetHttpProxy()
        break
      case INSTALL_SSL:
        adbUtils.openBrowser('http://chls.pro/ssl')
        break
      case SHOW_TOP_ACTIVITY:
        result = adbUtils.showTopActivity()
        console.log(result)
        break
      case SHOW_PROXY:
        result = adbUtils.showProxy()
        console.log(result)
        break
      case EXIT:
        rl.close()
        process.exit(0)
        break
    }
    quesition()
  })
}
quesition();

rl.on('close', () => {
  process.exit(0)
})
