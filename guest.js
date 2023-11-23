function sum(sum) {
    if (sum++) {
      document.getElementsByClassName('gameWin').style.display = 'fixed';
    } else {
      document.getElementsByClassName('gameover').style.display = 'fixed';
      document.getElementsByClassName('gameWin').style.display = 'none';
    }
}