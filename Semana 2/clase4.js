//--------------------------------------------------------------
// ESTILOS
//--------------------------------------------------------------

// 👇 Primero capturar los elementos que vamos a modificar
const sitio = document.querySelector('body');
let btnTema = document.querySelector('button');
let menuItems = document.querySelectorAll('nav ul li');
let contenedorDeNoticias = document.querySelector('main');
let notas = document.querySelectorAll('article');
let titulos = document.querySelectorAll('article h2');

// contenedorDeNoticias.style.backgroundColor = "green";

// 👇acá podemos ver todas las propiedades CSS que podemos modificar con JS
console.log(menuItems);
console.log(menuItems[1].style);


for (let i = 0; i < menuItems.length; i++) {
    menuItems[i].style.color = "aqua";
}

menuItems.forEach(item => {
    item.style.textTransform = "uppercase"
    item.style.color = "aqua";
    item.style.backgroundColor = "rgba(255,255,255, 0.2)"
    item.style.borderRadius = "50vh"
    item.style.padding = "10px"
    item.style.marginTop = "20px"
});

//--------------------------------------------------------------
// CLASES (clases que ya existen en el style.css)
//--------------------------------------------------------------

console.log(sitio.classList);

console.log(sitio.classList.contains("dark"));
console.log(sitio.classList);

console.log(sitio.classList.add("dark"));
console.log(sitio.classList);

console.log(sitio.classList.remove("dark"));
console.log(sitio.classList);

console.log(sitio.classList.remove("dark")); 
console.log(sitio.classList.toggle("dark"));
console.log(sitio.classList);
console.log(sitio.classList.toggle("dark"));
console.log(sitio.classList);



/* -------------------------------------------------------------------------- */
/*                          CONSIGNA MESA DE TRABAJO                          */
/* -------------------------------------------------------------------------- */
// Primero debemos comentar o eliminar las líneas que modifican las clases de "sitio"
// 1- Desarrollar la función a continuacion para que el usuario elija el tema del sitio.

// 2- Debemos preguntarle al usuario mediante un confirm si desea usar el modo oscuro.

// 3- Si el usuario confirma debemos aplicar la clase "dark" al "sitio",
// si cancela debe quedar en modo claro.

// 4- A su vez, el texto del boton debe decir "Cambiar a modo claro 🌞".
// De lo contrario, si está en modo claro debe decir "Cambiar a modo oscuro 🌛"

function elegirTema() {

}
elegirTema();