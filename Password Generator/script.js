let lengthSlider = document.querySelector("#lengthSlider");
let sliderValue = document.querySelector("#sliderValue");

sliderValue.textContent = lengthSlider.value;
lengthSlider.addEventListener("input", () => {
    sliderValue.textContent = lengthSlider.value;
})

let checkBox = document.querySelectorAll(".checkBox");
Array.from(checkBox).forEach((e) => {
    e.addEventListener('click', () => {
        if (e.currentSrc === "http://127.0.0.1:3000/img/radio_button_unchecked_24dp_FILL0_wght400_GRAD0_opsz24.svg") {
            e.src = "img/task_alt_24dp_FILL0_wght400_GRAD0_opsz24.svg";
            e.nextElementSibling.nextElementSibling.setAttribute("checked", "")
        }
        else {
            e.src = "img/radio_button_unchecked_24dp_FILL0_wght400_GRAD0_opsz24.svg";
            e.nextElementSibling.nextElementSibling.removeAttribute("checked")
        }
    })
})
let includeLabel = document.querySelectorAll(".includeLabel");
Array.from(includeLabel).forEach((e) => {
    e.addEventListener('click', () => {
        if (e.previousElementSibling.currentSrc === "http://127.0.0.1:3000/img/radio_button_unchecked_24dp_FILL0_wght400_GRAD0_opsz24.svg") {
            e.previousElementSibling.src = "img/task_alt_24dp_FILL0_wght400_GRAD0_opsz24.svg";
        }
        else {
            e.previousElementSibling.src = "img/radio_button_unchecked_24dp_FILL0_wght400_GRAD0_opsz24.svg";
        }
    })
})
let generate_btn = document.querySelector("#generate_btn");

generate_btn.addEventListener("click", () => {
    let length = lengthSlider.value;
    let uppercase = document.getElementById("uppercase").checked;
    let lowercase = document.getElementById("lowercase").checked;
    let symbols = document.getElementById("symbols").checked;
    let numbers = document.getElementById("number").checked;
    let generated_password = generatePassword(length, uppercase, lowercase, symbols, numbers);
    document.querySelector("#password").value = generated_password;
})

const generatePassword = (length, uppercase, lowercase, symbols, numbers) => {
    let charset = "";
    let string = "";
    if (uppercase) {
        charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    }
    if (lowercase) {
        charset += "abcdefghijklmnopqrstuvwxyz"
    }
    if (numbers) {
        charset += "0123456789"
    }
    if (symbols) { charset += "!@#$%^&*()" }

    for (let i = 0; i < length; i++) {
        string += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    if (string.trim() == '') {
        string = "Choose Any Options First"
    }
    return string;
}

let copyIcon = document.querySelector(".pass-img");


copyIcon.addEventListener("click", (e) => {
    e.target.src = "img/check_24dp_FILL0_wght400_GRAD0_opsz24.svg"
    setTimeout(() => {
        e.target.src = "img/content_copy_24dp_FILL0_wght400_GRAD0_opsz24.svg"
    }, 1500);
    navigator.clipboard.writeText(document.querySelector("#password").value);
})
