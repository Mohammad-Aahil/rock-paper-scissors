const rockBtn = document.querySelector('.rock-btn');
rockBtn.addEventListener('click', () => {
  playGame('Rock');
});

const paperBtn = document.querySelector('.paper-btn');
paperBtn.addEventListener('click', () => {
  playGame('Paper');
});

const scissorBtn = document.querySelector('.scissor-btn');
scissorBtn.addEventListener('click', () => {
  playGame('Scissors');
});

let isAutoPlay = false;
let intervalId;

function autoGame() {
  if (!isAutoPlay) {
    intervalId = setInterval(() => {
      const userMove = pickCompMove();
      playGame(userMove);
    }, 2000);
    isAutoPlay = true;
  } else {
    clearInterval(intervalId);
    isAutoPlay = false;
  }
}

const Score = JSON.parse(localStorage.getItem('Score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

function playGame(userMove) {
  const compMove = pickCompMove();
  let result = '';

  if (userMove === 'Scissors') {
    if (compMove === 'Rock') result = 'You Lose';
    else if (compMove === 'Paper') result = 'You Win';
    else result = 'Tie';
  }

  if (userMove === 'Paper') {
    if (compMove === 'Rock') result = 'You Win';
    else if (compMove === 'Scissors') result = 'You Lose';
    else result = 'Tie';
  }

  if (userMove === 'Rock') {
    if (compMove === 'Paper') result = 'You Lose';
    else if (compMove === 'Scissors') result = 'You Win';
    else result = 'Tie';
  }

  if (result === 'You Win') Score.wins++;
  else if (result === 'You Lose') Score.losses++;
  else Score.ties++;

  localStorage.setItem('Score', JSON.stringify(Score));

  document.querySelector('.result-para').innerHTML = result;
  document.querySelector('.moves-para').innerHTML =
    `You Pick <img src="img/${userMove}.jpg" class="move-icon">
     and Computer Pick <img src="img/${compMove}.jpg" class="move-icon">`;

  updateScore();
}

function updateScore() {
  document.querySelector('.scores-para')
    .innerHTML = `Wins: ${Score.wins} Losses: ${Score.losses} Ties: ${Score.ties}`;
}

function pickCompMove() {
  const randomNum = Math.floor(Math.random() * 3) + 1;
  if (randomNum === 1) return 'Rock';
  if (randomNum === 2) return 'Paper';
  return 'Scissors';
}

function resetScore() {
  Score.wins = 0;
  Score.losses = 0;
  Score.ties = 0;
  localStorage.removeItem('Score');
  updateScore();
}


