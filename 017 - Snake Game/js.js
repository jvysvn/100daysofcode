for (let i = 0; i < snakeBody.length; i++) {
  html += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
  // Check snake head hit body or no
  if (
    i !== 0 &&
    snakeBody[0][1] === snakeBody[i][1] &&
    snakeBody[0][0] === snakeBody[i][0]
  ) {
    gameOver = true;
  }
}
for (let i = 0; i < snakeBody.length; i++) {
  html += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}></div>"`;

  if (
    i !== 0 &&
    snakeBody[0][1] === snakeBody[i][1] &&
    snakeBody[0][0] === snakeBody[i][0]
  ) {
    gameOver = true;
  }
}
