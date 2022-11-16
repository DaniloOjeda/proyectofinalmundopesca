const carrito = []
const btnComprar = document.querySelector("#btnComprar")

const recuperarCarrito = ()=> {
    if (localStorage.getItem("carrito")) {
        let carritoRecuperado = JSON.parse(localStorage.getItem("carrito"))
            carritoRecuperado.forEach(producto => carrito.push(producto) )
    } else {
        console.warn("No se encontró un carrito previamente guardado.")
    }
}

const cargarCarrito = ()=> {
    let tablaHTML = ""
    const tbody = document.querySelector("tbody")
        carrito.forEach(artPesca => {
            tablaHTML += `<tr>
                            <td class="centrar">${artPesca.imagen}</td>
                            <td>${artPesca.nombre}</td>
                            <td>$ ${artPesca.precio}</td>
                         </tr>`
        })
        tbody.innerHTML = tablaHTML
        debugger
        let totalCarrito = carrito.reduce((acc, artPesca)=> acc + artPesca.precio , 0)
        tbody.innerHTML += `<tr id="filaTotal">
                                <td class="centrar"></td>
                                <td>TOTAL:</td>  
                                <td>$ ${totalCarrito}</td>
                            </tr>`
}

const alerta = (titulo, textoBoton)=> {
    return Swal.fire({
                title: titulo,
                confirmButtonText: textoBoton
            })
}

const carritoVacio = ()=> {
    alerta("¡El carrito está vacío!!", "Ops")
}

const finalizarCompra = ()=> {
    alerta("Muchas gracias por su compra!", "Finalizar").then(result => {
        if (result.isConfirmed) {
            localStorage.removeItem("carrito")
            location.href = "index.html"
        }
    })
}

btnComprar.addEventListener("click", ()=> {
    carrito.length === 0 ? carritoVacio() : finalizarCompra()
})

//AL CARGAR LA PAGINA
recuperarCarrito()
cargarCarrito()



inputBusqueda.addEventListener("input", (e)=> {
    filtrarProductos(e.target.value)
})

