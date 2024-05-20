submitBtn.addEventListener("click", async () => {
    document.querySelector("#submitBtn").value = "Loading...";
    let key = "ema_live_VNGV48KmgcRrgZPbLGAw773R18N7fQeiyWFM0lEq";
    let email = document.querySelector("#email-enter").value
    let url = `https://api.emailvalidation.io/v1/info?apikey=${key}&email=${email}`;
    let res = await fetch(url)
    let result = await res.json()
    let str = ``
    for (key of Object.keys(result)) {
        if (result[key] !== "" && result[key] !== " ") {
            str = str + `<div>${key} : ${result[key]}</div>`
        }
    }
    resultCont.innerHTML = str;
    document.querySelector("#submitBtn").value = "Submit";
})

