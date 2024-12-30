// Example set of 100 questions (simplified for the demonstration)
const questions = [
    {
        question: "What is the meaning of the word <strong>الفيل (Al-Fil)</strong>?",
        options: ["The Elephant", "The Lion", "The Camel"],
        correctAnswer: "The Elephant",
        audio: "audio/alfil.mp3"
    },
    {
        question: "What is the meaning of the word <strong>الْقَلَم (Al-Qalam)</strong>?",
        options: ["The Book", "The Pen", "The Light"],
        correctAnswer: "The Pen",
        audio: "audio/alqalam.mp3"
    },
    // Add 98 more questions here
];

let currentQuestionIndex = 0;
let userAnswers = [];

// Function to load the current question
function loadQuestion() {
    const questionContainer = document.getElementById('question-container');
    const questionData = questions[currentQuestionIndex];

    // Reset the timer
    timeLeft = 60;
    document.getElementById('timer').textContent = `Time Left: ${timeLeft}s`;
    clearInterval(timer);  // Clear any previous timer
    startTimer();  // Start the new timer for this question

    questionContainer.innerHTML = `
        <p>${questionData.question}</p>
        <button onclick="playAudio('${questionData.audio}')">Listen</button>
        <br>
        ${questionData.options.map(option =>
        `<input type="radio" name="answer" value="${option}"> ${option}<br>`
    ).join('')}
    `;
}
// Function to start the countdown timer
function startTimer() {
    timer = setInterval(() => {
        timeLeft--;  // Decrease time by 1 second
        document.getElementById('timer').textContent = `Time Left: ${timeLeft}s`;

        if (timeLeft <= 0) {
            // Time's up, move to next question
            clearInterval(timer);
            nextQuestion();
        }
    }, 1000);  // Update every second
}

// Function to play the audio
function playAudio(audioFile) {
    let audio = new Audio(audioFile);
    audio.play();
}

// Function to check if the selected answer is correct
function checkAnswer() {
    const selectedAnswer = document.querySelector('input[name="answer"]:checked');
    if (selectedAnswer) {
        userAnswers.push({
            question: questions[currentQuestionIndex].question,
            selectedAnswer: selectedAnswer.value,
            correct: selectedAnswer.value === questions[currentQuestionIndex].correctAnswer
        });
    }
}

// Function to move to the next question
function nextQuestion() {
    checkAnswer(); // Record the current answer

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        loadQuestion();
        document.getElementById("feedback").style.display = "none"; // Hide feedback
    } else {
        showResults();
    }
}

// Function to show the results at the end
function showResults() {
    const feedback = document.getElementById("feedback");
    let resultText = "Test Completed! Here's how you did:<br>";

    userAnswers.forEach((answer, index) => {
        resultText += `<b>Question ${index + 1}:</b> ${answer.selectedAnswer} - ${answer.correct ? 'Correct' : 'Incorrect'}<br>`;
    });

    feedback.innerHTML = resultText;
    feedback.style.display = "block";
}

// Initialize the first question
loadQuestion();
