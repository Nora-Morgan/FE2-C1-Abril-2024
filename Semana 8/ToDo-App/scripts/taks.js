/*
  SEGURIDAD: si no se encuentra en localStorage la info del usuario
  no lo deja acceder a la página y redirige al login.
*/

console.log(localStorage.jwt);

if (!localStorage.jwt) {
  location.replace("./index.html");
}


// Cuando se termina de cargar el documento
window.addEventListener('load', function () {

    // Obtener las variables globales   
  const formCrearTarea = document.querySelector('.nueva-tarea');
  const btnCerrarSesion = document.querySelector('#closeApp');
  const nuevaTarea = document.querySelector('#nuevaTarea');
  

  // Variables relacionadas con la conexion a la API
  const url = "https://todo-api.digitalhouse.com/v1";
  const urlUsuario = `${url}/users/getMe`;
  const urlTareas = `${url}/tasks`;
  const token = JSON.parse(localStorage.jwt);

  
  obtenerNombreUsuario();
  consultarTareas();

  /* -------------------------------------------------------------------------- */
  /*                          FUNCIÓN 1 - Cerrar sesión                         */
  /* -------------------------------------------------------------------------- */

  btnCerrarSesion.addEventListener('click', function () {
    const cerrarSesion = confirm("¿Está seguro de que desea cerrar sesión?");

    if (cerrarSesion) {
      // Limpiar el LocalStorage
      localStorage.clear();
      location.replace("./index.html");
    }
  });

  /* -------------------------------------------------------------------------- */
  /*                 FUNCIÓN 2 - Obtener nombre de usuario [GET]                */
  /* -------------------------------------------------------------------------- */

  function obtenerNombreUsuario() {
   const settings = {
      method: "GET",
      headers: {
        authorization: token
      }
    };
    console.log(settings); 

    // Disparar la consulta a la API para obtener los datos del usuario
    fetch(urlUsuario, settings)
      
      .then( response => {
        
        if (response.ok != true) {
          return Promise.reject(response);
        }
        return response.json();
      })
      // .then( response => response.json()) 
        .then( userData => {

          console.log(userData);
          console.log(userData.firstName);

          const nombreUsuario = document.querySelector(".user-info p")
          nombreUsuario.textContent = userData.firstName
        })
        
        .catch(err => {
          console.error(err);
          console.error(err.status);
          if (err.status == 400) {
              console.warn("El usuario no existe.");
              alert("El usuario no existe");
          } else {
              console.error("Error del servidor.");                  
          }
        })
        // .catch( err => console.log(err));

  };


  /* -------------------------------------------------------------------------- */
  /*                 FUNCIÓN 3 - Obtener listado de tareas [GET]                */
  /* -------------------------------------------------------------------------- */

  function consultarTareas() {
    const settings = {
      method: "GET",
      headers: {
        authorization: token
      }
    }
    
    console.log("🚩Consultando las tareas...");
    fetch(urlTareas, settings)
      .then( response => response.json())
        .then( tareas => {
          console.log("Tareas del usuario");
          console.log(tareas);

          renderizarTareas(tareas);
          botonesCambioEstado();
          botonBorrarTarea();
        })
        .catch( err => console.log(err))
  };


  /* -------------------------------------------------------------------------- */
  /*                    FUNCIÓN 4 - Crear nueva tarea [POST]                    */
  /* -------------------------------------------------------------------------- */

  formCrearTarea.addEventListener('submit', function (event) {
    event.preventDefault() // *
    console.log("🚩Tarea nueva");
    console.log(nuevaTarea.value);

    const payload = {
      description: nuevaTarea.value.trim(),
      completed: "false"
    };

    const settings = {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
        authorization: token 
      }
    };
    console.log("🚩Creando una tarea nueva en la DB");
    fetch(urlTareas, settings)
      .then( response => response.json())
      .then( tarea => {
        console.log(tarea);
        consultarTareas();
      })
      .catch( err => console.log(err))

      // limpieza del formulario
      formCrearTarea.reset() //*
  });


  /* -------------------------------------------------------------------------- */
  /*                  FUNCIÓN 5 - Renderizar tareas en pantalla                 */
  /* -------------------------------------------------------------------------- */
  function renderizarTareas(listado) {
    // obtengo listados y limpio cualquier contenido interno
    const tareasPendientes = document.querySelector(".tareas-pendientes")
    const tareasTerminadas = document.querySelector(".tareas-terminadas")
    tareasPendientes.innerHTML = ""
    tareasTerminadas.innerHTML = ""

    const cantidadFinalizadas = document.querySelector("#cantidad-finalizadas");
    let contador = 0;
    cantidadFinalizadas.textContent = contador;

    listado.forEach(tarea => {
      // la variable intermedia para manipular la fecha
      let fecha = new Date(tarea.createdAt)

      // renderizo las tarjetas dependiendo de si tienen completed en true/false
      if (tarea.completed) {
        contador++; // sumamos el contador pues está completed en true

        //imprimir las tareas completadas
        tareasTerminadas.innerHTML += `
          <li class="tarea">
            <div class="hecha">
              <i class="fa-regular fa-circle-check"></i>
            </div>
            <div class="descripcion">
              <p class="nombre">${tarea.description}</p>
              <div class="cambios-estados">
                <button class="change incompleta" id="${tarea.id}"><i class="fa-solid fa-rotate-left"></i></button>
                <button class="borrar" id="${tarea.id}"><i class="fa-regular fa-trash-can"></i></button>
              </div>
            </div>
          </li>
        `        
      } else {
        // imprimir las tareas pendientes
        tareasPendientes.innerHTML += `
          <li class="tarea">
            <button class="change" id="${tarea.id}"><i class="fa-regular fa-circle"></i></button>
            <div class="descripcion">
              <p class="nombre">${tarea.description}</p>
              <p class="timestamp">${fecha.toLocaleDateString()}</p>
            </div>
          </li>
        `
      }      
    });

    //actualizar el contador en la pantall
    cantidadFinalizadas.textContent = contador;
  };

  /* -------------------------------------------------------------------------- */
  /*                  FUNCIÓN 6 - Cambiar estado de tarea [PUT]                 */
  /* -------------------------------------------------------------------------- */
  function botonesCambioEstado() {
    const btnCambioEstado = document.querySelectorAll(".change");
    // console.log(btnCambioEstado);

    btnCambioEstado.forEach( boton => {
      //a cada boton le asignamos una funcionalidad
      boton.addEventListener("click", (ev) => { 
        console.log("🪵 cambio estado de tarea");
        // console.log(ev);
        // console.log(ev.target);
        console.log(ev.target.id);
        
        const id = ev.target.id
        const urlChange = `${urlTareas}/${id}`
        const payload = {}

        //segun el tipo de boton que fue clickeado, cambiamos el estado de la tarea
        if (ev.target.classList.contains("incompleta")) {
          // si está completada, la paso a pendiente
          payload.completed = false
        } else {
          // sino, está pendiente, la paso a completada
          payload.completed = true
        }
        console.log(payload);

        const settings = {
          method: "PUT",
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json",
            authorization: token, 
          }
        }

        fetch(urlChange, settings)
          .then(response => {
            console.log(response);

            //vuelvo a consultar las tareas actualizadas y pintarlas nuevamente en pantalla
            consultarTareas()
          })
       })
    }) 
  }


  /* -------------------------------------------------------------------------- */
  /*                     FUNCIÓN 7 - Eliminar tarea [DELETE]                    */
  /* -------------------------------------------------------------------------- */
  function botonBorrarTarea() {
    //obtenemos los botones de borrado
    const btnBorrarTarea = document.querySelectorAll('.borrar');

    btnBorrarTarea.forEach(boton => {
      //a cada boton de borrado le asignamos la funcionalidad
      boton.addEventListener('click', function (event) {
        const id = event.target.id;
        const url = `${urlTareas}/${id}`

        const settingsCambio = {
          method: 'DELETE',
          headers: {
            "Authorization": token,
          }
        }
        fetch(url, settingsCambio)
          .then(response => {
            console.log("Borrando tarea...");
            console.log(response.status);
            //vuelvo a consultar las tareas actualizadas y pintarlas nuevamente en pantalla
            consultarTareas();
          })
      })
    });
  }
});