window.addEventListener("load", function () {
    const loader = document.getElementById("loader");
    if (loader) {
        loader.style.display = "none";
    }
});

document.addEventListener("DOMContentLoaded", () => {


    // ELEMENTS

    const questionElement = document.getElementById("question");
    const optionsElement = document.getElementById("options");
    const nextBtn = document.getElementById("nextBtn");
    const submitBtn = document.getElementById("submitBtn");
    const timerElement = document.getElementById("timer");
    const progressBar = document.getElementById("progress");
    const quizContainer = document.getElementById("quiz-container");

    const correctSound = document.getElementById("correctSound");
    const wrongSound = document.getElementById("wrongSound");
    


    // QUIZ DATA FOR CSC4745

    let questions = [
        {
            question: "What does HCI stand for?",
            options: [
                "Human Computer Interaction",
                "High Computer Interface",
                "Human Communication Interface",
                "Hybrid Computer Interaction"
            ],
            answer: "Human Computer Interaction"
        },
        {
            question: "Which principle focuses on ease of use?",
            options: [
                "Usability",
                "Complexity",
                "Latency",
                "Encryption"
            ],
            answer: "Usability"
        },
        {
            question: "Which is a multimedia element?",
            options: [
                "Text",
                "Image",
                "Audio",
                "All of the above"
            ],
            answer: "All of the above"
        },
        {
            question: "Feedback in HCI helps users to?",
            options: [
                "Understand system status",
                "Hack the system",
                "Slow performance",
                "Confuse navigation"
            ],
            answer: "Understand system status"
        },
        {
            question: "Which improves accessibility?",
            options: [
                "Alt text for images",
                "Hidden buttons",
                "Low contrast colors",
                "Small fonts"
            ],
            answer: "Alt text for images"
        }
    ];


    // VARIABLES

    let currentQuestionIndex = 0;
    let score = 0;
    let selectedAnswer = null;
    let timer;
    let timeLeft = 10;


    // RANDOMIZE QUESTIONS

    function shuffle(array) {
        return array.sort(() => Math.random() - 0.5);
    }

    questions = shuffle(questions);

// LOAD QUESTION

function loadQuestion() {

    clearInterval(timer);
    timeLeft = 10;

    if (!questionElement) return;

    const currentQuestion = questions[currentQuestionIndex];

    // Morph out
    quizContainer.classList.remove("fade-in");
    quizContainer.classList.add("fade-out");

    setTimeout(() => {

        questionElement.innerText = currentQuestion.question;
        optionsElement.innerHTML = "";
        selectedAnswer = null;

        shuffle(currentQuestion.options).forEach(option => {
            const button = document.createElement("button");
            button.innerText = option;
            button.classList.add("option-btn");

            button.addEventListener("click", () => {
                selectedAnswer = option;

                document.querySelectorAll(".option-btn").forEach(btn => {
                    btn.classList.remove("selected");
                });

                button.classList.add("selected");
            });

            optionsElement.appendChild(button);
        });

        updateProgress();   // ✅ correct place
        startTimer();

        quizContainer.classList.remove("fade-out");
        quizContainer.classList.add("fade-in");

    }, 300);
}





    // TIMER

    function startTimer() {
        if (!timerElement) return;

        timerElement.innerText = timeLeft;

        timer = setInterval(() => {
            timeLeft--;
            timerElement.innerText = timeLeft;

            if (timeLeft <= 0) {
                clearInterval(timer);
                nextQuestion();
            }
        }, 1000);
    }


    // NEXT QUESTION
    function nextQuestion() {

        if (selectedAnswer) {
            if (selectedAnswer === questions[currentQuestionIndex].answer) {
                score++;
                correctSound.play();
            } else {
                wrongSound.play();
            }
        }

        currentQuestionIndex++;

        if (currentQuestionIndex < questions.length) {
            loadQuestion();
        } else {
            showResults();
        }
    }


// PROGRESS BAR

function updateProgress() {
    if (!progressBar) return;

    const progressPercent = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressBar.style.width = progressPercent + "%";
}

    
    // RESULTS

    function showResults() {
        quizContainer.innerHTML = `
            <h2>Quiz Completed 🎉</h2>
            <p>Your Score: ${score} / ${questions.length}</p>
            <button onclick="location.reload()">Restart</button>
        `;
    }

    
    // EVENT LISTENER
    
    if (nextBtn) {
        nextBtn.addEventListener("click", nextQuestion);
    }

    // START
    loadQuestion();
});

// Video playing when the pointer hovers on it.

document.addEventListener("DOMContentLoaded", function () {

    const videos = document.querySelectorAll(".hover-video");

    videos.forEach(function(video){

        video.addEventListener("mouseover", function(){
            video.play();
        });

        video.addEventListener("mouseout", function(){
            video.pause();
            video.currentTime = 0;
        });

    });

});

