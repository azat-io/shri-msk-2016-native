const modal = document.querySelector('.modal')
const openModal = document.querySelector('.content__button')
const setButton = document.querySelector('.modal__form_button')
const closeModal = document.querySelector('.modal__overlay_close-button')
const formInput = document.querySelector('.modal__form_input')

openModal.addEventListener('click', function () {
  modal.style.visibility = 'visible'
})

setButton.addEventListener('click', function () {
  if (formInput.value !== '') {
    modal.style.visibility = 'hidden'
  }
})

closeModal.addEventListener('click', function () {
  modal.style.visibility = 'hidden'
})
