function openPage2() {
    document.getElementById('page1').style.display = 'none';
    document.getElementById('page2').style.display = 'block';
  }
  
  function exitGame() {
    if (confirm('Are you sure you want to exit?')) {
      alert('Thanks for playing!');
      window.close();
    }
  }
  

function startHumanGame() {
  window.location.href = "game.html";
}

function showDifficultyPopup() {
    document.getElementById('page2').style.display = 'none';
    document.getElementById('aiDifficultyPopup').style.display = 'block';
}

function startAIGame(difficulty) {
  // Logic to start the AI game with the selected difficulty
  let targetPage;

  switch (difficulty) {
      case 'Easy':
          targetPage = 'gameEasy.html';
          break;
      case 'Difficult':
          targetPage = 'gameDifficult.html';
          break;
      case 'Expert':
          targetPage = 'gameExpert.html';
          break;
  }

  if (targetPage) {
      window.location.href = targetPage;
  }
}

function goBack() {
  if (window.history.length > 1) {
    window.history.back();
  } else {
    document.getElementById('page1').style.display = 'block';
    document.getElementById('page2').style.display = 'none';
    document.getElementById('aiDifficultyPopup').style.display = 'none';
  }
}