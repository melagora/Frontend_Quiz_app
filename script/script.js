const temasDiv = document.querySelector(".col temas");

temasDiv.addEventListener("click", () => {
  // Replace "https://example.com" with the actual URL you want to redirect to
  window.location.href = "https://google.com";
});

const question = [
    {
        question: "acá va la pregunta 1 sobre html",
        answers: [
            { text: "respuesta1", correct: false },
            { text: "respuesta2", correct: true },
            { text: "respuesta3", correct: false },
            { text: "respuesta4", correct: false },
        ]
    }
]

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function starQuiz (){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState(); // Assuming you have a function to reset the answer buttons
  
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
  
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
  
    currentQuestion.answers.forEach(answer => {
      const button = document.createElement("button");
      button.innerHTML = answer.text;
      button.classList.add("btn");   
  
      answerButton.appendChild(button);   
  
    });
  }

starQuiz();