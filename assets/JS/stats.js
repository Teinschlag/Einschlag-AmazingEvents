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

            const tables = document.getElementById("table1")
            cargarTabla1(events, tables)
             
            const tables2 = document.getElementById("table2")
            const tables3 = document.getElementById("table3")
        
            calcularGanancia(events.filter(elemento => elemento.assistance),"Food",tables2)
            calcularGanancia(events.filter(elemento => elemento.estimate),"Food",tables2)

            cargarTabla2(events.filter(elemento => elemento.estimate),tables2)
            cargarTabla2(events.filter(elemento => elemento.assistance),tables3)
            }
        catch(error){
            console.log(error = "No se ha logrado traer la informacion de la API")
        }
    }

    traerEvents()

    function cargarTabla1(array, contenedor){

        let mayorCapacity = array.reduce((event1, event2)=>{
            if(event1.capacity > event2.capacity) return event1
            return event2
        })
        console.log(mayorCapacity)

        let mayorAttendance = array.filter(elemento => elemento.assistance).reduce((event1, event2)=>{
            if((event1.assistance / event1.capacity) > (event2.assistance / event2.capacity)) return event1
            return event2
        })
        console.log(mayorAttendance)

        let menorAttendance = array.filter(elemento => elemento.assistance).reduce((event1, event2)=>
        {if((event1.assistance / event1.capacity) < (event2.assistance / event2.capacity)) return event1
        return event2})
        console.log(menorAttendance)


        let trContenedor = document.createElement('tr')
        trContenedor.innerHTML = `
            <td>${mayorAttendance.name}: ${mayorAttendance.assistance/mayorAttendance.capacity*100}%</td>
            <td>${menorAttendance.name}: ${menorAttendance.assistance/menorAttendance.capacity*100}%</td>
            <td>${mayorCapacity.name}: ${mayorCapacity.capacity}</td>`
            contenedor.appendChild((trContenedor))
    }

    function calcularGanancia(array, nombreDeCategoria){
        let arrayFiltrado = array.filter(elemento => elemento.category == nombreDeCategoria).reduce((total,evento) =>{
            if(evento.assistance != undefined) return total += evento.price * evento.assistance
            return total += evento.price * evento.estimate
        },0)
        return arrayFiltrado
    }

    function cargarTabla2(array, contenedor){

        let categorias = [... new Set(array.map(elemento => elemento.category))]

        let fragmento = document.createDocumentFragment()

        for(categoria of categorias){
            let trContenedor = document.createElement('tr')
            trContenedor.innerHTML= `<td>${categoria}</td>
            <td>$${calcularGanancia(array, categoria)}</td>
            <td>${calcularAsistencia(array, categoria)}%</td>`
            fragmento.appendChild(trContenedor)
        }
        contenedor.appendChild(fragmento)
    }

    function calcularAsistencia(array, nombreDeCategoria){

        let arrayFiltrado = array.filter(elemento => elemento.category == nombreDeCategoria).reduce((total,evento) =>{
            if(evento.assistance != undefined) return total += evento.assistance / evento.capacity
            return total += evento.estimate / evento.capacity
            },0)
            return (arrayFiltrado * 100 /array.filter(elemento => elemento.category == nombreDeCategoria).length).toFixed(2)
        }

  
