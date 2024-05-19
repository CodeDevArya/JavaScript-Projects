function main() {
    let time = 60;
    let score = 0;
    let random_number2;
    function getScore() {
        score += 10;
        document.querySelector(".score").innerHTML = score;
    }
    function makeBubble() {
        let clutter = "";
        for (let index = 0; index <= 125; index++) {
            var random_number = Math.floor(Math.random() * 10);
            clutter += `<div class="bubble">${random_number}</div>`
        }
        document.querySelector("#p-bottom").innerHTML = clutter;
    }
    function Timer() {
        var setInt = setInterval(() => {
            if (time > 0) {
                time--;
                // document.querySelector(".timer").innerHTML = time;
                // or
                document.querySelector(".timer").textContent = time;
            }
            else {
                clearInterval(setInterval);
                document.querySelector("#p-bottom").innerHTML = ` <div class="p-bottom-main">
                <div>
                    <h1>Game Over</h1>
                </div>
                <div>
                    <h2>Your Score:${score}</h2>
                </div>

            </div>`;
            }
        }, 1000);
    }
    function getNewHit() {
        random_number2 = Math.floor(Math.random() * 10)
        document.querySelector(".hit").innerHTML = random_number2;
    }
    document.querySelector("#p-bottom").addEventListener("click", (dets) => {
        let clicked_num = Number(dets.target.innerHTML);
        console.log(Number(dets.target.innerHTML));
        if (random_number2 === clicked_num) {
            getScore();
            getNewHit();
            makeBubble();
        }
    })
    getNewHit()
    Timer()
    makeBubble()
}
document.getElementById("start-btn").addEventListener("click", () => {
    main()
})