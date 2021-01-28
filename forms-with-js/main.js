const form = document.querySelector('#registration-form')
let formIsValid

window.addEventListener('submit', event => {
  event.preventDefault()
})

form.addEventListener('click', validate)

function validate (event) {
  removeValidMessage()
  formIsValid = true

  confirmPasswordMatch()
  // TODO: add more validation functions here
  // If everything is valid, we want to show a message at the bottom
  showValidMessage()
}

function confirmPasswordMatch () {
  // grab the password input
  const password = document.querySelector('#password-input')
  // grab the confirm password input
  const confirmPwd = document.querySelector('#confirm-password')

  // compare their values to see if they match
  if (password.value !== confirmPwd.value) {
    confirmPwd.setCustomValidity('HEY Your passwords must match')
    markFormAsInvalid()
  } else {
    confirmPwd.setCustomValidity('')
  }
}

function showValidMessage () {
  if (formIsValid && form.checkValidity()) {
    const validMsgEl = document.createElement('h2')
    validMsgEl.id = 'valid-message'
    const validMsgText = document.createTextNode('This form is valid!')
    validMsgEl.appendChild(validMsgText)
    document.querySelector('main').appendChild(validMsgEl)
  }
}

function removeValidMessage () {
  const validMsg = document.querySelector('#valid-message')
  if (validMsg) {
    validMsg.remove()
  }
}

function markFormAsInvalid () {
  formIsValid = false
}
