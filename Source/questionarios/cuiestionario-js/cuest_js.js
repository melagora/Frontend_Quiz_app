// Obtener los elementos del HTML
const preguntaElement = document.getElementById('preguntas');
const casillas = document.querySelectorAll('.col#casillas');
const btnRespuesta = document.getElementById('btn-respuesta');
const tituloSub = document.querySelector('.titulo-sub');
const resultado = document.getElementById('resultado'); // Elemento para mostrar el resultado

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
    {
        pregunta: "¿Cuál es el método utilizado para convertir una cadena de texto a un número entero en JavaScript?",
        respuestas: [
            "parseInt()",
            "Number()",
            "toInt()",
            "convert()"
        ],
        respuestaCorrecta: 0 // Índice de la respuesta correcta (basado en 0)
    },
    {
        pregunta: "¿Qué método de JavaScript se usa para seleccionar un elemento por su ID?",
        respuestas: [
            "getElementById()",
            "querySelector()",
            "getElementByClass()",
            "getById()"
        ],
        respuestaCorrecta: 0 // Índice de la respuesta correcta (basado en 0)
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

    // Quitar el borde blanco a todas las casillas
    casillas.forEach(casilla => casilla.classList.remove('seleccionada'));

    // Agregar la clase de animación correspondiente
    if (respuestaSeleccionada) {
        const indiceRespuestaSeleccionada = Array.from(casillas).indexOf(respuestaSeleccionada);
        const respuestaCorrecta = quizData[currentQuestionIndex].respuestaCorrecta;

        if (indiceRespuestaSeleccionada === respuestaCorrecta) {
            respuestaSeleccionada.classList.add('animate__animated', 'animate__bounceIn');
            respuestaSeleccionada.classList.add('correcta');
        } else {
            respuestaSeleccionada.classList.add('animate__animated', 'animate__shakeX');
            respuestaSeleccionada.classList.add('incorrecta');
        }

        if (indiceRespuestaSeleccionada === respuestaCorrecta) {
            puntaje++;
        }

        // Avanzar a la siguiente pregunta o mostrar el resultado final después de la animación
        setTimeout(() => {
            currentQuestionIndex++;
            // Quitar las clases de animación y borde
            casillas.forEach(casilla => {
                casilla.classList.remove('animate__animated', 'animate__bounceIn', 'animate__shakeX', 'correcta', 'incorrecta');
            });

            if (currentQuestionIndex === quizData.length) {
                // Si es la última pregunta, mostrar una alerta con el puntaje
                alert(`¡Has obtenido ${puntaje} puntos de ${quizData.length} posibles!`);

                // Cambiar el texto del botón y redirigir
                btnRespuesta.textContent = "Volver al inicio";
                btnRespuesta.onclick = () => {
                    if (btnRespuesta.textContent === "Volver al inicio") {
                        window.location.href = "/Frontend_Quiz_app/index.html";
                    } else {
                        // Solo verificar la respuesta si el botón dice "Respuesta"
                        const respuestaSeleccionada = document.querySelector('.seleccionada');
                        if (!respuestaSeleccionada) {
                            alert('Por favor, selecciona una respuesta');
                            return;
                        }
                        // ... resto de la lógica de checkAnswer ...
                    }
                };
            } else {
                loadQuestion();
            }
        }, 2000);
    } else {
        // Si no se ha seleccionado ninguna respuesta y el botón dice "Respuesta"
        if (btnRespuesta.textContent === "Respuesta") {
            alert('Por favor, selecciona una respuesta');
        }
    }
}

// Agregar eventos a las casillas y al botón
casillas.forEach(casilla => {
    casilla.addEventListener('click', seleccionarRespuesta);
});
btnRespuesta.addEventListener('click', checkAnswer);

// Cargar la pregunta inicial
loadQuestion();

const style = document.createElement('style');
style.innerHTML = `
.seleccionada { border: 2px solid white; }
.correcta { border: 2px solid green; }
.incorrecta { border: 2px solid red; }
`;
document.head.appendChild(style);

