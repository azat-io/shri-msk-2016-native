"use strict";function databaseOpen(e){var t=window.indexedDB.open("alarmDB",1);t.onupgradeneeded=function(e){db=e.target.result,e.target.transaction.onerror=databaseError,db.createObjectStore("alarm",{keyPath:"timeStamp"})},t.onsuccess=function(t){db=t.target.result,e()},t.onerror=databaseError}function alarmsFound(){input=document.querySelector(".modal__form_input"),ul=document.querySelector(".content__alarm"),document.body.addEventListener("submit",onSubmit),databaseAlarmsGet(renderAllAlarms),databaseAlarmsGet(function(e){for(var t=0;t<e.length;t++)alarmList.push(parseInt(e[t].alarmTime.replace(":","")))})}function checkTime(){var e=new Date;currentTime=(e.getHours()<10?"0":"")+e.getHours()+(e.getMinutes()<10?"0":"")+e.getMinutes(),currentTime=parseInt(currentTime)}function checkAlarm(){alarmList.indexOf(currentTime)>=0&&!function(){var e=document.querySelector(".ring");e.style.visibility="visible",audio.play(),e.addEventListener("click",function(){e.style.visibility="hidden",audio.pause()})}()}function renderAllAlarms(e){var t="";e.forEach(function(e){t+=alarmToHtml(e)}),ul.innerHTML=t}function alarmToHtml(e){return'<li class="content__alarm_elem"><span>'+e.alarmTime+"</span><button>&times;</button></li>"}function databaseAlarmsGet(e){var t=db.transaction(["alarm"],"readonly"),n=t.objectStore("alarm"),a=window.IDBKeyRange.lowerBound(0),r=n.openCursor(a),o=[];r.onsuccess=function(t){var n=t.target.result;n?(o.push(n.value),n["continue"]()):e(o)}}function databaseError(e){console.error("An IndexedDB error has occurred",e)}function onSubmit(e){e.preventDefault(),databaseAlarmsAdd(input.value,function(){databaseAlarmsGet(renderAllAlarms),input.value="",alarmsFound()})}function databaseAlarmsAdd(e,t){var n=db.transaction(["alarm"],"readwrite"),a=n.objectStore("alarm"),r=a.put({alarmTime:e,timeStamp:Date.now()});n.oncomplete=function(e){t()},r.onerror=databaseError}function updateTime(){var e=new Date,t=document.querySelector(".content__time");t.innerHTML=(e.getHours()<10?"0":"")+e.getHours()+":"+(e.getMinutes()<10?"0":"")+e.getMinutes()}var audio=document.querySelector(".ring__song"),db=void 0,input=void 0,ul=void 0,alarmList=[];databaseOpen(alarmsFound);var currentTime=void 0;setInterval(function(){checkTime(),checkAlarm()},6e4);var modal=document.querySelector(".modal"),openModal=document.querySelector(".content__button"),setButton=document.querySelector(".modal__form_button"),closeModal=document.querySelector(".modal__overlay_close-button");openModal.addEventListener("click",function(){modal.style.visibility="visible"}),setButton.addEventListener("click",function(){modal.style.visibility="hidden"}),closeModal.addEventListener("click",function(){modal.style.visibility="hidden"}),setInterval(updateTime,1e3);
//# sourceMappingURL=main.js.map
