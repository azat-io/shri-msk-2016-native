const audio = document.querySelector('.ring__song')

let db, input, ul

document.addEventListener('deviceready', function () {
  const cordova = window.cordova

  cordova.plugins.backgroundMode.setDefaults({
    text: 'Doing heavy tasks.'
  })

  cordova.plugins.backgroundMode.enable()

  cordova.plugins.backgroundMode.onactivate = function () {
    setTimeout(function () {
      cordova.plugins.backgroundMode.configure({
        text: 'Running in background for more than 5s now.'
      })
    }, 1000)
  }
}, false)

function databaseOpen (callback) {
  const req = window.indexedDB.open('alarmDB', 1)

  req.onupgradeneeded = function (e) {
    db = e.target.result
    e.target.transaction.onerror = databaseError
    db.createObjectStore('alarm', { keyPath: 'timeStamp' })
  }

  req.onsuccess = (e) => {
    db = e.target.result
    callback()
  }
  req.onerror = databaseError
}

let alarmList = []

function alarmsFound () {
  input = document.querySelector('.modal__form_input')
  ul = document.querySelector('.content__alarm')
  document.querySelector('.modal__form').addEventListener('submit', onSubmit)
  databaseAlarmsGet(renderAllAlarms)

  databaseAlarmsGet(function (alarm) {
    for (var i = 0; i < alarm.length; i++) {
      alarmList.push(parseInt(alarm[i].alarmTime.replace(':', '')))
    }
  })
}

databaseOpen(alarmsFound)

let currentTime

function checkTime () {
  const time = new Date()

  currentTime =
    (time.getHours() < 10 ? '0' : '') + time.getHours() +
    (time.getMinutes() < 10 ? '0' : '') + time.getMinutes()

  currentTime = parseInt(currentTime)
}

function checkAlarm () {
  if (alarmList.indexOf(currentTime) >= 0) {
    let ring = document.querySelector('.ring')
    ring.style.visibility = 'visible'
    audio.play()

    ring.addEventListener('click', function () {
      ring.style.visibility = 'hidden'
      audio.pause()
    })
  }
}

setInterval(function () {
  checkTime()
  checkAlarm()
}, 60 * 1000)

function renderAllAlarms (alarms) {
  var html = ''
  alarms.forEach(function (alarm) {
    html += alarmToHtml(alarm)
  })
  ul.innerHTML = html
}

function alarmToHtml (alarm) {
  return '<li class="content__alarm_elem">' + '<span>' + alarm.alarmTime + '</span>' +
  '<button>&times;</button>' + '</li>'
}

function databaseAlarmsGet (callback) {
  var transaction = db.transaction(['alarm'], 'readonly')
  var store = transaction.objectStore('alarm')

  var keyRange = window.IDBKeyRange.lowerBound(0)
  var cursorRequest = store.openCursor(keyRange)

  var data = []
  cursorRequest.onsuccess = (e) => {
    var result = e.target.result

    if (result) {
      data.push(result.value)
      result.continue()
    } else {
      callback(data)
    }
  }
}

function databaseError (e) {
  console.error('An IndexedDB error has occurred', e)
}

function onSubmit (e) {
  e.preventDefault()
  databaseAlarmsAdd(input.value, function () {
    databaseAlarmsGet(renderAllAlarms)
    input.value = ''
    alarmsFound()
  })
}

function databaseAlarmsAdd (alarmTime, callback) {
  let transaction = db.transaction(['alarm'], 'readwrite')
  let store = transaction.objectStore('alarm')
  let req = store.put({
    alarmTime: alarmTime,
    timeStamp: Date.now()
  })

  transaction.oncomplete = (e) => {
    callback()
  }
  req.onerror = databaseError
}
