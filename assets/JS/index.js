/////// cards

function renderCards(eventos){
    const container = document.getElementById('card_index')
    container.innerHTML=''
    let fragment = document.createDocumentFragment()

for(let element of eventos){
    let div = document.createElement('div')
    div.classList.add("card")
    div.style.width = "18rem"
    div.innerHTML = `<img src="${element.image}" class="card-img-top" style="height: 150px" alt="Cinema">
    <div class="card-body d-flex flex-column justify-content-between">
      <h3 class="card-title">${element.name}</h3>
      <p class="card-text">${element.description}</p>
      <p>Price: ${element.price} u$d</p>
      <a href="./details.html?id=${element.id}" class="btn btn-dark nav-item p-2 me-1 ms-1 mb-1"
        style="color: #d63384; background-color: black">More</a>
    </div>`
    fragment.appendChild(div)
    }
    container.appendChild(fragment)
}

renderCards(data.events)

////// checkboxes

const check_category = document.getElementById('check_category')

function checkbox(events) {

    const arrayCat = events.map(event => event.category)
    const uniqueCategories = [...new Set(arrayCat)]


let fragmentCheck = document.createDocumentFragment()

 for(let cat of uniqueCategories){
     let div = document.createElement('div')
     div.className="form-check form-check-inline"
     div.style.color="#d63384"
     div.innerHTML = `<input class="form-check-input" type="checkbox" id=${cat.split(' ').join('_')} value=${cat.split(' ').join('_')}>
     <label class="form-check-label" style="color: #d63384" for=${cat.split(' ').join('_')}>${cat}</label>`
         fragmentCheck.appendChild(div)
 }
 return fragmentCheck
 }

check_category.appendChild(checkbox(data.events))

////clicks en checkboxes
 const checkboxes = document.querySelectorAll('input[type=checkbox]')

 checkboxes.forEach(checkbox => {
     checkbox.addEventListener('change', crossFilters)
 })

 function verSeleccion(eventos){
    const checked = document.querySelectorAll('input[type=checkbox]:checked')
    const inputValues = Array.from(checked).map(input => input.value)
    

    const eventosFiltrados = eventos.filter(objeto => inputValues.includes(objeto.category.split(' ').join('_')))
    console.log(eventosFiltrados);
     if(eventosFiltrados.length > 0){
        renderCards(eventosFiltrados)
     }else{
        renderCards(eventos)
     }
 }

/////// input de formulario
function busquedaPorTexto(eventos){
        let textoDeBusqueda = inputForm.value
        if(textoDeBusqueda == "")
        return eventos
        let nuevoArray = eventos.filter(element => element.name.toLocaleLowerCase().includes(textoDeBusqueda.toLowerCase().trim()))
        console.log(nuevoArray)
        return nuevoArray  
}

const inputForm = document.getElementById('inputForm');
inputForm.addEventListener('keyup', (e) => {
    let textoDeBusqueda = inputForm.value
    console.log(texto(textoDeBusqueda))
})

 function texto(textoDeBusqueda){
     if(textoDeBusqueda == "")
     return data.events
     let nuevoArray = data.events.filter(element => element.name.toLocaleLowerCase().includes(textoDeBusqueda.toLowerCase().trim()))
     renderCards(nuevoArray)
}

  function crossFilters(){
      const eventosChequeados = verSeleccion(data.events)
      const eventosBuscados = busquedaPorTexto(eventosChequeados)
      if(eventosBuscados > 0){
      renderCards(eventosBuscados)
      }
 }