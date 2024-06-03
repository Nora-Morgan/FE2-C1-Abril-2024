/* *******************    Trabajando con JSON     ******************************/
// Una guía muy útil para entender JSON:
// https://developer.mozilla.org/es/docs/Learn/JavaScript/Objects/JSON

// 👉 Como se agregó esta línea de código:
// localStorage.setItem('user', JSON.stringify(estadoUsuario));
// antes de redirigir a la página de perfil, está disponible para consultar

// localStorage: hace posible consumir en un html algo que se haya guardado otro.



/* -------------------------------------------------------------------------- */
/*           [6] FUNCION: Escuchar el evento de carga de la página            */
/* -------------------------------------------------------------------------- */
window.addEventListener("load", () => { 

    const user = recuperarDataDelStorage();
    renderizarElementos(user);

    botonCerrarSesion();

 })

/* -------------------------------------------------------------------------- */
/*         [7] FUNCION: Recuperar la información del localStorage             */
/* -------------------------------------------------------------------------- */
function recuperarDataDelStorage() {
    // recuperar la información almacenada en localStorage
    const datosUsuario = localStorage.getItem("user");
    console.log(datosUsuario);

    // convertir esta información para que sea legible por JS
    const datosParseados = JSON.parse(datosUsuario);
    console.log(datosParseados);

    // const datosParseados = JSON.parse(localStorage.getItem("user"));

    return datosParseados;
}

/* -------------------------------------------------------------------------- */
/*                [8] FUNCION: Renderizar la información del usuario          */
/* -------------------------------------------------------------------------- */
function renderizarElementos(objetoJS) {

    console.log(objetoJS.email);
    console.log(objetoJS.rol);

    const email = document.querySelector("#email");
    const perfil = document.querySelector("#perfil");

    email.textContent = objetoJS.email;
    perfil.textContent = objetoJS.rol;

}


/* ----------------------------- MESA DE TRABAJO ---------------------------- */
/* -------------------------------------------------------------------------- */
/*                     [9] FUNCION: Botón de cerrar sesion                    */
/* -------------------------------------------------------------------------- */
// Crear elementos en el DOM dinámicamente y asignar a esos elementos la escucha de eventos.
// La función debe ser ejecutada al final del evento load.

// La idea es crear un boton para cerrar sesión, para lo cual se debería:
// 1- Crear un elemento <button>
// 2- Que ese botón tenga el texto "Cerrar sesión"
// 3- El boton tiene que tener ciertos estilos:
//     - padding arriba y abajo de 5px y a los costados 20px
//     - color de fondo rojo con transparencia: rgba(255,0,0,0.2)
//     - color de letra rojo
//     - márgenes a todos los lados de 20px
//     - ningún borde
//     - cursor de tipo pointer
// 4- Tenemos que agregar el botón en pantalla, dentro del div con la clase 'user', al final del mismo
// 5- El botón debe reaccionar cuando se le hace clic
// 6- Mediante el clic debe aparecer un cuadro de confirmación que pregunte: "¿Seguro desea cerrar sesión?"
// 7- Si el usuario acepta debe borrar todo el storage y redirigirlo a la pantalla de Login.



function botonCerrarSesion() { 
//    👇 desarrollar la función aquí

}

function botonCerrarSesion(){
    const tarjeta = document.querySelector('.user');
    
    const boton = document.createElement('button');
    boton.style = "padding: 5px 20px; background-color: rgba(255,0,0,0.2); color: red; margin: 20px; border: none; cursor: pointer;";
    boton.textContent = "Cerrar sesión";
    
    tarjeta.appendChild(boton);
    
    boton.addEventListener('click', ()=>{
    if(confirm("¿Seguro desea cerrar sesión?")){
        location.replace('./');
        localStorage.clear();
    }
    })
}
