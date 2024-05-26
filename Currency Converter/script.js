const getInfo = async (currency, value) => {
    let mystr = `<h1 class="my-4">${value} ${currency} is Equals to</h1><h5>Use (Ctrl + f) to find your currency</h5>`;
    let url = `https://api.currencyapi.com/v3/latest?apikey=cur_live_LoWIRto6qUch1okrhCmd4Ds0qgh655qGQFq00Ht5&base_currency=${currency}`;
    let response = await fetch(url);
    let rjson = await response.json()
    for (const key of Object.keys(rjson["data"])) {
        mystr += `
        <h4 style="border:2px solid black;"><span>${rjson["data"][key]["code"]}:&nbsp;&nbsp;&nbsp;</span><span>${rjson["data"][key]["value"] * value}</span></h4>
        `
    }
    document.querySelector(".show_result").innerHTML = mystr;
}
document.querySelector("#submit_btn").addEventListener("click", (e) => {
    e.preventDefault()
    let value = document.querySelector("#floatingInput").value;
    let currency = document.querySelector(".form-select").value;
    document.querySelector(".show_result").innerHTML = "";
    if (value === null || value === undefined || currency === "Choose the currency") {
        getInfo("USD", "1")
    } else {
        getInfo(currency, value)
    }
})