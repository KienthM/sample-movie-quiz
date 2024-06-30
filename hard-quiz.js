// hard-quiz.js
document.addEventListener('DOMContentLoaded', () => {
  const questions = [
    { question: "Who directed '2001: A Space Odyssey'?", answers: ["Stanley Kubrick", "Kubrick"] },
    { question: "Who starred as the main character in 'There Will Be Blood'?", answers: ["Daniel Day-Lewis", "Day-Lewis"] },
    { question: "Which movie features the song 'As Time Goes By'?", answers: ["Casablanca"] },
    { question: "Who played 'Tyler Durden' in 'Fight Club'?", answers: ["Brad Pitt"] },
    { question: "What is the name of the computer in '2001: A Space Odyssey'?", answers: ["HAL 9000", "HAL"] },
    { question: "In which movie does the character 'Anton Chigurh' appear?", answers: ["No Country for Old Men"] },
    { question: "Who voiced the character 'Scar' in 'The Lion King'?", answers: ["Jeremy Irons"] },
    { question: "Who directed 'Psycho'?", answers: ["Alfred Hitchcock", "Hitchcock"] },
    { question: "Which movie features a character named 'Don Vito Corleone'?", answers: ["The Godfather"] },
    { question: "What is the name of the main character in 'The Big Lebowski'?", answers: ["The Dude", "Jeffrey Lebowski"] },
    { question: "Which animated movie features a rat named 'Remy'?", answers: ["Ratatouille"] },
    { question: "Who directed 'The Grand Budapest Hotel'?", answers: ["Wes Anderson"] },
    { question: "Who played 'Michael Corleone' in 'The Godfather'?", answers: ["Al Pacino", "Al pacino", "al pacino"] },
    { question: "Which movie features the song 'Bohemian Rhapsody'?", answers: ["Bohemian Rhapsody"] },
    { question: "Who played 'Max Rockatansky' in 'Mad Max: Fury Road'?", answers: ["Tom Hardy"] },
    { question: "Who directed 'The Exorcist'?", answers: ["William Friedkin", "Friedkin"] },
    { question: "Who starred as 'Clarice Starling' in 'The Silence of the Lambs'?", answers: ["Jodie Foster"] },
    { question: "Who directed 'Hereditary'?", answers: ["Ari Aster", "Aster"] },
    { question: "Who played 'Annie Graham' in 'Hereditary'?", answers: ["Toni Collette", "Collette"] },
    { question: "What is the name of the family in 'The Texas Chain Saw Massacre'?", answers: ["Sawyer Family", "Sawyer"] }
  ];
  
  let currentQuestionIndex = 0;
  let score = 0;
  const passingScore = 18;

  // Shuffle questions
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  // Display current question
  function showQuestion() {
    const quizContainer = document.getElementById('quiz');
    quizContainer.innerHTML = '';
    const question = questions[currentQuestionIndex];

    const questionElement = document.createElement('div');
    questionElement.classList.add('question');
    questionElement.innerHTML = `
      <p id="question-list">${question.question}</p>
      <input type="text" id="answer" class="answer" />
      <p class="feedback" id="feedback"></p>
    `;
    quizContainer.appendChild(questionElement);
  }

  // Handle next question
  function handleNextQuestion() {
    const answerInput = document.getElementById('answer');
    const feedback = document.getElementById('feedback');
    const correctAnswers = questions[currentQuestionIndex].answers.map(a => a.toLowerCase());

    if (correctAnswers.includes(answerInput.value.trim().toLowerCase())) {
      score++;
      feedback.innerText = 'Correct!';
      feedback.style.color = 'green';
    } else {
      feedback.innerText = `Wrong! The correct answers are: ${questions[currentQuestionIndex].answers.join(' or ')}`;
      feedback.style.color = 'red';
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
      setTimeout(showQuestion, 1000); // Show next question after 1 second
    } else {
      showResults();
    }
  }

  // Show final results
  function showResults() {
    const quizContainer = document.getElementById('quiz');
    quizContainer.innerHTML = '';
    const resultsContainer = document.getElementById('results');
    const nextButton = document.getElementById('next');
    const retryButton = document.getElementById('retry');
    const resetButton = document.getElementById('reset');

    resultsContainer.innerText = `You scored ${score} out of ${questions.length}`;

    if (score >= passingScore) {
      resultsContainer.innerText += "\nCongratulations! You've completed the quiz.";
      nextButton.innerText = "Go to Main";
      nextButton.onclick = () => window.location.href = 'front-page.html';
    } else {
      resultsContainer.innerText += "\nSorry, you did not pass. Please try again.";
      nextButton.style.display = 'none';
      retryButton.style.display = 'block';
    }

    retryButton.style.display = 'block';
    resetButton.style.display = 'none';
  }

  // Retry quiz
  function retryQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    shuffle(questions);
    showQuestion();
    document.getElementById('results').innerText = '';
    document.getElementById('next').style.display = 'block';
    document.getElementById('retry').style.display = 'none';
    document.getElementById('reset').style.display = 'none';
  }

  // Reset quiz
  function resetQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    shuffle(questions);
    showQuestion();
    document.getElementById('results').innerText = '';
    document.getElementById('next').style.display = 'block';
    document.getElementById('retry').style.display = 'none';
    document.getElementById('reset').style.display = 'none';
  }

  document.getElementById('next').addEventListener('click', handleNextQuestion);
  document.getElementById('retry').addEventListener('click', retryQuiz);
  document.getElementById('reset').addEventListener('click', resetQuiz);

  shuffle(questions);
  showQuestion();
});
