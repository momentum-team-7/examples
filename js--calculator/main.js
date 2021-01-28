function addToOutput (str) {
  console.log('Inside addToOutput Function: ', str)
  const display = document.querySelector('#display')
  display.innerText += str
  console.log(display.innerText)
}

function clearOutput () {
  document.querySelector('#display').innerText = ''
}

function calculateCurrentOutput () {
  const display = document.querySelector('#display')
  return eval(display.innerText)
}

function setupNumberButtons () {
  document.querySelectorAll('.number').forEach(function (element) {
    element.addEventListener('click', function (event) {
      console.log(
        'Inside event listener, event.target.innerText is: ',
        event.target.innerText
      )
      addToOutput(event.target.innerText)
    })
  })
}

function setupOperatorButtons () {
  document.querySelectorAll('.operator').forEach(function (element) {
    element.addEventListener('click', function (event) {
      addToOutput(event.target.innerText)
    })
  })
}

function setupClearButton () {
  document.querySelector('#clear').addEventListener('click', function (event) {
    clearOutput()
  })
}

function setupDecimalButton () {
  document
    .querySelector('#decimal')
    .addEventListener('click', function (event) {
      addToOutput('.')
    })
}

function setupEqualsButton () {
  document
    .querySelector('#operator-equals')
    .addEventListener('click', function (event) {
      const result = calculateCurrentOutput()
      clearOutput()
      addToOutput(result)
    })
}

function initializeCalculator () {
  setupNumberButtons()
  setupOperatorButtons()
  setupClearButton()
  setupDecimalButton()
  setupEqualsButton()
}

initializeCalculator()
