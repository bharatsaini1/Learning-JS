const questions = [
    {
        question: "What is the capital of France?",
        answers: [
            { answer: "Berlin", correct: false },
            { answer: "Madrid", correct: false },
            { answer: "Paris", correct: true },
            { answer: "Rome", correct: false }
        ]
    },
    {
        question: "What is the largest planet in our solar system?",
        answers: [
            { answer: "Earth", correct: false },
            { answer: "Jupiter", correct: true },
            { answer: "Mars", correct: false },
            { answer: "Saturn", correct: false }
        ]
    },
    {
        question: "What is the chemical symbol for gold?",
        answers: [
            { answer: "Au", correct: true },
            { answer: "Ag", correct: false },
            { answer: "Fe", correct: false },
            { answer: "Pb", correct: false }
        ]
    },
    {
        question: "What is the largest mammal in the world?",
        answers: [
            { answer: "Elephant", correct: false },
            { answer: "Blue Whale", correct: true },
            { answer: "Giraffe", correct: false },
            { answer: "Great White Shark", correct: false }
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-button");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerText = "Next";
    nextButton.classList.add("hide");
    showQuestion();
}

function showQuestion() {
    resetState();

    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerText = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.answer;
        button.classList.add("btn");
        answerButtons.appendChild(button);

        button.addEventListener("click", () => {
            selectAnswer(button, answer.correct);
        });
    });
}

function resetState() {
    nextButton.classList.add("hide");
    answerButtons.innerHTML = "";
}

function selectAnswer(button, isCorrect) {
    const buttons = answerButtons.children;

    for (let btn of buttons) {
        btn.disabled = true;
        const correct = questions[currentQuestionIndex].answers.find(a => a.correct).answer;
        if (btn.innerText === correct) {
            btn.classList.add("correct");
        } else {
            btn.classList.add("incorrect");
        }
    }

    if (isCorrect) {
        score++;
    }

    nextButton.classList.remove("hide");
}

nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
});

function showScore() {
    resetState();
    questionElement.innerText = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerText = "Play Again";
    nextButton.classList.remove("hide");

    nextButton.addEventListener("click", startQuiz);
}

// Start the quiz on page load
startQuiz();
