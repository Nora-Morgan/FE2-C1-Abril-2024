// Clase 12:
    // Escuchar el clic en "Ver comentarios"
    // Consultar la API
    // Renderizar los comentarios

/*
    fetch()

    - El método fetch inicia el proceso de obtener un recurso.
    - Devuelve una promesa que se resuelve en un objeto response
      que representa la respuesta a la solicitud
      (devuelve una promesa porque no sabe cuánta será la demora)
    - Permite hacer pedidos a una API desde front end.
    - Recibe como parámetro la URL del endpoint al cual se está llamando
*/






/* -------------------------------------------------------------------------- */
/*           [4] FUNCION: escuchar el clic en "Ver comentarios"               */
/* -------------------------------------------------------------------------- */

 const boton = document.querySelector("button");
 const endpoint = 'https://jsonplaceholder.typicode.com/comments';
 
 boton.addEventListener("click", () => { 
     console.log("Se hizo clic para ver los comentarios");
     consultaApi(endpoint);
     console.log("Fin de la carga de los comentarios");
  })
 







/* -------------------------------------------------------------------------- */
/*                       [5] FUNCION: consultar  la API                       */
/* -------------------------------------------------------------------------- */
// En este caso, consultar una API de la cual se traen los comentarios.
// Esta API tiene su documentación en: https://jsonplaceholder.typicode.com/
// Implementar el endpoint que devuelve comentarios para mostrarlos en pantalla.

function consultaApi(endpoint) {
    fetch(endpoint)
        .then( objetoRespuesta => {
            console.log(objetoRespuesta);
            console.log(objetoRespuesta.status);
            console.log(objetoRespuesta.url);

            return objetoRespuesta.json();
        })
        .then( datosJs => {
            console.log(datosJs);
            renderizarElementos(datosJs);
        })
        .catch( error => console.log(error));
}

/*
En este caso:
- El primer then() recibe un callback
  y retornará la respuesta a la solicitud en formato json
- El status nos indica si está todo bien y si está todo listo
- Una vez que está la respuesta, con otra promesa
  se pueden procesar los datos según lo que se necesite
- Si ocurrió algún error el catch() lo atrapa
*/



/* -------------------------------------------------------------------------- */
/*                      [6] FUNCION: renderizar elementos                     */
/* -------------------------------------------------------------------------- */

function renderizarElementos(listado) {
    const comentarios = document.querySelector(".comentarios");
    
    comentarios.innerHTML = ""
    listado.forEach(comentario => {
        comentarios.innerHTML += `
            <div class="comentario" data-id="${comentario.id}">
                <h4>${comentario.email}</h4>
                <p>${comentario.body}</p>
            </div>
        `
    });
}




/* ----------------------------- MESAS DE TRABAJO --------------------------- */
/* -------------------------------------------------------------------------- */
/*                              Mejoras de código                             */
/* -------------------------------------------------------------------------- */

// Desarrollar el código para nuevos requerimientos que necesita la aplicación.
// 1- En el caso de la consulta a la API, si la misma no es satisfactoria,
//    deberá arrojar un error que se le muestre al usuario.

// 2- Para lograr ver el error podemos forzarlo modificando el endpoint incorrectamente,
// para detectar y arrojar el error deben implementar el bloque try().catch()

// 3- Si los comentarios llegan y se cargan correctamente,
// el botón de "Ver comentarios" debe desaparecer de la interfaz.
// Así evitamos que se vuelva a llamar a la API.

// 4- Solo deben cargarse los primeros 10 comentarios que nos llegan.

