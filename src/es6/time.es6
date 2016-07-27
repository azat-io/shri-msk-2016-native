function updateTime () {
  const time = new Date()
  const timeSelector = document.querySelector('.content__time')

  timeSelector.innerHTML =
    (time.getHours() < 10 ? '0' : '') + time.getHours() + ':' +
    (time.getMinutes() < 10 ? '0' : '') + time.getMinutes()
}

setInterval(updateTime, 1000)
