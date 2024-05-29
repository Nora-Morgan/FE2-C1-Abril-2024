/* -------------------------- estado por defecto ------------------------- */
const estadoUsuario = {
    email: "",
    password: "",
    rol: "",
    terminos: false
};


// Serán true solo cuando estén correctos
const estadoErroresOK = {
    email: false,
    password: false,
    rol: false,
    terminos: false
};

/* ---------------------------------- nodos --------------------------------- */

// seleccionar todos los elementos que se necesitan
const formulario = document.forms[0];

const inputEmail = document.querySelector('#email');
const inputPassword = document.querySelector('#password');
const inputRol = document.querySelector('#rol');
const inputTerminos = document.querySelector('#terminos');

const emailError = document.querySelector('#emailError');
const passwordError = document.querySelector('#passwordError');
const rolError = document.querySelector('#rolError');
const terminosError = document.querySelector('#terminosError');


/* -------------------------------------------------------------------------- */
/*                   [1] FUNCION: mostrar errores al usuario                  */
/* -------------------------------------------------------------------------- */
function mostrarErrores() {
    estadoErroresOK.email ? emailError.classList.remove("visible") : emailError.classList.add("visible");

    estadoErroresOK.password ? passwordError.classList.remove("visible") : passwordError.classList.add("visible")
    estadoErroresOK.rol ? rolError.classList.remove("visible") : rolError.classList.add("visible")
    estadoErroresOK.terminos ? terminosError.classList.remove("visible") : terminosError.classList.add("visible")
}

/* -------------------------------------------------------------------------- */
/*               [2] FUNCION: actulizar los estados                           */
/* -------------------------------------------------------------------------- */


// 👇 por cada cambio en el formulario
formulario.addEventListener('change', function () {

    // 👇 actualizar el estado
    estadoUsuario.email = inputEmail.value;
    estadoUsuario.password = inputPassword.value;
    estadoUsuario.rol = inputRol.value;
    estadoUsuario.terminos = inputTerminos.checked;

    estadoErroresOK.email = validarEmail(estadoUsuario.email);
    estadoErroresOK.password = validarPassword(estadoUsuario.password);
    estadoErroresOK.rol = validarRol(estadoUsuario.rol);
    estadoErroresOK.terminos = validarTerminos(estadoUsuario.terminos);
  
    mostrarErrores();
});


/* -------------------------------------------------------------------------- */
/*                        [3] FUNCIONES: validar campos                       */
/* -------------------------------------------------------------------------- */
function validarEmail(email) {
   
    let resultado = false;
   
    // mail@algo.com
    // ejemplo de expresion regular
    let regExp = new RegExp("[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}");
    if (regExp.test(email)) {
        resultado = true;
        // console.log("cumple");
    }

    return resultado;
}

function validarPassword(password) {

    let resultado = false;

    if (password.length > 5 && !password.includes(" ")) {  
        resultado = true;
        // console.log("cumple");
    }
 
    return resultado;
}

function validarRol(rol) {

    let resultado = false;

    if (rol == "frontend" || rol == "backend") {
        resultado = true;
        // console.log("cumple");
    }
    return resultado;
}

function validarTerminos(verificacion) {

    let resultado = false;

    if (verificacion) {
        resultado = true
        // console.log("cumple");
    }
    
    return resultado;
}


/* -------------------------------------------------------------------------- */
/*                      [4] FUNCION: escuchamos el submit                     */
/* -------------------------------------------------------------------------- */

// en el evento submit chequear el estado de errores
formulario.addEventListener('submit', function (evento) {
    // prevenimos el comportamiento por defecto
   evento.preventDefault();

    if (
        estadoErroresOK.email &&
        estadoErroresOK.password &&
        estadoErroresOK.rol &&
        estadoErroresOK.terminos
    ) {
        navegarPaginaExito();
    }

});


/* ----------------------------- MESA DE TRABAJO ---------------------------- */
/* -------------------------------------------------------------------------- */
/*                [5] FUNCION: Formulario completado con éxito                */
/* -------------------------------------------------------------------------- */
// Esta funcion se va a encargar de realizar la redirección cuando el formulario se complete correctamente.
// Para eso deberá cumplir con los siguientes requerimientos:
// 1 - Deshabilitar el botón del formulario.
// 2 - Esperar 3 segundos para redireccionar a la otra página 
// 3 - Durante ese tiempo el botón deshabilitado debe mostrar el texto: "Cargando..."
// 4 - Cuando vaya a la página de 'usuario.html' no se debe permitir que mediante
//     el botón de "Atrás"(la flechita del navegador) el usuario vuelva a index.

function navegarPaginaExito() {
    // modificación del botón
    const btn = document.querySelector("button");
    btn.setAttribute("disabled", true);
    btn.textContent = "Cargando...";

    // almacenar en localStorage los datos del usuario
    // como no es un string, sino un objeto más complejo, se debe convertir a JSON
    // las claves y los valores serán siempre cadenas de texto
    localStorage.setItem("user", JSON.stringify(estadoUsuario));

    // que se ejecute la acción una vez superado el tiempo especificado
    setTimeout(() => {
        // objeto location: atributos y métodos para manipular información
        // que viaja en la barra de direcciones (href, asign, replace)
        location.replace('./usuario.html');
    }, 3000);
}

// window.localStorage: los datos almacenados no tienen expiración
// window.sessionStorage: permite acceder a un objeto storage asociado a la sesión actual
// y es eliminada cuando se cierra el navegador (cuando se cierra la sesión de navegación)
