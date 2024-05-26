//game constants & variables
let inputDirection = { x: 0, y: 0 }
const food_sound = new Audio('music/food.mp3');
const gameOverSound = new Audio('music/gameover.mp3')
const moveSound = new Audio('music/move.mp3')
const musicSound = new Audio('music/music.mp3')
let speed = 15
;
let score = 0;
let lastPaintTime = 0;
let snakeArray = [
    { x: 13, y: 15 }
]
food = { x: 6, y: 7 };

//game functionss
function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < (1 / speed)) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}
function isCollide(snake) {
    // If you bump into yourself 
    for (let i = 1; i < snakeArray.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    // If you bump into the wall
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        return true;
    }

    return false;
}
function gameEngine() {
    //part 1: updating the snake array & food
    if (isCollide(snakeArray)) {
        gameOverSound.play();
        musicSound.pause();
        inputDirection = { x: 0, y: 0 }
        alert("Game Over. Press Enter To Play Again!!!")
        snakeArray = [{ x: 13, y: 15 }]
        musicSound.play();
        score = 0;
        scoreBox.innerHTML = "Score: " + score;
    }

    //if you have eaten the food ,increment the score and regenerate the food
    if (snakeArray[0].y === food.y && snakeArray[0].x === food.x) {
        food_sound.play();
        score += 1
    
        if (score > hiscoreval) {
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            HighscoreBox.innerHTML = "HiScore: " + hiscoreval;
        }
        scoreBox.innerHTML = "Score: " + score;
        snakeArray.unshift({ x: snakeArray[0].x + inputDirection.x, y: snakeArray[0].y + inputDirection.y })
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
    }

    //moving the snake 
    for (let i = snakeArray.length - 2; i >= 0; i--) {
        snakeArray[i + 1] = { ...snakeArray[i] };
    }
    snakeArray[0].y += inputDirection.y;
    snakeArray[0].x += inputDirection.x;

    //part 2: Display the snake & food
    //Display the snake
    board.innerHTML = "";
    snakeArray.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add('head')
        }
        else {
            snakeElement.classList.add('snake-body')
        }
        board.appendChild(snakeElement);
    })

    //part 2: Display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);
}

    //main logic
// musicSound.play();
let hiscore = localStorage.getItem("hiscore");
if (hiscore === undefined || hiscore === null) {
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else {
    hiscoreval = JSON.parse(hiscore);
    HighscoreBox.innerHTML = "HiScore: " + hiscore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            inputDirection.x = 0;
            inputDirection.y = -1;
            musicSound.play()
            break;

        case "ArrowDown":
            inputDirection.x = 0;
            inputDirection.y = 1;
            musicSound.play()
            break;

        case "ArrowLeft":
            inputDirection.x = -1;
            inputDirection.y = 0;
            musicSound.play()
            break;

        case "ArrowRight":
            inputDirection.x = 1;
            inputDirection.y = 0;
            musicSound.play()
            break;
        default:
            break;
    }
    switch (e.key) {
        case "w":
            inputDirection.x = 0;
            inputDirection.y = -1;
            musicSound.play()
            break;

        case "s":
            inputDirection.x = 0;
            inputDirection.y = 1;
            musicSound.play()
            break;

        case "a":
            inputDirection.x = -1;
            inputDirection.y = 0;
            musicSound.play()
            break;

        case "d":
            inputDirection.x = 1;
            inputDirection.y = 0;
            musicSound.play()
            break;
        default:
            break;
    }
})