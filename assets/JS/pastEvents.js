const card_pastEvents = document.getElementById('card_pastEvents')

let fragment = document.createDocumentFragment()

const fechaHoy = Date.parse(data.currentDate);

for(let element of data.events){
    
    let proximasFechas = Date.parse(element.date)

    if(proximasFechas < fechaHoy){
    let div = document.createElement('div')
        div.classList.add("card")
        div.style.width = "18rem"
        div.innerHTML = `<img src=${element.image} class="card-img-top" alt="...">
            <div class="card" style="color: #d63384; background-color: black">
            <h5 class="card-title">${element.name}</h5>
            <p class="card-text">${element.description}</p>
            <p>Price: ${element.price} U$D</p>
            <a class="btn btn-dark nav-item p-2 me-1 ms-1 mb-1" style="color: #d63384" aria-current="page" href="/details.html">More</a>
            </div>`
    fragment.appendChild(div)
    }
}
card_pastEvents.appendChild(fragment)