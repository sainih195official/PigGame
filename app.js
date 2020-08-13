/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer,lastDice;
var winningScore;
var diceDOM = document.querySelector('.dice');

init();

document.querySelector('.btn-roll').addEventListener('click',function() {
    
    // 1. random number
    var dice = Math.floor(Math.random() * 6) + 1;

    // 2. display the result
    
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';

    // 3. update the round score if the round score is not 1
    if(lastDice === 6 && dice === 6){
        //player looses all his global scores
        scores[activePlayer] = 0;
        document.querySelector('#score-' + activePlayer).textContent = '0';
        nextPlayer();
    } else if (dice !== 1){

        roundScore += dice;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;  
    
    } else {
        
        //next player
        nextPlayer();
    }
    
    lastDice = dice;
});

document.querySelector('.btn-hold').addEventListener('click',function(){

    //add current score score to global  score
    scores[activePlayer] += roundScore;

    //update the ui
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    //check if player won the game
    if(scores[activePlayer] >= winningScore){
        document.querySelector('#name-'+ activePlayer).textContent = '!!!Winner!!!';
        diceDOM.style.display = 'none';
        document.querySelector('.player-'+ activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-'+ activePlayer + '-panel').classList.remove('active');
        document.querySelector('.btn-roll').disabled = true;
        document.querySelector('.btn-hold').disabled = true; 
        document.querySelector('.btn-score').disabled = true; 
        document.querySelector('.final-score').disabled = true; 

    }
    else{

        //next player
        nextPlayer();
    }

    
});

function nextPlayer(){
    document.querySelector('#current-' + activePlayer).textContent = 0;
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;       
    roundScore = 0;
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
    diceDOM.style.display = 'none'; 
};

document.querySelector('.btn-score').addEventListener('click',function(){

// winning score update    
winningScoreUpdator();
    
});

document.querySelector('.final-score').addEventListener('keypress',function(e){

    if (e.key === 'Enter') {        
        // winning score update 
        document.querySelector('.btn-score').click();
      }    
        
    });

function winningScoreUpdator(){

    var input = parseInt(document.querySelector('.final-score').value);
    var greaterScore = (scores[0] > scores[1]) ? scores[0] : scores[1];

    if( (input <= greaterScore && input > 0) || isNaN(input) || input < 0 ){
    
    if(!isNaN(input) && input > 0){    
    alert('Winninig Score cannot be less than '+ (greaterScore + 7));
    } else if(input<0){
    alert('Winninig Score cannot be less than 0');
    }else{    
    alert('Winninig Score cannot contain Alphabatical Letters or Symbols ');    
    }
    
    input = parseInt(prompt("Enter Score Greater or Equal to " + (greaterScore + 7)));
    while(input < (greaterScore + 7) || isNaN(input)){
        input = parseInt(prompt("Try Again...!!! Enter Score Greater or Equal to " + (greaterScore + 7)));
    }
    
    document.querySelector('.final-score').value = input ;
    }
    
    if(input) {
        winningScore = input;
    } else {
        winningScore = 100;
    }
}

function init(){    

    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    winningScore = 100;
        
    diceDOM.style.display = 'none';
    
    document.getElementById('score-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;

    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0; 
    
    document.querySelector('.final-score').value = '';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');

    document.getElementById('name-0').textContent = prompt("Enter Player 1 name : ");
    document.getElementById('name-1').textContent = prompt("Enter Player 2 name : ");

    if(document.getElementById('name-0').textContent.trim() === '')
    {
        document.getElementById('name-0').textContent = 'Player 1'
    }

    if(document.getElementById('name-1').textContent.trim() === '')
    {
        document.getElementById('name-1').textContent = 'Player 2'
    }
    
    document.querySelector('.btn-roll').disabled = false;
    document.querySelector('.btn-hold').disabled = false;
    document.querySelector('.btn-score').disabled = false;
    document.querySelector('.final-score').disabled = false;
  
}

document.querySelector('.btn-new').addEventListener('click',init);