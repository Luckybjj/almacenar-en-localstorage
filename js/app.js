// Variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];    // Este arreglo almacenará todos los tweets


// Event Listeners
const eventListeners = () => {
    formulario.addEventListener('submit', agregarTweet);
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
        id: Date.now(),
        tweet
    }

    // Añadir al arreglo de tweet
    tweets = [...tweets, tweetObj]
    // console.log(tweets);

    // Una vez añadido el tweet se crea el HTML
    crearHTML();
}

// Mostrar mensaje de error
const mostrarError = (error) => {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    // Insertar error en el contenido
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    // Elimina el mensaje de error despues de 2 seg
    setTimeout(() => {
        mensajeError.remove()
    }, 1500);
}

// Mostrar el listado de los tweets
const crearHTML = () => {

    limpiarHTML();

    // Se ejecuta la función si el arreglo contiene algun tweet
    if (tweets.length > 0) {
        tweets.forEach( tweet => {
            // Se crea el HTML
            const li = document.createElement('li');

            // Añadir texto
            li.innerText = tweet.tweet;

            // Insertar en el HTML
            listaTweets.appendChild(li); // El código se repite. Mientras tengamos appencChild(), no se eliminará el código previo.

        })
    }
}

// Limpiar el HTML
const limpiarHTML = () => {
    while (listaTweets.firstChild) {
        listaTweets.removeChild(listaTweets.firstChild);
        
    }
}


eventListeners();