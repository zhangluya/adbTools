
const LINE_START = 'ADB TOOLS\n'
const LINE_BOTTOM = '\n'
const LINE_TIPS = '请选择：'

const actions = ['1.设置代理', '2.取消代理','3.安装ssl证书','4.查看当前Activity', '5.已经设置的代理', '6.退出']
let result = LINE_START
actions.forEach(it => {
  const styleAddtion = it + '\n'
  result += styleAddtion;
})
result += LINE_BOTTOM
result += LINE_TIPS



module.exports = result
