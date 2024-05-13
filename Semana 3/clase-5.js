/* --------------------------- listado de almbumes --------------------------- */
const albumesFamosos = [{
        id: "x123",
        nombre: "Nevermind",
        imagen: "https://m.media-amazon.com/images/I/71DQrKpImPL._SL1400_.jpg",
        like: true
    },
    {
        id: "y456",
        nombre: "Thriller",
        imagen: "https://img.discogs.com/LfnH5tbhcZ4xRMNLAodIyvea9xA=/fit-in/600x600/filters:strip_icc():format(webp):mode_rgb():quality(90)/discogs-images/R-294033-1151290881.jpeg.jpg",
        like: false
    },
    {
        id: "z789",
        nombre: "The wall",
        imagen: "https://img.discogs.com/EbLYco6R1A-5Z7QJ4t4O1JSzsM8=/fit-in/587x600/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-4620059-1370165707-3841.jpeg.jpg",
        like: false
    },
    {
        id: "a987",
        nombre: "Abbey Road",
        imagen: "https://cloudfront-us-east-1.images.arcpublishing.com/copesa/RDH5EPH2TNENPI73NBWUWWMLPA.jpg",
        like: false
    },
    {
        id: "b654",
        nombre: "Origin of Symmetry",
        imagen: "https://http2.mlstatic.com/D_NQ_NP_967206-MLA26105577132_102017-O.webp",
        like: false
    },
    {
        id: "c321",
        nombre: "Back in Black",
        imagen: "https://i1.wp.com/www.scienceofnoise.net/wp-content/uploads/2020/07/068660474366a63e1263e53ff370eb50.jpg",
        like: false
    }
];





/* -------------------------------------------------------------------------- */
/*                  [1] FUNCION: captar el nombre de usuario                  */
/* -------------------------------------------------------------------------- */

function obtenerUsuario() {
    
    // Seleccionar el nodo sobre el cual vamos a trabajar
    const nombreUsuario = document.querySelector("#nombreUsuario");

    // Pedir el nombre del usuario hasta que sea un nombre válido
  //👇
    let usuario = ""
    do {
        usuario = prompt("Ingrese su nombre de usuario: ").toLowerCase().trim();
    } while (usuario === null || usuario == "" || usuario.length <= 3);

    // El método map() crea un nuevo array con los resultados de la llamada
    // a la función indicada aplicados a cada uno de sus elementos.
    //👇
    let nombres  = usuario.split(" ");
    usuario = nombres.map( (nombre) => nombre.charAt(0).toUpperCase() + nombre.slice(1)).join(" ");
    

    // charAt: obtiene el primer caracter de una cadena
    // slice(1): obtiene desde la primera posición hasta el final
    // join: devuelve un array como un string


    
    // Insertar el nombre introducido por el usuario 
    // en el texto del span cuyo id es nombreUsuario (nodo de texto)

    // Para crear un nodo de texto se puede utilizar
    // createTextNode: crea un elemento con el que después vamos a hacer algo,
    // como, por ejemplo, agregarlo a un elemento
    //👇
    let nuevoNodo = document.createTextNode(usuario);

    // No se visualiza hasta asignarlo a un elemento existente del DOM
    //👇
    nombreUsuario.append (nuevoNodo);

    // nombreUsuario.append(document.createTextNode(usuario));

}

obtenerUsuario();


/* -------------------------------------------------------------------------- */
/*                   [2] FUNCION: tarjetas de los álbumes                     */
/* -------------------------------------------------------------------------- */

function renderizarAlbumes(listado) {

    // Seleccionar el nodo sobre el cual vamos a trabajar
    // En este caso el nodo sobre el cual vamos a insertar etiquetas HTML
    const covers = document.querySelector(".covers");

    // Reemplaza el contenido de covers con una cadena vacía
    covers.innerHTML = "";

    // Crear los elementos a agregar en el DOM en el nodo seleccionado
    // Para cada album:
    //👇
    listado.forEach(album => {
        const li = document.createElement("li");
        const img = document.createElement("img");
        const p = document.createElement("p");
        const i = document.createElement("i");


        // Agregar atributos de cada nodo o etiqueta creada
        //👇
        li.setAttribute("data-id", album.id);
        // los atributos que comienzan con data- son atributos de datos
        
        img.setAttribute("src", album.imagen);
        img.setAttribute("alt", album.nombre);

        p.textContent = album.nombre;

        i.setAttribute("id", album.id);
        i.setAttribute("class", `fa fa-heart ${album.like ? "favorito" : ""}`);

        // Agregamos los elementos al DOM
        //👇
        li.appendChild(img);
        li.appendChild(p);
        li.appendChild(i);

        covers.appendChild(li);
    });
   
};

renderizarAlbumes(albumesFamosos);








/* ----------------------------- MESA DE TRABAJO ---------------------------- */
/* -------------------------------------------------------------------------- */
/*                   [3] FUNCION: mostrar datos del usuario                   */
/* -------------------------------------------------------------------------- */
// Dentro del div '.perfil' tenemos un parrafo con 2 span en los que debemos colocar
// correctamente su contenido.
// Para eso debemos hacer ciertos cálculos y colocar esa info en el HTML.
// Debemos:
// 1- contar la cantidad de albumes del array y colocarlo en el span correspondiente
// 2- contar la cantidad de favoritos y colocarlo en el span correspondiente
// 3- tener en cuenta: usar las palabra en plural o en singular, según cuando
// sea necesario ( es decir: 1 album, 1 favorito / 2 albumes, 3 favoritos )

function mostrarDatosEnPerfil(albumes) {
    // desarrollar la función 👇
    
}
mostrarDatosEnPerfil(albumesFamosos);


