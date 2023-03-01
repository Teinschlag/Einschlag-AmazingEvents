const card_pastEvents = document.getElementById('card_pastEvents')

let fragment = document.createDocumentFragment()

const fechaHoy = Date.parse(data.currentDate);

for(let element of data.events){
    
    let proximasFechas = Date.parse(element.date)

    if(proximasFechas < fechaHoy){
    let div = document.createElement('div')
        div.classList.add("card")
        div.style.width = "18rem"
        div.innerHTML = `<img src="${element.image}" class="card-img-top" style="height: 150px" alt="Cinema">
    <div class="card-body d-flex flex-column justify-content-between">
      <h5 class="card-title">${element.name}</h5>
      <p class="card-text">${element.description}</p>
      <p>Price: ${element.price} u$d</p>
      <a href="./details.html" class="btn btn-dark nav-item p-2 me-1 ms-1 mb-1"
        style="color: #d63384; background-color: black">More</a>
    </div>`
    fragment.appendChild(div)
    }
}
card_pastEvents.appendChild(fragment)


const check_category = document.getElementById('check_category')

function checkbox(array) {

    let arrayCat = []

    for (let elemento of array){
        let categories = elemento.category
        console.log(categories)
        arrayCat.push(categories)
    }

    let result = arrayCat.filter((item, index) => {
        return arrayCat.indexOf(item) === index;
    })


let fragmentCheck = document.createDocumentFragment()

 for(let cat of result){
     let div = document.createElement('div')
     div.className="form-check form-check-inline"
     div.style.color="#"
     div.innerHTML = `<input class="form-check-input" type="checkbox" id=${cat.split(' ').join('_')} value=${cat}>${cat}
     <label class="form-check-label" style="color: #d63384" for=${cat.split(' ').join('_')}></label>`
         fragmentCheck.appendChild(div)
 }
 return fragmentCheck
 }

check_category.appendChild(checkbox(data.events))