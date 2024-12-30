// Variable to store the questions loaded from the JSON file
let questions = [];
let currentQuestionIndex = 0;
let userAnswers = [];

// Function to load the questions from the external JSON file
function loadQuestions() {
    fetch('questions.json')  // Path to your JSON file
        .then(response => response.json())
        .then(data => {
            questions = data;  // Store the data in the 'questions' array
            loadQuestion();     // Load the first question
        })
        .catch(error => console.error('Error loading the questions:', error));
}

// Function to load the current question
function loadQuestion() {
    const questionContainer = document.getElementById('question-container');
    const questionData = questions[currentQuestionIndex];

    questionContainer.innerHTML = `
        <p>${questionData.question}</p>
        <button onclick="playAudio('${questionData.audio}')">Listen</button>
        <br>
        ${questionData.options.map(option =>
        `<input type="radio" name="answer" value="${option}"> ${option}<br>`
    ).join('')}
    `;
}

// Function to play the audio for the word pronunciation
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

// Initialize the first question once the JSON is loaded
loadQuestions();
