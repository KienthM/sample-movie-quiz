document.addEventListener('DOMContentLoaded', () => {
  const questions = [
    { question: "Who directed 'Schindler's List'?", answers: ["Steven Spielberg", "Spielberg"] },
    { question: "Who starred as the main character in 'The Revenant'?", answers: ["Leonardo DiCaprio", "Leonardo Dicaprio"] },
    { question: "What is the title of the second 'Lord of the Rings' movie?", answers: ["The Two Towers", "Two Towers"] },
    { question: "Which movie features the song 'Circle of Life'?", answers: ["The Lion King", "Lion King"] },
    { question: "Who played 'Maximus' in 'Gladiator'?", answers: ["Russell Crowe"] },
    { question: "What is the name of the elf played by Orlando Bloom in 'The Lord of the Rings'?", answers: ["Legolas"] },
    { question: "In which movie does the character 'Travis Bickle' appear?", answers: ["Taxi Driver"] },
    { question: "Who voiced the character 'Dory' in 'Finding Nemo'?", answers: ["Ellen DeGeneres", "Ellen Degeneres", "Ellen"] },
    { question: "What is the name of the spaceship in 'Star Wars: A New Hope'?", answers: ["Millennium Falcon", "Falcon"] },
    { question: "Who played 'James Bond' in the movie 'GoldenEye'?", answers: ["Pierce Brosnan", "Brosnan"] },
    { question: "Which movie features a hotel called 'The Overlook'?", answers: ["The Shining", "Shining"] },
    { question: "What is the name of the main character in 'Die Hard'?", answers: ["John McClane", "McClane"] },
    { question: "Who starred as 'Wolverine' in the X-Men movies?", answers: ["Hugh Jackman"] },
    { question: "Which animated movie features a panda named 'Po'?", answers: ["Kung Fu Panda", "Po"] },
    { question: "Who directed 'Inception'?", answers: ["Christopher Nolan", "Nolan"] },
    { question: "What is the name of the fictional kingdom in 'Frozen'?", answers: ["Arendelle"] },
    { question: "Who played 'Hannibal Lecter' in 'The Silence of the Lambs'?", answers: ["Anthony Hopkins"] },
    { question: "What is the name of the school for mutants in 'X-Men'?", answers: ["Xavier's School for Gifted Youngsters", "Xavier's School"] },
    { question: "Which movie features the song 'Footloose'?", answers: ["Footloose"] },
    { question: "Who played 'Captain John H. Miller' in 'Saving Private Ryan'?", answers: ["Tom Hanks"] }
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
      resultsContainer.innerText += "\nCongratulations! You passed and can proceed to the hard level.";
      nextButton.innerText = "Next Level";
      nextButton.onclick = () => window.location.href = 'quiz-page-hard.html';
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
