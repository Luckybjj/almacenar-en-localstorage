// Variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];    // Este arreglo almacenará todos los tweets


// Event Listeners
const eventListeners = () => {
    // Cuando el usuario agrega un nuevo tweet
    formulario.addEventListener('submit', agregarTweet);

   // Cuando el documento está listo.
    document.addEventListener('DOMContentLoaded', () => {
    
        tweets = JSON.parse(localStorage.getItem('tweets')) || []; 
        /*
        Se asigna un arreglo vacío cuando no se a agregado ningún tweet, esto se hace por nos arrojaría un error
        al intentar iterrar sobre algun elemento "null".
        */
        // console.log(tweets);

        crearHTML();
    });
}

// Funciones
const agregarTweet = (e) => {
    e.preventDefault()

    // textarea donde escribe el usuario
    // Cuando se presione 'submit' se leerá el valor del tweet text area
    const tweet = document.querySelector('#tweet').value;

    // Validación
    if (tweet === '') {
        mostrarError('El mensaje no puede ir vacío');
        return; // evita que se sigan ejecutando mas lineas de código.
    }

    const tweetObj = {
        id: Date.now(), // Date.now()El método estático devuelve el número de milisegundos transcurridos desde el 1 de enero de 1970 a las 00:00:00 UTC. Nos servirá como identificador único
        tweet
    }

    // Añadir al arreglo de tweet
    tweets = [...tweets, tweetObj] // se toma una copia de "tweets", y se le agrega "tweetObj"
    // console.log(tweets);

    // Una vez añadido el tweet se crea el HTML
    crearHTML();
}

// Mostrar mensaje de error
const mostrarError = (error) => {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error'); // En custom.css esta el estilo del mensaje de error con la clase .error

    // Insertar error en el contenido
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    // Elimina el mensaje de error despues de 1.5 seg
    setTimeout(() => {
        mensajeError.remove()   // Elimina el elemento del DOM
    }, 1500);
}

// Mostrar el listado de los tweets
const crearHTML = () => {

    limpiarHTML();

    // Se ejecuta la función si el arreglo contiene algun tweet, que no sea un arreglo vacío.
    // Es una forma de validar de que no se ejecute código innecesario.
    if (tweets.length > 0) {
        tweets.forEach( tweet => {
            // Agregar un botón al eliminar
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerText = 'X';
            
            // Añadir la función Eliminar
            btnEliminar.onclick = () => {
                borrarTweet(tweet.id);  // Se realiza de esta forma porque debemos pasarle el "id"
            }

            // Se crea el HTML
            const li = document.createElement('li');
            // Añadir texto
            li.innerText = tweet.tweet;
            // Asignar el botón
            li.appendChild(btnEliminar);
            // Insertar en el HTML
            listaTweets.appendChild(li); // El código se repite. Mientras tengamos appencChild(), no se eliminará el código previo.
        });
    }

    sincronizarStorage();
}

// Agrega los tweets a localStorage
const  sincronizarStorage = () => {
    localStorage.setItem('tweets', JSON.stringify(tweets))
}

// Eliminar tweet
const borrarTweet = (id) => {
    // console.log('Borrando...', id)
    tweets = tweets.filter( tweet => tweet.id !== id);  // Se crea un arreglo con todos los elementos diferentes al seleccionado.
    crearHTML();

}

// Limpiar el HTML
const limpiarHTML = () => {
    while (listaTweets.firstChild) {
        listaTweets.removeChild(listaTweets.firstChild);
        
    }
}

eventListeners();