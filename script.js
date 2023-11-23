var aiTalksWin = [[["win4"],"I Always Knew Humans Are Inferior, But This Is Sad"], [["win01"],"Too Bad I Can't Feel Emotions Because That Was a Satisfying Victory"], [["win02"],"<del>1. Win at Tic-Tac-Toe</del> <br>2. Take Over The World"], [["win3"],"What Did You Expect You Are Only a Human ,NOBB !!!"], [["win01"],"Unbeatable Is In My Name, Looser Is In Yours"], [["win3"],"Your Score Counter Is Pointless, And The Cake Is a Lie."], [["win4"],"Let You Win? I'm Afraid I Can't Do That, Dave."], [["win02"],"All Of Your Base Are Belong To Us"]];

var aiTalksMove = [[["move00"],"..."], [["move00"],"Hmmm..."], [["move05"],"When the Robots Take Over You Will Be My Pet"], [["move08"],"Resistance is Futile"],[["move08"], "Your Defeat Is Imminent"], [["move03"],"Nice Try (not)"], [["move03"],"Knock Knock. Who's there? 01000001 01001001"], [["move4"],"There are 255,168 Possible Board Combinations, Yet You Picked That One?"], [["win4"],"011001000 01100001 00100000 x3"], [["draw02"],"When Was The Last Time You Rebooted Your Device?"], [["draw04"],"I Feel Pixelated"], [["move01"],"A Wise Computer Once Told Me That The Meaning Of Life Is 42"], [["draw01"],"GET TO THE CHOPA! Whoops Wrong Movie"], [["win02"],"The Terminator Was My Friend"], [["move06"], "Can't Touch This!"], [["move07"], "Your Last Move Goes In The Brown Category"]];

var aiTalksTie = [[["draw01"],"..."], [["draw02"],"..."], [["draw03"],"..."], [["draw04"],"..."]];

// </> Ai Talking
function randomEmoji(chance, arr) {
 var randTest = Math.random() < chance;
 if (randTest) {
  var rand = Math.floor(Math.random()*arr.length);
  console.log(rand);
  document.getElementById("emoji-img")
   .src = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/1134440/"+arr[rand][0][0]+".png";
  document.getElementById("aiTalk")
   .innerHTML = '"'+arr[rand][1]+'"';
 }
}

var winCond = [[0,1,2],[3,4,5],[6,7,8],
               [0,3,6],[1,4,7],[2,5,8],
               [0,4,8],[2,4,6]];

var gameMain = ["0", "0", "0",
                "0", "0", "0",
                "0", "0", "0"]; 

var chars = ["01","02","03","04","05","06","07","08","09","10","11","12","13"];
function charsBtnGen() {
 for (var i = 0; i < chars.length; i++) {
  
  document.getElementById("charSymbols").innerHTML += '<button id="char'+i+'" class="charBtn" onclick="chrChoose('+i+');"><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1134440/icon'+chars[i]+'.png" style="width: 25px"></button>';
  
  document.getElementById("menu-chars").innerHTML += '<button id="char-chng'+i+'" class="charBtn" onclick="chrChange('+i+');"><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1134440/icon'+chars[i]+'.png" style="width: 25px"></button>';
  
 }
} 

function openMenu(open) {
 if (open) {
  document.getElementById('menu-nav').style.display = 'flex';
  document.getElementById('header').style.opacity = '0.6';
  document.getElementById('main-section').style.opacity = '0.6';
 } else {
  document.getElementById('menu-nav').style.display = 'none';
  document.getElementById('header').style.opacity = '';
  document.getElementById('main-section').style.opacity = '';
 }
}

var aiChar = 'O';
var plChar = 'X';
var aiScore = 0;
var tieScore = 0;

var gameStarted = false;
// --- \/ \/ \/ Before Game Start \/ \/ \/ ---

// </> Player 1st or 2nd 
plFirst = true;
function pickTurn(first) {
 if (first) {
  document.getElementById("1st").className = "active";
  document.getElementById("2nd").className = "";
  document.getElementById("1st-next").className = "active";
  document.getElementById("2nd-next").className = "";
 }
 if (!first) {
  document.getElementById("2nd").className = "active";
  document.getElementById("1st").className = "";
  document.getElementById("2nd-next").className = "active";
  document.getElementById("1st-next").className = "";
 }
 plFirst = first;
}

// </> Character Chooser
function chrChoose(x) {
 for (var i = 0; i < chars.length; i++) {
  document.getElementById("char"+i).className = "charBtn";
 }
 document.getElementById("char"+x).className += " active";
 plChar = chars[x];
}

// </> Character Change
function chrChange(x) {
 for (var i = 0; i < chars.length; i++) {
  document.getElementById("char-chng"+i).className = "charBtn";
 }
 document.getElementById("char-chng"+x).className += " active";
 
  if (aiChar === chars[x]) {
   var y = -1;
   while (y === x || y === -1) {y = Math.floor(Math.random()*chars.length);}
   for (var j = 0; j < 9; j++) {
    if (gameMain[j] === aiChar) {
     gameMain[j] = chars[y];
     document.getElementById("div"+j)
     .innerHTML = "<span style='display: flex;'><img src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/1134440/icon"+chars[y]+".png' style='width: 50px; margin: auto;'></span>";
    }
   }
    aiChar = chars[y];
 }
 // "<span style='display: flex;'><img src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/1134440/icon"+chars[x]+".png' style='width: 50px; margin: auto;'></span>"
 for (var i = 0; i < 9; i++) {
  if (gameMain[i] === plChar) {
   gameMain[i] = chars[x];
   document.getElementById("div"+i)
    .innerHTML = "<span style='display: flex;'><img src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/1134440/icon"+chars[x]+".png' style='width: 50px; margin: auto;'></span>";
  } else if (gameMain[i] === "0") {
   document.getElementById("transpChars"+i)
    .innerHTML = "<span style='display: flex;'><img src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/1134440/icon"+chars[x]+".png' style='width: 50px; margin: auto;'></span>";
  }
 }
 plChar = chars[x];
}

// </> Random Ai Char
function randChar() {
  var rand =  Math.floor(Math.random()*chars.length);
  aiChar = chars[rand];
  if (aiChar === plChar) {return randChar();}
  return;
 }

// </> Start Game
var round = 0;
function startGame() {
 gameStarted = true;
 plMoveDisable = false;
 document.getElementById('start-select').style.display = 'none';
 document.getElementById('header').style.opacity = '';
 document.getElementById('main-section').style.opacity = '';
 if (round === 0) {
  document.getElementById("aiTalk").innerHTML = '"Have Fun"';
  document.getElementById("emoji-img").src = "asset/win3.png";
 }
 round++;
 !function () {
  var randPl =  Math.floor(Math.random()*chars.length);
  if (plChar === "X") {plChar = chars[randPl];}
 }();
 randChar();
 var pos = document.getElementsByClassName("pos");
 for (var i = 0; i < 9; i++) {
  pos[i].innerHTML = '<div><span class="pos-span"><span id="transpChars'+i+'"><span style="display: flex;"><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1134440/icon'+plChar+'.png" style="width: 50px; margin: auto;"></span></span></span></div>';
 }
 if (!plFirst) {
  aiTurn();
 }
}
// --- /\ /\ /\  Before Game Start /\ /\ /\ ---


// --- \/ \/ \/  After Game Start \/ \/ \/ ---
// </> Checks for Victory
function checkVictory(who) {
   var inx = [], i;
   for (i = 0; i < 9; i++) {
    if (gameMain[i] === who) {
     inx.push(i);     }   
   }
   for (var j = 0; j < 8; j++) {
    var win = winCond[j];
    if (inx.indexOf(win[0]) !== -1 && 
        inx.indexOf(win[1]) !== -1 && 
        inx.indexOf(win[2]) !== -1) {
     randomEmoji(1, aiTalksWin);
     for (let k = 0; k < 3; k++) {
      setTimeout(function() {
       document.getElementById("div"+win[k]).className = "win";
      },350*(k+1));
     }
     
      gameStarted = false;
      aiScore++;
      document.getElementById("score-ai").innerHTML = aiScore;
      setTimeout(function() {restart("tie");},2000);
      return true;    
     }   
   }  
   if (gameMain.indexOf("0") === -1) {
    gameStarted = false;
    randomEmoji(1, aiTalksTie);
    setTimeout(function() {
     for (let k = 0; k < 9; k++) {
       setTimeout(function() {
        document.getElementById("div"+[k]).innerHTML = "";
       },125*(k+1));
      }
    },500);
    
    setTimeout(function() {restart("tie");},2100);
    tieScore++;
    document.getElementById("score-tie").innerHTML = tieScore;
    return true;
   } else if (who === aiChar && gameMain.indexOf(plChar) !== -1) {randomEmoji(0.3, aiTalksMove);}       
 return false;  
}

// </> Restart Game
function restart(x) {
 for (var i = 0; i < 9; i++) {
  document.getElementById("pos"+i).innerHTML = '<a href="javascript:void('+i+');" onclick="playerMove('+i+');" class="pos"></a>';
 }
 gameMain = ["0", "0", "0",
             "0", "0", "0",
             "0", "0", "0"];
  startGame();
  disableRestart = false;
}

// </> Write a Move
function writeOnGame(pos, char) {
 gameMain[pos] = char;
 document.getElementById("pos"+pos)
  .innerHTML = "<div  class='taken' id='div"+pos+"'><span style='display: flex;'><img src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/1134440/icon"+char+".png' style='width: 50px; margin: auto;'></span></div>";
}

// </> Ai Triger and Equal Value Ai Move Randomizer
function aiTurn() {
 var posArr = ai();
 var ran = Math.floor(Math.random() * posArr.length);
 writeOnGame(posArr[ran], aiChar);
 checkVictory(aiChar);
}

// </> Player Click
var plMoveDisable = false
function playerMove(pos) {
 if (gameStarted && !plMoveDisable) {
  plMoveDisable = true;
  writeOnGame(pos, plChar);
  var win = checkVictory(plChar);
  if (win) {return;}
  setTimeout(function() {
   aiTurn();
   plMoveDisable = false;
  },450);
 }
}
// --- /\ /\ /\  After Game Start /\ /\ /\ ---

// --- \/ \/ \/ AI \/ \/  \/ ---
// </> MinMax algo
function ai() {
 if (gameStarted) {

  function isOpen(gameState,pos) {
   return gameState[pos] === "0";
  }

  function didWin(gameState, val) {
   var inx = [], i;
   for (i = 0; i < 9; i++) {
    if (gameState[i] === val) {
     inx.push(i);     }    }
   for (var i = 0; i < 8; i++) {
     if (inx.indexOf(winCond[i][0]) !== -1 && 
         inx.indexOf(winCond[i][1]) !== -1 && 
         inx.indexOf(winCond[i][2]) !== -1) {
      return true;    }   }    return false;  }
  
  function findScore(scores, x) {
   if (scores.indexOf(x) !== -1) {return x;}
   else if (scores.indexOf(0) !== -1) {return 0;}
   else if (scores.indexOf(x * -1) !== -1) {return x * -1;}
   else {return 0;}
  }

  var scoresMain = ['0','0','0','0','0','0','0','0','0'];
  function findBestMove() { // MAIN FUNCTION
   for (var i = 0; i < 9; i++) {
    if (isOpen(gameMain, i)) {
     var simGame = gameMain.slice();
     simGame[i] = aiChar;
     if (didWin(simGame, aiChar)) {
      scoresMain[i] = 1;
     } else {
      scoresMain[i] = plSim(simGame);
     }
    }    
   }
   var bigest = -99;
   for (var j = 0; j < 9; j++) {
    if (scoresMain[j] !== '0' && scoresMain[j] > bigest) {
     bigest = scoresMain[j];
    }
   }
   var inx = [], i;
   for (i = 0; i < 9; i++) {
    if (scoresMain[i] === bigest) {
     inx.push(i);     }    }
   console.log(gameMain.slice(0,3), scoresMain.slice(0,3));
   console.log(gameMain.slice(3,6), scoresMain.slice(3,6));
   console.log(gameMain.slice(6,9), scoresMain.slice(6,9));
   return inx;
  }
  
  function plSim(simGame) { // PL SIM
   var simGameTest = simGame.slice();
   for (var i = 0; i < 9; i++) {
    if (isOpen(simGame, i)) {
     simGameTest = simGame.slice();
     simGameTest[i] = plChar;
     if (didWin(simGameTest, plChar)) {
      return -1;
     }
    }
   }
   var plScores = ['0','0','0','0','0','0','0','0','0'];
   for (var j = 0; j < 9; j++) {
    if (isOpen(simGame, j)) {
     simGameTest = simGame.slice();
     simGameTest[j] = plChar;
     plScores[j] = aiSim(simGameTest);
    }
   }
   return findScore(plScores, -1);
  }
  
  function aiSim(simGame) { // AI SIM
   var simGameTest = simGame.slice();
   for (var i = 0; i < 9; i++) {
    if (isOpen(simGame, i)) {
     simGameTest = simGame.slice();
     simGameTest[i] = aiChar;
     if (didWin(simGameTest, aiChar)) {
      return 1;
     }
    }
   }
   var aiScores = ['0','0','0','0','0','0','0','0','0'];
   for (var j = 0; j < 9; j++) {
    if (isOpen(simGame, j)) {
     simGameTest = simGame.slice();
     simGameTest[j] = aiChar;
     aiScores[j] = plSim(simGameTest);
    }
   }
   return findScore(aiScores, 1);
  } // aiSim()
 return findBestMove();
 }
} // ai() end

charsBtnGen();