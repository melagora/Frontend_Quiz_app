// Obtener los elementos del HTML
const preguntaElement = document.getElementById('preguntas');
const casillas = document.querySelectorAll('.col#casillas');
const btnRespuesta = document.getElementById('btn-respuesta');
const tituloSub = document.querySelector('.titulo-sub');
const resultado = document.getElementById('resultado'); // Elemento para mostrar el resultado

// Datos del cuestionario (reemplaza con tus propias preguntas y respuestas)
const quizData = [
    {
        pregunta: "Pregunta 1",
        respuestas: [
            "Respuesta 1",
            "Respuesta 2",
            "Respuesta 3",
            "Respuesta 4"
        ],
        respuestaCorrecta: 2 // Índice de la respuesta correcta (basado en 0)
    },
    {
        pregunta: "Pregunta 2",
        respuestas: [
            "Respuesta 1",
            "Respuesta 2",
            "Respuesta 3",
            "Respuesta 4"
        ],
        respuestaCorrecta: 2 // Índice de la respuesta correcta (basado en 0)
    },
    {
        pregunta: "Pregunta 3",
        respuestas: [
            "Respuesta 1",
            "Respuesta 2",
            "Respuesta 3",
            "Respuesta 4"
        ],
        respuestaCorrecta: 3 // Índice de la respuesta correcta (basado en 0)
    },
    // Agrega más preguntas y respuestas aquí
];

// Índice de la pregunta actual
let currentQuestionIndex = 0;
let puntaje = 0; // Inicializar el puntaje

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
    btnRespuesta.textContent = "Respuesta"; // Inicializar el texto del botón


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
    if (!respuestaSeleccionada) {
        alert('Por favor, selecciona una respuesta');
        return;
    }

    const indiceRespuestaSeleccionada = Array.from(casillas).indexOf(respuestaSeleccionada);
    const respuestaCorrecta = quizData[currentQuestionIndex].respuestaCorrecta;

    // Quitar el borde blanco a todas las casillas
    casillas.forEach(casilla => casilla.classList.remove('seleccionada'));

    // Agregar la clase de animación correspondiente
    if (indiceRespuestaSeleccionada === respuestaCorrecta) {
        respuestaSeleccionada.classList.add('animate__animated', 'animate__bounceIn');
        respuestaSeleccionada.classList.add('correcta');
    } else {
        respuestaSeleccionada.classList.add('animate__animated', 'animate__shakeX');
        respuestaSeleccionada.classList.add('incorrecta');
    }

    if (indiceRespuestaSeleccionada === respuestaCorrecta) {
        puntaje++; // Incrementar el puntaje si la respuesta es correcta
    }

    // Avanzar a la siguiente pregunta o mostrar el resultado final después de la animación
    setTimeout(() => {
        currentQuestionIndex++;
        // Quitar las clases de animación y borde
        casillas.forEach(casilla => {
            casilla.classList.remove('animate__animated', 'animate__bounceIn', 'animate__shakeX', 'correcta', 'incorrecta');
        });

        if (currentQuestionIndex === quizData.length) {
            // Si es la última pregunta, cambiar el texto del botón
            btnRespuesta.textContent = "Continuar";
        } else {
            loadQuestion();
        }
    }, 2000); // Esperar 2 segundos para la animación
}

function showResult() {
    resultado.textContent = `¡Has obtenido ${puntaje} puntos de ${quizData.length}!`;

    // Mostrar un resumen detallado del desempeño (opcional)
    // ...
}

// Agregar eventos a las casillas y al botón
casillas.forEach(casilla => {
    casilla.addEventListener('click', seleccionarRespuesta);
});
btnRespuesta.addEventListener('click', checkAnswer);

// Cargar la pregunta inicial
loadQuestion();

// Botón para reiniciar el cuestionario
const btnReiniciar = document.getElementById('btn-reiniciar');
btnReiniciar.addEventListener('click', () => {
    currentQuestionIndex = 0;
    puntaje = 0;
    loadQuestion();
    resultado.textContent = '';
});

const style = document.createElement('style');
style.innerHTML = `
.seleccionada { border: 2px solid white; }
.correcta { border: 2px solid green; }
.incorrecta { border: 2px solid red; }
`;
document.head.appendChild(style);

