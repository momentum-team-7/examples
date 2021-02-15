/* globals fetch, moment */

const url = 'http://localhost:3000/notes/'
const form = document.querySelector('#todo-form')
const todoList = document.querySelector('#todo-list')

/* Event listeners */

form.addEventListener('submit', function (event) {
  event.preventDefault()
  const todoText = document.querySelector('#todo-text').value
  createTodo(todoText)
})

// todoList.addEventListener('click', function (event) {
//   if (event.target.classList.contains('delete')) {
//     deleteTodo(event.target)
//   }
//   if (event.target.classList.contains('edit')) {
//     editTodo(event.target)
//   }
//   if (event.target.classList.contains('update-todo')) {
//     updateTodo(event.target)
//   }
//   if (event.target.classList.contains('cancel')) {
//     hideEditControls(event.target.parentElement)
//   }
// })

/* CRUD functions */

function listTodos () {
  // fetch(url)
  //   .then(res => res.json())
  //   .then(data => {
  //     for (let todo of data) {
  //       console.log(todo.item)
  //       renderTodoItem(todo)
  //     }
  //   })

  // same as above, without arrow functions
  fetch(url)
    .then(function (response) {
      return response.json()
    })
    .then(function (data) {
      // Now I have data I can work with
      console.log(data)
      for (let todo of data) {
        console.log(todo)
        //second function called
        renderTodoItem(todo)
      }
    })
}

function createTodo (todoText) {
  fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: todoText,
      body: todoText,
      created_at: moment().format()
    })
  })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      renderTodoItem(data)
    })
}

// function deleteTodo (element) {
//   const todoId = element.parentElement.id
//   fetch(`http://localhost:3000/todos/${todoId}`, {
//     method: 'DELETE'
//   }).then(function () {
//     element.parentElement.remove()
//   })
// }

// function updateTodo (element) {
//   const todoId = element.parentElement.id
//   const todoText = document.querySelector('.edit-text')
//   fetch(`http://localhost:3000/todos/${todoId}`, {
//     method: 'PATCH',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({
//       item: todoText.value,
//       updated_at: moment().format()
//     })
//   })
//     .then(function (res) {
//       return res.json()
//     })
//     .then(function (data) {
//       console.log(data)
//       // update the item in the DOM
//       renderTodoText(element.parentElement, data)
//     })
// }

/* DOM manipulation */

function renderTodoItem (todoObj) {
  const itemEl = document.createElement('li')
  itemEl.id = todoObj.id
  itemEl.classList.add(
    'lh-copy',
    'pv3',
    'ba',
    'bl-0',
    'bt-0',
    'br-0',
    'b--dotted',
    'b--black-3'
  )
  // third function called
  renderTodoText(itemEl, todoObj)
  todoList.appendChild(itemEl)
  // fourth function called
  clearInputs()
}

function renderTodoText (todoListItem, todoObj) {
  todoListItem.innerHTML = `<span class="dib w-60">${todoObj.body}</span><i class="ml2 dark-red fas fa-times delete"></i><i class="ml3 fas fa-edit edit"></i>`
}

// function editTodo (element) {
//   showEditInput(element.parentElement)
// }

// function showEditInput (todoItem) {
//   todoItem.innerHTML = `
//       <input class="edit-text bw0 pl0 outline-0 w-60" type="text" value="${todoItem.textContent}" autofocus>
//       <button class='update-todo f6 link br-pill p1 ml1 dib white bg-green' data-note=${todoItem.id}>save</button>
//       <button class='cancel f6 link br-pill p1 ml2 dib white light-purple'>cancel</button>
//       `
//   todoItem.querySelector('input').select()
// }

// function hideEditControls (todoItem) {
//   fetch(`http://localhost:3000/todos/${todoItem.id}`)
//     .then(res => res.json())
//     .then(data => {
//       console.log(data)
//       renderTodoText(todoItem, data)
//     })
// }
//sixth function called
function clearInputs () {
  const inputs = document.querySelectorAll('input')
  for (let field of inputs) {
    field.value = ''
  }
}

// first function that is called
// calling this to populate the page with existing todos on page load
listTodos()
