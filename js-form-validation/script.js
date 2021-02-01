let newVariable = ''

let form = document.querySelector('#parking-form')
let formIsValid

/* https://developer.mozilla.org/en-US/docs/Web/API/Constraint_validation#validity
  "...the custom validity has to be cancelled, by invoking setCustomValidity() with an empty string value.
  We therefore do this every time the input event is raised.
  If you don't do this, and a custom validity was previously set,
  the input will register as invalid, even if it current contains a valid value on submission.""
*/
form.addEventListener('input', event => {
  event.target.setCustomValidity('')
})

form.addEventListener('submit', event => {
  event.preventDefault()
  formIsValid = false

  validateStartDate()
  validateCreditCard()
  if (formIsValid) {
    displayTotal()
  }
})


const displayTotal = () => {
   // if I have a total price, I want to show it on the page
  const total = calculateCost()
  const totalDiv = document.querySelector('#total')
  totalDiv.classList.add('cost')
  totalDiv.innerHTML = `<p>Total cost: $${total}.00</p>`
}

const validateCreditCard = () => {
  console.log('validateCreditCard called')
  const cardNum = document.querySelector('#credit-card')
  console.log(cardNum.value)
  if (validateCardNumber(cardNum.value)) {
    cardNum.setCustomValidity('')
  } else {
    formIsValid = false
    cardNum.setCustomValidity('Card number is invalid')
  }
}

const validateStartDate = () => {
  console.log('validateStartDate called')
  const dateInputField = document.querySelector('#start-date')
  validateFutureDate(dateInputField)
}

const validateExpirationDate = () => {
  console.log('validateStartDate called')
  const expInputField = document.querySelector('#expiration')
  // TODO: reformat the input value so that the Date object can handle it
  // (Currently this code isn't doing all it needs to do!)
  validateFutureDate(expInputField)
}

/* helper functions */

function validateCardNumber (number) {
  console.log('validateCardNumber called')
  var regex = new RegExp('^[0-9]{16}$')
  if (!regex.test(number)) return false

  return luhnCheck(number)
}

function luhnCheck (val) {
  var sum = 0
  for (var i = 0; i < val.length; i++) {
    var intVal = parseInt(val.substr(i, 1))
    if (i % 2 === 0) {
      intVal *= 2
      if (intVal > 9) {
        intVal = 1 + (intVal % 10)
      }
    }
    sum += intVal
  }
  return sum % 10 === 0
}

function validateFutureDate(input) {
  const startDate = new Date(input.value)
  const today = new Date()
  if (startDate >= today) {
    input.setCustomValidity('')
  } else {
    formIsValid = false
    input.setCustomValidity('Date must be in the future.')
  }
}

const calculateCost = () => {
  let numDays = parseInt(document.querySelector('#days').value, 10)
  console.log(numDays)
  let days = []
  let day = new Date()

  for (let i = 1; i <= numDays; i++) {
    day = new Date(day.setDate(day.getDate() + 1))
    days.push(day.getDay())
  }

  return days
    .map(day => (day > 0 && day < 6 ? 5 : 7))
    .reduce((total, price) => {
      return (total += price)
    }, 0)
}
