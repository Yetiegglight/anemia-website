const questions = [
    {
        question: "¿Cuál es una de las causas más comunes de anemia?",
        answers: [
            "Deficiencia de hierro",
            "Comer frutas",
            "Beber agua",
            "Dormir demasiado"
        ],
        correct: 0
    },
    {
        question: "¿Qué vitamina ayuda a absorber mejor el hierro vegetal?",
        answers: [
            "Vitamina C",
            "Vitamina D",
            "Vitamina K",
            "Vitamina A"
        ],
        correct: 0
    },
    {
        question: "¿Cuál de estos alimentos es una fuente de hierro?",
        answers: [
            "Sangrecita",
            "Gaseosa",
            "Caramelo",
            "Agua"
        ],
        correct: 0
    },
    {
        question: "¿Cuál de estas bebidas puede reducir la absorción del hierro?",
        answers: [
            "Té",
            "Agua",
            "Limonada",
            "Jugo de naranja"
        ],
        correct: 0
    },
    {
        question: "¿Cómo se confirma la anemia?",
        answers: [
            "Mirando la piel",
            "Con una evaluación de salud y, cuando corresponde, un análisis de sangre",
            "Con un reloj inteligente",
            "Con una prueba de internet"
        ],
        correct: 1
    }
];

let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;

const quizContent = document.getElementById("quizContent");
const nextButton = document.getElementById("nextButton");
const progressBar = document.getElementById("progressBar");
const quizResult = document.getElementById("quizResult");

function loadQuestion() {

    const question = questions[currentQuestion];

    selectedAnswer = null;

    quizContent.innerHTML = `
        <div class="question-number">
            PREGUNTA ${currentQuestion + 1} DE ${questions.length}
        </div>

        <h3 class="quiz-question">
            ${question.question}
        </h3>

        <div class="answers">
            ${question.answers.map((answer, index) => `
                <button class="answer" data-index="${index}">
                    ${answer}
                </button>
            `).join("")}
        </div>
    `;

    const answerButtons = document.querySelectorAll(".answer");

    answerButtons.forEach(button => {

        button.addEventListener("click", function () {

            answerButtons.forEach(btn => {
                btn.classList.remove("selected");
            });

            this.classList.add("selected");

            selectedAnswer = Number(this.dataset.index);

        });

    });

    const progress =
        (currentQuestion / questions.length) * 100;

    progressBar.style.width = `${progress}%`;

    if (currentQuestion === questions.length - 1) {
        nextButton.textContent = "Ver resultado";
    } else {
        nextButton.textContent = "Siguiente";
    }
}


nextButton.addEventListener("click", function () {

    if (selectedAnswer === null) {
        alert("Selecciona una respuesta primero.");
        return;
    }

    if (selectedAnswer === questions[currentQuestion].correct) {
        score++;
    }

    currentQuestion++;

    if (currentQuestion < questions.length) {

        loadQuestion();

    } else {

        showResult();

    }
});


function showResult() {

    progressBar.style.width = "100%";

    let message = "";

    if (score === 5) {
        message = "¡Excelente! Conoces muy bien cómo prevenir la anemia.";
    } 
    else if (score >= 3) {
        message = "¡Buen trabajo! Conoces los conceptos principales.";
    } 
    else {
        message = "Buen intento. Puedes revisar la información y volver a intentarlo.";
    }

    quizContent.innerHTML = `
        <div style="text-align:center; padding:20px;">
            <div style="font-size:4rem;">🎉</div>
            <h2>¡Quiz terminado!</h2>
            <p>Obtuviste <strong>${score} de ${questions.length}</strong> respuestas correctas.</p>
            <p>${message}</p>
        </div>
    `;

    nextButton.style.display = "none";

    quizResult.style.display = "block";

    quizResult.innerHTML = `
        <button class="button primary" id="restartButton">
            Intentar otra vez
        </button>
    `;

    document
        .getElementById("restartButton")
        .addEventListener("click", restartQuiz);
}


function restartQuiz() {

    currentQuestion = 0;
    score = 0;

    nextButton.style.display = "inline-flex";

    quizResult.style.display = "none";

    loadQuestion();
}


loadQuestion();