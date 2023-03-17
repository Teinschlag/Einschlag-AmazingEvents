const urlAPI = "https://mindhub-xj03.onrender.com/api/amazing"

async function traerPastEvents() {
    // fetch('https://mindhub-xj03.onrender.com/api/amazing')
    //     .then(response => response.json())
    //     .then(data => console.log(data.events))
    //     .catch(error => console.error(error + " No se han logrado traer los eventos con exito"))

    try {
        const response = await fetch(urlAPI)
        console.log(response)
        const data = await response.json()
        console.log(data)
        const events = data.events
        const newDate = new Date(data.currentDate)
        const pastDate = Date.parse(events[0].date)
        let pastCards = events.filter(evento => Date.parse(evento.date) < newDate);
        console.log(pastCards)
        renderCards(pastCards, 'card_pastEvents')
        checkbox(events, 'check_category')

        const checkboxes = document.querySelectorAll('input[type=checkbox]')
        console.log(checkboxes)
        let inputValues = []
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => {
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

        function crossFilters() {
            const eventosChequeados = filterArray(inputValues, events)
            const eventosBuscados = busquedaPorTexto(textoDeBusqueda, eventosChequeados)
            renderCards(eventosBuscados, 'card_pastEvents')
        }


    }
    catch (error) {
        console.log(error = "No se ha logrado traer la informacion de la API")
    }
}

traerPastEvents()

/////// cards

function renderCards(eventos, idContenedor) {

    const container = document.getElementById(idContenedor)
    container.innerHTML = ''
    if (eventos.length > 0) {
        let fragment = document.createDocumentFragment()

        for (let element of eventos) {
            let div = document.createElement('div')
            div.classList.add("card")
            div.style.width = "18rem"
            div.innerHTML = `<img src="${element.image}" class="card-img-top" style="height: 150px" alt="Cinema">
        <div class="card-body d-flex flex-column justify-content-between">
        <h3 class="card-title">${element.name}</h3>
        <p class="card-text">${element.description}</p>
        <p>Price: ${element.price} u$d</p>
        <a href="./details.html?id=${element._id}" class="btn btn-dark nav-item p-2 me-1 ms-1 mb-1"
            style="color: #d63384; background-color: black">More</a>
        </div>`
            fragment.appendChild(div)
        }
        container.appendChild(fragment)
    } else {
        let div = document.createElement('div')
        div.innerHTML = `<p class="card-text">Nothing to show. Please, enter another keyword to find your event.</p>`
        container.appendChild(div)
    }
}
// const card_pastEvents = document.getElementById('card_pastEvents')

let fragment = document.createDocumentFragment()

const fechaHoy = Date.parse(data.currentDate);

for (let element of data.events) {

    let proximasFechas = Date.parse(element.date)

    if (proximasFechas < fechaHoy) {
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
//card_pastEvents.appendChild(fragment)

////// checkboxes

function checkbox(events) {

    const check_category = document.getElementById('check_category')

    const arrayCat = events.map(event => event.category)
    const uniqueCategories = [...new Set(arrayCat)]


    let fragmentCheck = document.createDocumentFragment()

    for (let cat of uniqueCategories) {
        let div = document.createElement('div')
        div.className = "form-check form-check-inline"
        div.style.color = "#d63384"
        div.innerHTML = `<input class="form-check-input" type="checkbox" id=${cat.split(' ').join('_')} value=${cat.split(' ').join('_')}>
     <label class="form-check-label" style="color: #d63384" for=${cat.split(' ').join('_')}>${cat}</label>`
        check_category.appendChild(div)
    }
    // return fragmentCheck
}

//check_category.appendChild(checkbox(data.events))

function filterArray(checkArray, events) {
    if (checkArray == 0) {
        return events
    } else {
        const eventosFiltrados = events.filter(objeto => checkArray.includes(objeto.category.split(' ').join('_')))
        return eventosFiltrados
    }
}

/////// input de formulario
function busquedaPorTexto(string, events) {
    if (string == "") {
        return events
    } else {
        let nuevoArray = events.filter(element => element.name.toLowerCase().includes(string.toLowerCase().trim()))
        return nuevoArray
    }
}
