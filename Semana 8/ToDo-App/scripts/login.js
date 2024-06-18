window.addEventListener('load', function () {

    // Obtener las variables globales

    const form = document.querySelector("form");
    const email = document.querySelector("#inputEmail");
    const password = document.querySelector("#inputPassword");

    const url = "https://todo-api.digitalhouse.com/v1"; //endpoint




    /* -------------------------------------------------------------------------- */
    /*          FUNCIÓN 1: Escuchar el submit y preparar los datos para el envío   */
    /* -------------------------------------------------------------------------- */
    form.addEventListener('submit', function (event) {
       event.preventDefault();

        // Crear el cuerpo de la request (petición al servidor)

        // Payload: es la parte del mensaje que contiene los datos que queremos enviar o recibir,
        // excluyendo el encabezado u otros datos de control.
       const payload = {
            email: email.value,
            password: password.value
        };
    
        console.log(payload);

        // Configurar la request del fetch
        const settings = {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                "Content-Type": "application/json"
            }
        };

        console.log(settings);

        // Disparar la consulta del login a la API
        realizarLogin(settings);

    });
    
    
    /* -------------------------------------------------------------------------- */
    /*                     FUNCIÓN 2: Realizar el login [POST]                    */
    /* -------------------------------------------------------------------------- */
    function realizarLogin(settings) {
        console.log(settings);
        console.log("Lanzando la consulta a la API....");
        
        fetch(`${url}/users/login`, settings)
        .then( response => {
            console.log(response);

            // Manejar el estado de la petición:
            // Si todo va bien => esta respuesta se captura en el siguiente .then
            if (response.ok){
                return response.json();
                // return Promise.resolve(response.json());
            }
            // Si hay un error (forzar el error para capturarlo en el .catch)
            return Promise.reject(response);
                
            })
            .then(data =>{
                console.log(data);
                console.log(data.jwt);
                
                if (data.jwt) {
                    // Guardar el dato JWT en LocalStorage (el token de autenticación)
                    localStorage.setItem("jwt", JSON.stringify(data.jwt))
                    
                    // Limpiar los inputs del formulario
                    form.reset()

                    // Redirigir al dashboard
                    location.replace("./mis-tareas.html")
                }
            })
            .catch( err => {
                console.error(err);
                console.error(err.status);
            if (err.status == 400) {
                console.error("Contraseña incorrecta")
                alert("Contraseña incorrecta. Por favor vuelve a ingresarlo")
            } else if (err.status == 404) {
                console.error("El usuario no existe")
                alert("El usuario no existe, revise el email")
            } else {
                console.error("Error del servidor | url no existe")
                alert("Error del servidor o url no existe, comúniquese con el proveedor")
            }
        })        
    };
});


// "email": "prueba@mail.com",
// "password": "123456"
