let articulos = []   
const carrito = []
const URL = "../bbdd/productos.json"
const container = document.querySelector("div.container")


const activarBotonesAdd = ()=> { //ITERO BOTONES DE LAS CARDS PARA ASIGNARLES EL EVENTO CLICK
    const botonesAdd = document.querySelectorAll(".button.button-outline.button-add")
          botonesAdd.forEach(btn => btn.addEventListener("click", (e)=> agregarAlCarrito(e)))
}


const cargarMisProductos = async ()=> {
    let armoHTML = ""
    let activoBotones = true
        try {
            const response = await fetch(URL)
            const data = await response.json()
            articulos = data
                  articulos.forEach(etiqueta => armoHTML += retornoCard(etiqueta))
        } catch (error) {
            armoHTML += retornoError()
            activoBotones = false 
        } finally {
            container.innerHTML = armoHTML
            activoBotones && activarBotonesAdd()
        }
}


const toast = (mensaje)=> {
    Toastify({
        text: mensaje,
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        }
      }).showToast();
}

const agregarAlCarrito = (e)=> {  //AGREGAR UN PRODUCTO AL CARRITO
    let resultado = articulos.find(prod => prod.nombre === e.target.id)
        if (resultado !== undefined) {
            carrito.push(resultado)
            guardarCarrito()
            toast(`'${e.target.id}' se agregó al carrito.`)
        }
}

const guardarCarrito = ()=> { //OPERADOR LÓGICO AND 
    carrito.length > 0 && localStorage.setItem("carrito", JSON.stringify(carrito))
}

const recuperarCarrito = ()=> {
    if (localStorage.getItem("carrito")) {
        let carritoRecuperado = JSON.parse(localStorage.getItem("carrito"))
            carritoRecuperado.forEach(producto => carrito.push(producto))
    } else {
        console.warn("No se encontró un carrito previamente guardado.")
    }
}

// SI EXISTE UN CARRITO PREVIO, ENTONCES LO CARGO AL INICIAR INDEX.HTML,
// PARA SEGUIR AGREGANDO PRODUCTOS EN ESTE
recuperarCarrito()

//CARGAR LOS PRODUCTOS EN INDEX.HTML AL INICIO
cargarMisProductos()


//MÉTODOS (GET, POST, PUT, DELETE, PATCH)

//GET: OBTENER DATOS DE UN SERVIDOR
//POST: MANDAR DATOS A UN SERVIDOR
//PUT - PATCH: MODIFICAR DATOS EXISTENTES EN UN SERVIDOR
//DELETE: ELIMINAR DATOS DE UN SERVIDOR