/**
 * RIDDLE DATASET
 * Format: { question: string, options: string[], correct: index }
 */
const quizData = [
    {
        question: "Which data structure follows the FIFO principle?",
        options: ["Stack", "Queue", "Tree", "Graph"],
        correct: 1
    },
    {
        question: "What is the time complexity of binary search?",
        options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
        correct: 1
    },
    {
        question: "Which keyword is used to define a function in Python?",
        options: ["func", "define", "def", "function"],
        correct: 2
    },
    {
        question: "What is the value of 7 × (8 − 3)?",
        options: ["21", "25", "35", "40"],
        correct: 2
    },
    {
        question: "Which gas is most abundant in Earth's atmosphere?",
        options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
        correct: 2
    },
    {
        question: "Which protocol is used to transfer web pages?",
        options: ["FTP", "SMTP", "HTTP", "TCP"],
        correct: 2
    },
    {
        question: "If the radius of a circle is doubled, its area becomes:",
        options: ["Double", "Triple", "Four times", "Half"],
        correct: 2
    }
];


// STATE VARIABLES
let currentIdx = 0;
let score = 0;

// DOM ELEMENTS
const questionEl = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const counterEl = document.getElementById("question-counter");
const progressBar = document.getElementById("progress-bar");
const emojiEl = document.querySelector(".quiz-emoji");
const quizBody = document.getElementById("quiz-body");
const resultBody = document.getElementById("result-body");
const scoreDisplay = document.getElementById("score-display");

/**
 * INITIALIZE / RELOAD QUESTION
 */
function loadQuiz() {
    const currentQuiz = quizData[currentIdx];
    
    // 1. Update Emoji based on progress
    if (currentIdx === 0) emojiEl.innerText = "🤔";
    else if (currentIdx > 3 && currentIdx < 6) emojiEl.innerText = "🔥";
    else if (currentIdx === 6) emojiEl.innerText = "😱";

    // 2. Update Question Text
    questionEl.innerText = currentQuiz.question;
    
    // 3. Update Progress UI
    counterEl.innerText = `Riddle ${currentIdx + 1} of ${quizData.length}`;
    const progressPercent = (currentIdx / quizData.length) * 100;
    progressBar.style.width = `${progressPercent}%`;

    // 4. Clear and Build Option Buttons
    optionsContainer.innerHTML = "";

    currentQuiz.options.forEach((option, index) => {
        const btn = document.createElement("button");
        btn.classList.add("option-btn");
        btn.innerText = option;
        
        // Handle Answer Selection
        btn.onclick = () => {
            // Visual feedback on click
            btn.style.background = "#2f3542";
            btn.style.color = "white";
            
            // Short delay so user sees their click before moving on
            setTimeout(() => checkAnswer(index), 250);
        };
        
        optionsContainer.appendChild(btn);
    });
}

/**
 * LOGIC: CHECK ANSWER & MOVE FORWARD
 */
function checkAnswer(selectedIndex) {
    // Score Calculation
    if (selectedIndex === quizData[currentIdx].correct) {
        score++;
    }

    currentIdx++;

    // Check if there are more questions
    if (currentIdx < quizData.length) {
        loadQuiz();
    } else {
        showResults();
    }
}

/**
 * DISPLAY FINAL SCORE
 */
function showResults() {
    quizBody.classList.add("hidden");
    resultBody.classList.remove("hidden");
    
    // Update Final UI
    emojiEl.innerText = score > 4 ? "🏆" : "🥉";
    scoreDisplay.innerText = `${score} / ${quizData.length}`;
    progressBar.style.width = "100%";
    counterEl.innerText = "Riddle Challenge Over!";
}

function showResults() {
    quizBody.classList.add("hidden");
    resultBody.classList.remove("hidden");
    
    // Update Score
    scoreDisplay.innerText = `${score} / ${quizData.length}`;
    emojiEl.innerText = score > 4 ? "🏆" : "🥉";

    // Build the Correct Answers Review
    const reviewSection = document.getElementById("review-section");
    reviewSection.innerHTML = "<h3 style='margin-top:0'>Quick Review:</h3>";

    quizData.forEach((item, index) => {
        const correctText = item.options[item.correct];
        
        const reviewItem = document.createElement("div");
        reviewItem.classList.add("review-item");
        reviewItem.innerHTML = `
            <strong>Q${index + 1}:</strong> ${item.question}<br>
            <span class="correct-answer-text">✔ Correct: ${correctText}</span>
        `;
        reviewSection.appendChild(reviewItem);
    });

    progressBar.style.width = "100%";
    counterEl.innerText = "Challenge Finished!";
}

// Start the app!
loadQuiz();