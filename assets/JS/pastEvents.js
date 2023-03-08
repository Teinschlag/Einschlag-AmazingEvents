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
      <h3 class="card-title">${element.name}</h3>
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
        arrayCat.push(categories)
    }

    let result = arrayCat.filter((item, index) => {
        return arrayCat.indexOf(item) === index;
    })


let fragmentCheck = document.createDocumentFragment()

 for(let cat of result){
     let div = document.createElement('div')
     div.className="form-check form-check-inline"
     div.style.color="#d63384"
     div.innerHTML = `<input class="form-check-input" type="checkbox" id=${cat.split(' ').join('_')} value=${cat}>${cat}
     <label class="form-check-label" style="color: #d63384" for=${cat.split(' ').join('_')}></label>`
         fragmentCheck.appendChild(div)
 }
 return fragmentCheck
 }

check_category.appendChild(checkbox(data.events))

////clicks en checkboxes
check_category.addEventListener('click', imprimirPorConsola)
    
function imprimirPorConsola(e){
     console.log(e.target)
 }

 const checkboxes = document.querySelectorAll('input[type=checkbox]')

 checkboxes.forEach(checkbox => {
     checkbox.addEventListener('change', verSeleccion)
 })

 function verSeleccion(){
     let inputsChequeados= Array.from(checkboxes).filter(checkbox => checkbox.checked)
     let inputValues = inputsChequeados.map(input => input.value)
     

     let eventosCheck = data.events.filter(objeto => inputValues.includes(objeto.category.split(' ').join('_')))    
        console.log(eventosCheck)

         filteredCards(eventosCheck, card_pastEvents)
    }


///////////CREAR CARDS DE LOS FILTRADOS

function filteredCards(array, idContainer){
    const container = document.getElementById('card_pastEvents')
    container.innerHTML=''
    let fragment = document.createDocumentFragment()

    for(let element of array){
        let div = document.createElement('div')
        div.classList.add("card")
        div.style.width = "18rem"
        div.innerHTML = `<img src="${element.image}" class="card-img-top" style="height: 150px" alt="Cinema">
    <div class="card-body d-flex flex-column justify-content-between">
      <h3 class="card-title">${element.name}</h3>
      <p class="card-text">${element.description}</p>
      <p>Price: ${element.price} u$d</p>
      <a href="./details.html" class="btn btn-dark nav-item p-2 me-1 ms-1 mb-1"
        style="color: #d63384; background-color: black">More</a>
    </div>`
    fragment.appendChild(div)
    }
    container.appendChild(fragment)
}




    /////// input de formulario
const inputForm = document.getElementById('inputForm'); ///llamar al input del formulario, no al formulario. Y probar keyup
inputForm.addEventListener('keyup', (e) => {
    let textoDeBusqueda = inputForm.value
    console.log(texto(textoDeBusqueda))
})

function texto(textoDeBusqueda){
    if(textoDeBusqueda == "")
    return data.events
    let nuevoArray = data.events.filter(element => element.name.toLocaleLowerCase().includes(textoDeBusqueda.toLowerCase().trim()))
    return nuevoArray
}