//TEMPLATES PARA ARMAR ESTRUCTURAS HTML CON JAVASCRIPT

const retornoCard = (producto)=> {
    const {id, nombre, imagen, precio, descripcion} = producto
  return `<div class="card">
                <img id="${id}" src="image/${imagen}" tittle="${nombre} - ${descripcion}">
            <div>
               <p title="${nombre}">${nombre}</p>
            </div>
            <div class="card-price">$ ${precio}</div>
            <div class="card-button">
               <button class="button button-outline button-add" id="${nombre}">AGREGAR</button>
            </div>
            </div>`
}

const retornoError = ()=> {
return  `<div class="card-error">
          <h2>¡Upss....!</h2>
          <div>
          <img class"centrar" src="image/pez-mirandote.png">
          </div>
          <h3>No se pudo cargar la informacion.</h3>
          <h3>Intentar nuevamente en unos minutos...</h3>
      </div>`
}

