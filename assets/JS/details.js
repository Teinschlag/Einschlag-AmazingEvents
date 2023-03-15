 const queryString = location.search
 console.log(queryString)
 const params = new URLSearchParams(queryString)
 console.log(params)
 const id = params.get("id")
 console.log(id)

 const evento = events.find(element => element.id == id)
 console.log(evento)


 function showCard(){
     const div = document.getElementById('detailsCard')
     let detailsCard = document.createElement('div')
     detailsCard.classList.add("card")
     detailsCard.classList.add("mt-3", "mb-3")
     detailsCard.style.width = "18rem"
     detailsCard.innerHTML = `<img src="${evento.image}" class="card-img-top" style="height: 150px" alt="Cinema">
     <div class="card-body d-flex flex-column justify-content-between">
     <h3 class="card-title">${evento.name}</h3>
     <p>Date: ${evento.date}</p>
     <p class="card-text">${evento.description}</p>
     <p>Category: ${evento.category}</p>
     <p>Place: ${evento.place}</p>
     <p>Capacity: ${evento.capacity}</p>
     <p>Assistance: ${evento.assistance}</p>
     <p>Price: ${evento.price} u$d</p>
     <a href="./index.html" class="btn btn-dark nav-item p-2 me-1 ms-1 mb-1"
         style="color: #d63384; background-color: black">Back</a>
     </div>`
     div.appendChild(detailsCard)
}

 showCard()