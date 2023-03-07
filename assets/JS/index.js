const detailsCard = document.getElementById('detailsCard')

let fragment = document.createDocumentFragment()

for(let element of data.events){
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


card_index.appendChild(fragment)



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
     div.innerHTML = `<input class="form-check-input" type="checkbox" id=${cat.split(' ').join('_')} value=${cat.split(' ').join('_')}>
     ${cat}
     <label class="form-check-label" style="color: #d63384" for=${cat.split(' ').join('_')}></label>`
         fragmentCheck.appendChild(div)
 }
 return fragmentCheck
 }

check_category.appendChild(checkbox(data.events))

///////////////////////////////////////////////////////////////////////////


check_category.addEventListener('click', imprimirPorConsola)
    
function imprimirPorConsola(e){
     console.log(e.target)
 }

 const checkboxes = document.querySelectorAll('input[type=checkbox]')
 console.log(checkboxes)

 checkboxes.forEach(checkbox => {
     checkbox.addEventListener('change', verSeleccion)
 })

 // ver inputs chequeados
 function verSeleccion(){
     let inputsChequeados= Array.from(checkboxes).filter(checkbox => checkbox.checked)
     let inputValues = inputsChequeados.map(input => input.value)
     console.log(inputValues)
     

     let eventosCheck = data.events.filter(objeto => inputValues.includes(objeto.category.split(' ').join('_')))    
        console.log(eventosCheck)
     
        // let newFragment = document.createDocumentFragment()

        // for(let objeto of eventosCheck){
        //     let div = document.createElement('div')
        //     div.classList.add("card")
        //     div.style.width = "18rem"
        //     div.innerHTML = `<img src="${objeto.image}" class="card-img-top" style="height: 150px" alt="Cinema">
        //     <div class="card-body d-flex flex-column justify-content-between">
        //       <h3 class="card-title">${objeto.name}</h3>
        //       <p class="card-text">${objeto.description}</p>
        //       <p>Price: ${objeto.price} u$d</p>
        //       <a href="./details.html" class="btn btn-dark nav-item p-2 me-1 ms-1 mb-1"
        //         style="color: #d63384; background-color: black">More</a>
        //     </div>`
        //     newFragment.appendChild(div)
        // }
        // card_index.appendChild(newFragment)

        // SE CREAN LAS TARJETAS, PERO SI SELECCIONO OTRO CHECKBOX ADEMAS, SE DUPLICAN, Y ADEMAS NO SE BORRAN LAS QUE NO CUMPLEN LA 
        //CONDICION. A REVISAR!
     
 }

 const formulario = document.getElementById('form1')

 const filtrar = () => {
    const texto = form1.value.toLowerCase();
    for(let name of data.events){
        let name = data.events.name.toLowerCase();
        if(name.indexOf(texto) !== -1){

        }
    }
    
 }





////////////////TARJETA DETAILS


 


 

