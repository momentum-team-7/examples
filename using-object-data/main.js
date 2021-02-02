const container = document.querySelector(".menu-items")

// just get the first thing, just for starters to make it easier to reason about
let menuItem = menuItems[0]

console.log("menuItem title is ", menuItem.title)
console.log("menuItem imgsrc is ", menuItem.imgUrl)

// here is what we did in class
// loop through all the menu items and insert them into the DOM
for (let item of menuItems){
  console.log(item.title)
  // create a DOM element for menu title
  const menuHeader = document.createElement("li")
  menuHeader.innerText = item.title
  // insert it into the DOM
  container.appendChild(menuHeader)
  // create a DOM element for menu image
  const menuImg = document.createElement("img")
  // set src attribute
  menuImg.src = item.imgUrl
  // insert it into the DOM
  container.appendChild(menuImg)
}

// what if we wanted to create a div element around
// the h3 and img elements, to create a card-like element, like with dog adoption
// (this would replace the above code, so comment that out if you uncomment these lines
  // for (let item of menuItems) {
  //   const menuItemCard = document.createElement('div')
  //   menuItemCard.classList.add('menu-item')
  //   const menuItemTitle = document.createElement('h3')
  //   const text = document.createTextNode(item.title)
  //   menuItemTitle.appendChild(text)
  //   menuItemCard.appendChild(menuItemTitle)
  //   const menuItemImg = document.createElement('img')
  //   menuItemImg.src = item.imgUrl
  //   menuItemCard.appendChild(menuItemImg)
  //   container.appendChild(menuItemCard)
  // }

// here's what it could look like if we did the same thing, wrapped in a function
function renderMenu () {
  for (let menuItem of menuItems) {
    const menuItemCard = document.createElement('div')
    menuItemCard.classList.add('menu-item')

    container.innerHTML += `<div class='menu-item'>
    <h3>${menuItem.title}</h3>
    <img src=${menuItem.imgUrl}>
</div>`
  }
}

// you'd have to call that function though
// that could look something like this:
// window.addEventListener("load", () => renderMenu())

