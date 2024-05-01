/* -------------------------------------------------------------------------- */
/*                                  FUNCION 1                                 */
/* -------------------------------------------------------------------------- */
// function iniciarJuego() {

//       // saludar al usuario
//       alert("Bienvenido al piedra papel o tijera de Frontend II.");
//       // guardar en una variable el nombre ingresado
//       const nombre = prompt("Ingese su nombre por favor:")
  
//       alert("Gracias por jugar " + nombre + ". ¡Mucha suerte!");
  
//       // mostramos los datos por consola
//       console.log("----------------------------");
//       console.log("El jugador es:")
//       console.log(nombre);
//       console.log("----------------------------");
  
//       return nombre;
//   }







  /* -------------------------------------------------------------------------- */
  /*                          CONSIGNA MESA DE TRABAJO                          */
  /* -------------------------------------------------------------------------- */
  // 1- Modificar la funcion de iniciarJuego(), validar si ingresa un dato válido como nombre.
  // 2- Si no ingresa un texto, o tiene menos de 3 caracteres debemos volverle a pedir que lo ingrese.
  // 3- Finalmente el nombre devuelto debe estar todo en mayúsculas.



  function iniciarJuego(){

      alert("¡Te doy la bienvenida al juego!");
      // Declaro una variable para guardar el nombre del usuario
      let nombre;
      // Declaro una variable para almacenar el estado del nombre
      let nombreValido = false;
      // Creo una expresión regular para validar el nombre que ingresa el usuario
      const nombreSoloLetras = /^[a-zA-Z]+$/;
      // Otra opción sería construir una expresión regular que contemple una longitud mínima: /^[a-zA-Z]{4,}$/

      //Solicito el nombre
      nombre = prompt("Ingresa tu nombre con letras como mínimo y sin números");

      do{
            console.log(nombre);
            if(nombreSoloLetras.test(nombre)){
                  console.log("El nombre tiene solo letras.")
                  if (nombre.length > 3){
                        console.log("El nombre es válido.")
                        nombreValido = true;
                  } else{
                        console.log("El nombre tiene 3 caracteres o menos.")
                        nombre = prompt("El nombre ingresado debe contener 4 o más letras.");
                  }
            } else{
                  console.log("El nombre tiene números u otros caracteres especiales.")
                  if (nombre.length > 3){
                        nombre = prompt("El nombre ingresado debe contener solo letras.");
                  } else{
                        console.log("El nombre tiene 3 caracteres o menos y algunos no son letras.")
                        nombre = prompt("El nombre ingresado debe contener 4 o más letras.");                  }
            }
      } while (!nombreValido); //se vuelve a ejecutar mientras que el nombre no sea válido 

      //Convierto a mayúsculas
      nombre = nombre.toUpperCase();

      // Muestro el saludo concatenado con el nombre 
      alert("Gracias por jugar " + nombre + ". ¡Mucha suerte!");
  
      console.log("----------------------------");
      console.log("El jugador es:")
      console.log(nombre);
      console.log("----------------------------");

      return nombre;
  }

  // Guardo el nombre del jugador que devuelve la función
  const nombreJugador = iniciarJuego();
  
