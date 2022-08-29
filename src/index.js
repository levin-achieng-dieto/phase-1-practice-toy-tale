let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

document.addEventListener('DOMContentLoaded', (e) =>{
  e.preventDefault()
  getToys()
  fetchingToys()
});

function getToys(andys){
  let toyDiv = document.createElement('div')
  toyDiv.className = "card"
  toyDiv.innerHTML = `
  <h2>${andys.name}</h2>
  <img class="toy-avatar" src ="${andys.image}">
  <p>${andys.likes}</p>
  <button class="like-btn" id="toy_id">${andys.id}</button>`

  document.getElementById("toy-collection").append(toyDiv)
}


function fetchingToys(){
  fetch('http://localhost:3000/toys')
  .then(response => response.json())
  .then(toys => toys.forEach(toy => getToys(toy)))
}
fetchingToys()


function addingToys(addToys){
  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body:JSON.stringify(addToys)
  })
  .then(response => response.json())
  .then(toys => console.log(toys))
}




document.querySelector('.add-toy-form').addEventListener('submit', handleSubmit)

function handleSubmit(e){
  e.preventDefault()
  let toyObj = {
    name:e.target.name.value,
    image:e.target.image.value,
    likes:e.target.likes.value,
    id:e.target.id.value
  }
  getToys(toyObj)
  addingToys(toyObj)
}