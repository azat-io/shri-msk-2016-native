const modal = document.querySelector('.modal')
const openModal = document.querySelector('.content__button')
const setButton = document.querySelector('.modal__form_button')
const closeModal = document.querySelector('.modal__overlay_close-button')

openModal.addEventListener('click', function () {
  modal.style.visibility = 'visible'
})

setButton.addEventListener('click', function () {
  modal.style.visibility = 'hidden'
})

closeModal.addEventListener('click', function () {
  modal.style.visibility = 'hidden'
})
