    const urlAPI =  "https://mindhub-xj03.onrender.com/api/amazing"
    
    async function traerEvents(){
        // fetch('https://mindhub-xj03.onrender.com/api/amazing')
        //     .then(response => response.json())
        //     .then(data => console.log(data.events))
        //     .catch(error => console.error(error + " No se han logrado traer los eventos con exito"))

        try{
            const response = await fetch(urlAPI)
            console.log(response)
            const data = await response.json()
            console.log(data)
            const events = data.events
            console.log(events)
            renderCards(events, 'card_index')
            checkbox(events, 'check_category')

            const checkboxes = document.querySelectorAll('input[type=checkbox]')
            console.log(checkboxes)
            let inputValues = []
            checkboxes.forEach(checkbox => {
                checkbox.addEventListener('change', ()=>{
                    inputValues = Array.from(checkboxes).filter(check => check.checked).map(input => input.value)
                    console.log(inputValues)
                    crossFilters()
                })

        })

            const inputForm = document.getElementById('inputForm');
            console.log(inputForm)
            let textoDeBusqueda = ""
            inputForm.addEventListener('keyup', (e) => {
            textoDeBusqueda = e.target.value
            console.log(textoDeBusqueda)
            crossFilters()
        })

        function crossFilters(){
            const eventosChequeados = filterArray(inputValues, events)
            const eventosBuscados = busquedaPorTexto(textoDeBusqueda, eventosChequeados)
            renderCards(eventosBuscados, 'card_index')
        }


    }
        catch(error){
            console.log(error = "No se ha logrado traer la informacion de la API")
        }
    }

    traerEvents()
// /////// cards

 function renderCards(eventos, idContenedor){
    
     const container = document.getElementById(idContenedor)
     console.log(container);
     container.innerHTML=''
     if(eventos.length > 0){
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
     }else{
         let div = document.createElement('div')
         div.innerHTML = `<p class="card-text">Nothing to show. Please, enter another keyword to find your event.</p>`
         container.appendChild(div)
     }
 }

// renderCards(data.events)

 ////// checkboxes

 function checkbox(eventos, container) {

    const check_category = document.getElementById(container)

     const arrayCat = eventos.map(event => event.category)
     const uniqueCategories = [...new Set(arrayCat)]


 let fragmentCheck = document.createDocumentFragment()

  for(let cat of uniqueCategories){
      let div = document.createElement('div')
      div.className="form-check form-check-inline"
      div.style.color="#d63384"
      div.innerHTML = `<input class="form-check-input" type="checkbox" id=${cat.split(' ').join('_')} value=${cat.split(' ').join('_')}>
      <label class="form-check-label" style="color: #d63384" for=${cat.split(' ').join('_')}>${cat}</label>`
          check_category.appendChild(div)
  }
//   return fragmentCheck
  }

//  check_category.appendChild(checkbox(data.events))

 ////clicks en checkboxes
//  let inputValues = []
//  let textoDeBusqueda = ""

//  const checkboxes = document.querySelectorAll('input[type=checkbox]')

//   checkboxes.forEach(checkbox => {
//       checkbox.addEventListener('change', verSeleccion)
//   })

//   function verSeleccion(){
//      inputValues = Array.from(checkboxes).filter(check => check.checked).map(input => input.value)
//      crossFilters(data.events)

//   }
 
  function filterArray(checkArray, events){
     if(checkArray == 0){
         return events
     }else{
     const eventosFiltrados = events.filter(objeto => checkArray.includes(objeto.category.split(' ').join('_')))
         return eventosFiltrados
     }
  }


// /////// input de formulario
  function busquedaPorTexto(string, events){
          if(string == ""){
             return events
          }else{         
          let nuevoArray = events.filter(element => element.name.toLowerCase().includes(string.toLowerCase().trim()))
          return nuevoArray
         }
  }

//   const inputForm = document.getElementById('inputForm');
//   inputForm.addEventListener('keyup', (e) => {
//       textoDeBusqueda = inputForm.value
//       crossFilters(data.events)
//   })

    // function crossFilters(){
    //     const eventosChequeados = filterArray(inputValues, data.events)
    //     const eventosBuscados = busquedaPorTexto(textoDeBusqueda, eventosChequeados)
    //     renderCards(eventosBuscados)
    // }
