const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return month + '月' + formatNumber(day) + '日 ' + formatNumber(hour) + ':' + formatNumber(minute)
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const uuid = () => {
   return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8)
      return v.toString(16)
   })
}

module.exports = {
  formatTime: formatTime,
  formatNumber: formatNumber,
  uuid: uuid
}