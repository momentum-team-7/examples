/* globals fetch */

// I am putting this in global scope so I can reference it again,
const url = 'https://api.github.com/orgs/momentum-team-7'

const rootElement = document.querySelector('.container')

// here is what we did in class:
// fetch('https://api.github.com/orgs/momentum-team-7/repos')
//   .then(response => response.json())
//   .then(data => {
//     const info = data[0].name
//     document.querySelector('.container').innerHTML = `<p>${info}</p>`
//   })

// Notice that the fetch request is happening RIGHT AWAY when this file is loaded in the browser.
// But you could also use fetch inside of an event listener callback,
// so that the request goes out when some triggering event occurs.

// Here is a more complex example:
fetch(url)
  // fetch will return a JS promise as a response
  // to access the data returned when the promise resolves, we use the .then() method
  // to transform the data to json, we have to call the .json() method in the .then() callback
  .then(res => res.json()) // arrow function syntax lets me do this in one line without an explicit `return` keyword
  // we chain another .then() because the one before returns a promise
  // we do this so we can access the data from the response
  .then(data => {
    // NOW in this second .then() callback, we have json-formatted data we can use!
    // it's a good idea to console.log the data so you can see it!
    console.log(data)
    let h2 = document.createElement('h2')
    h2.innerText = data.name
    rootElement.appendChild(h2)
    // I want make another request to get the repos for this org
    // So I'm using data from this JSON response in order to construct another fetch request
    // On this next line, I return the url I need for that request
    return data.repos_url
  })
  // The argument to the next .then method is the repos_url
  // I immediately use that to make the next fetch request
  // I can return the value of calling the fetch method (remember, arrow syntax has an implicit return)
  .then(reposUrl => fetch(reposUrl))
  // because that return value is a promise, I can chain another .then on top of that
  // now I'm doing the same thing as above, making sure I have json to work with
  .then(response => response.json())
  // then chaining another .then() to get the json data (because .json() also returns a promise)
  .then(data => {
    let repoList = document.createElement('ul')
    // These classes are coming from Tachyons CSS
    repoList.classList.add(
      'list',
      'pl0',
      'ml0',
      'center',
      'mw6',
      'ba',
      'b--green',
      'br3'
    )
    rootElement.appendChild(repoList)
    // Loop over the list of repos in that json data
    for (let repo of data) {
      const listItem = document.createElement('li')
      listItem.textContent = repo.full_name
      listItem.classList.add('ph3', 'pv2', 'bb', 'b--green')
      repoList.appendChild(listItem)
    }
  })
