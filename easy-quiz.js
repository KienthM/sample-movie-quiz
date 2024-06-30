document.addEventListener('DOMContentLoaded', () => {
  const questions = [
    { question: "Who directed 'Pulp Fiction'?", answers: ["Quentin Tarantino"] },
    { question: "Who starred as the main character in 'Titanic'?", answers: ["Leonardo DiCaprio","Leonardo Dicaprio"] },
    { question: "What is the title of the first 'Harry Potter' movie?", answers: ["Harry Potter and the Philosopher's Stone", "Harry Potter and the Sorcerer's Stone"] },
    { question: "Which movie features the song 'My Heart Will Go On'?", answers: ["Titanic"] },
    { question: "Who played 'Forrest Gump'?", answers: ["Tom Hanks"] },
    { question: "What is the name of the hobbit played by Elijah Wood in 'The Lord of the Rings'?", answers: ["Frodo Baggins", "Frodo"] },
    { question: "In which movie does the character 'Jack Sparrow' appear?", answers: ["Pirates of the Caribbean"] },
    { question: "Who voiced the character 'Woody' in 'Toy Story'?", answers: ["Tom Hanks"] },
    { question: "What is the name of the planet where 'Avatar' is set?", answers: ["Pandora"] },
    { question: "Who played 'James Bond' in the movie 'Skyfall'?", answers: ["Daniel Craig", "Daniel","Craig"] },
    { question: "Which movie features a time-traveling DeLorean?", answers: ["Back to the Future"] },
    { question: "What is the name of the main character in 'The Matrix'?", answers: ["Neo"] },
    { question: "Who starred as 'Iron Man' in the Marvel Cinematic Universe?", answers: ["Robert Downey Jr."] },
    { question: "Which animated movie features a fish named 'Nemo'?", answers: ["Finding Nemo","Nemo"] },
    { question: "Who directed 'Jurassic Park'?", answers: ["Steven Spielberg"] },
    { question: "What is the name of the fictional African country in 'Black Panther'?", answers: ["Wakanda"] },
    { question: "Who played 'The Joker' in 'The Dark Knight'?", answers: ["Heath Ledger"] },
    { question: "What is the name of the fictional school in 'Harry Potter'?", answers: ["Hogwarts"] },
    { question: "Which movie features the song 'Let It Go'?", answers: ["Frozen"] },
    { question: "Who played 'Indiana Jones'?", answers: ["Harrison Ford"] }
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
      <input type="text" id="answer" class="answer"/>
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
      resultsContainer.innerText += "\nCongratulations! You passed and can proceed to the medium level.";
      nextButton.innerText = "Next Level";
      nextButton.onclick = () => window.location.href = 'quiz-page-medium.html';
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
