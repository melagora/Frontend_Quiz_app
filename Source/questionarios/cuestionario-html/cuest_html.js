// Obtener los elementos del HTML
const preguntaElement = document.getElementById('preguntas');
const casillas = document.querySelectorAll('.col#casillas');
const btnRespuesta = document.getElementById('btn-respuesta');
const tituloSub = document.querySelector('.titulo-sub');
const resultado = document.querySelector(".container");


// Datos del cuestionario (reemplaza con tus propias preguntas y respuestas)
const quizData = [
    {
        pregunta: "¿Cómo se declara una variable en JavaScript?",
        respuestas: [
            "int",
            "dim",
            "var - let",
            "for - while"
        ],
        respuestaCorrecta: 2 // Índice de la respuesta correcta (basado en 0)
    },
];

// Índice de la pregunta actual
let currentQuestionIndex = 0;
let puntaje = 0; // Inicializar el puntaje
const totalPreguntas = quizData.length;

// Mezclar las preguntas aleatoriamente
function cambiarOrdendelArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

cambiarOrdendelArray(quizData);

// Función para cargar la pregunta actual
function loadQuestion() {

    const currentQuestion = quizData[currentQuestionIndex];

    // Actualizar el texto de la pregunta
    preguntaElement.textContent = currentQuestion.pregunta;

    // Actualizar las opciones de respuesta
    casillas.forEach((casilla, index) => {
        casilla.textContent = currentQuestion.respuestas[index];
        casilla.classList.remove('seleccionada'); // Quitar la clase 'seleccionada' de todas las casillas
    });

    // Actualizar el número de pregunta
    tituloSub.textContent = `Pregunta ${currentQuestionIndex + 1} de ${quizData.length}`;
    btnRespuesta.textContent = "Responder"; // Inicializar el texto del botón


}

// Función para manejar la selección de una respuesta
function seleccionarRespuesta(event) {
    const casillaSeleccionada = event.target;

    // Quitar la clase 'seleccionada' de todas las casillas
    casillas.forEach(casilla => casilla.classList.remove('seleccionada'));

    // Agregar la clase 'seleccionada' a la casilla seleccionada
    casillaSeleccionada.classList.add('seleccionada');
}

// Función para verificar la respuesta y avanzar a la siguiente pregunta
function checkAnswer() {
    const respuestaSeleccionada = document.querySelector('.seleccionada');
  
    // Quitar el borde blanco a todas las casillas
    casillas.forEach(casilla => casilla.classList.remove('seleccionada'));
  
    // Agregar la clase de animación correspondiente
    if (respuestaSeleccionada) {
      const indiceRespuestaSeleccionada = Array.from(casillas).indexOf(respuestaSeleccionada);
      const respuestaCorrecta = quizData[currentQuestionIndex].respuestaCorrecta;
  
      if (indiceRespuestaSeleccionada === respuestaCorrecta) {
        respuestaSeleccionada.classList.add('animate__animated', 'animate__bounceIn', 'correcta');
      } else {
        respuestaSeleccionada.classList.add('animate__animated', 'animate__shakeX', 'incorrecta');
      }
  
      if (indiceRespuestaSeleccionada === respuestaCorrecta) {
        puntaje++;
      }
  
      progressBar(totalPreguntas);
  
      // Avanzar a la siguiente pregunta o mostrar el resultado final
      setTimeout(() => {
        currentQuestionIndex++;
  
        // Quitar las clases de animación y borde
        casillas.forEach(casilla => {
          casilla.classList.remove('animate__animated', 'animate__bounceIn', 'animate__shakeX', 'correcta', 'incorrecta');
        });
  
        if (currentQuestionIndex >= quizData.length) {
          // Mostrar los resultados
          showResult();
        } else {
          // Cargar la siguiente pregunta
          loadQuestion();
        }
      }, 2000);
    } else {
      // Si no se ha seleccionado ninguna respuesta
      if (btnRespuesta.textContent === "Responder") {
        alert('Por favor, selecciona una respuesta');
      }
    }
  }


//funcion para crear la barra de progreso
function progressBar(totalPreguntas) {
    let bar = document.getElementById('barra');
    let incrementoPorPregunta = 100 / totalPreguntas; // Calcula el incremento por pregunta
    let currentWidth = parseInt(bar.style.width.replace('%', '')) || 0;
  
    currentWidth += incrementoPorPregunta;
  
    if (currentWidth >= 100) {
      currentWidth = 100;
      bar.classList.add('barra-final');
    }
  
    bar.style.width = currentWidth + '%';
  }

// Función para mostrar el resultado final
function showResult() {
    resultado.innerHTML = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <!-- Bootstrap -->
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
      crossorigin="anonymous"
    />
    <!-- google font -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
      rel="stylesheet"
    />
    <link rel="stylesheet" href="/css/style.css"/>
  </head>
  <body>
    <section class="container row center">
      <nav class="nav-bar p-5">
        <i class="fa-solid fa-sun"></i>
        <i class="fa-solid fa-toggle-on"></i>
        <i class="fa-regular fa-moon"></i>
      </nav>
      
          <div class="col-lg-6 media-title">
            <p class="titulo">
              Felicidades
              <span><br />Has completado el cuestionario con: </span>
            </p>
          </div>
          <div class="col temas">
              <div class="col-11 col text-center align-items-center h-auto" >
                <div class="score" style="font-size: 9rem;" id="preguntas">${puntaje}</div>
                <p class="titulo-sub">respuestas buenas de ${quizData.length}.</p>
              </div>
              <button class="col col" id="btn-respuesta" onclick="location.reload()">Jugar de nuevo</button>
              <button class="col col" id="btn-respuesta" onclick="volverAlInicio()">Volver al inicio</button>
            </div>
          </div>
        </section>
    
    <script
      src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
      integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
      crossorigin="anonymous"
    ></script>
    <script
      src="https://kit.fontawesome.com/7b866cf1b9.js"
      crossorigin="anonymous"
    ></script>
  </body>
</html>`;
}

// Agregar eventos a las casillas y al botón
casillas.forEach(casilla => {
    casilla.addEventListener('click', seleccionarRespuesta);
});
btnRespuesta.addEventListener('click', checkAnswer);

// Cargar la pregunta inicial
loadQuestion();

function volverAlInicio() {
    window.location.href = "/index.html";
  }

const style = document.createElement('style');
style.innerHTML = `
.seleccionada { border: 2px solid white; }
.correcta { border: 2px solid green; }
.incorrecta { border: 2px solid red; }
`;
document.head.appendChild(style);

