console.log('Working');

//logic to fill the table
//delete all passwords
const deleteAllPass = () => {
    document.querySelector("#del_all").addEventListener("click", () => {
        localStorage.clear();
        ShowPassword()
    })
}

//show stars instesd of passwords
const starsPass = (e) => {
    let passwordsOfStars = "";
    for (let i = 0; i < e.length; i++) {
        passwordsOfStars += "*"
    }
    return passwordsOfStars
}

//copy text
const copyText = (txt, name) => {
    navigator.clipboard.writeText(txt).then(() => {
        // alert('copied successfully');
        document.querySelector(`.${name}`).style.display = "inline"
        setTimeout(() => {
            document.querySelector(`.${name}`).style.display = "none"
        }, 1000);
    }),
        () => {
            alert('copy failed');
        }
}

// delete data
const deletePassword = (Website) => {
    let data = localStorage.getItem("password");
    let arr = JSON.parse(data);
    arrUpdated = arr.filter((e) => {
        return e.Website != Website
    })
    localStorage.setItem("password", JSON.stringify(arrUpdated));
    ShowPassword()
}

//showing data
const ShowPassword = () => {
    let passBody = document.querySelector(".saved-info");
    let data = localStorage.getItem("password");
    let str = "";
    if (data === null || JSON.parse(data).length == 0) {
        passBody.innerHTML = "No Data To Display";
    } else {
        passBody.innerHTML = ""
        let arr = JSON.parse(data);
        for (let i = 0; i < arr.length; i++) {
            const element = arr[i];
            str += `<div class="position-relative p-5 text-muted bg-body border border-dashed rounded-5 my-4"
    style="border-color: rgba(174, 174, 174, 0.758) !important;">
    <div class="info">
    <div class="web-name text-body-emphasis" style="display: flex; align-items: center; gap: 1vw;">
    <h3>Website:</h3>
    <h5>${element.Website}<img class="copyImg" src="img/copy.svg" onclick="copyText('${element.Website}','alert')" alt="copy" style="margin-left:0.5vw; cursor:pointer;"></h5><h6><span class="alert">(copied!)</span></h6>
    </div>
    <div class="user-name text-body-emphasis" style="display: flex; align-items: center; gap: 1vw;">
    <h3>Username:</h3>
    <h5>${element.Username}<img class="copyImg" src="img/copy.svg" onclick="copyText('${element.Username}','alert2')" alt="copy" style="margin-left:0.5vw; cursor:pointer;"></h5><h6><span class="alert2">(copied!)</span></h6>
    </div>
    <div class="pass-name text-body-emphasis" style="display: flex; align-items: center; gap: 1vw;">
    <h3>Password:</h3>
    <h5>${starsPass(element.Password)}<img class="copyImg" src="img/copy.svg" onclick="copyText('${element.Password}','alert3')" alt="copy" style="margin-left:0.5vw; cursor:pointer;"></h5><h6><span class="alert3">(copied!)</span></h6>
    </div>
    </div>
    <button onclick="deletePassword('${element.Website}')" class="btn btn-primary px-5" type="button" style="margin-top: 1vw;">
    Delete
    </button>
    </div>`
        }
        passBody.innerHTML = passBody.innerHTML + str;
    }
    floatingInput.value = "";
    floatingInput2.value = "";
    floatingPassword.value = "";
}
ShowPassword()
deleteAllPass()

//click submit button
submit_btn.addEventListener("click", (e) => {
    e.preventDefault()
    let password = localStorage.getItem("password");
    if (password == null || password == undefined) {
        let json = [];
        json.push({ Website: floatingInput.value, Username: floatingInput2.value, Password: floatingPassword.value });
        // alert('password saved')
        localStorage.setItem("password", JSON.stringify(json));
    } else {
        let json = JSON.parse(localStorage.getItem("password"));
        json.push({ Website: floatingInput.value, Username: floatingInput2.value, Password: floatingPassword.value });
        // alert('password saved')
        localStorage.setItem("password", JSON.stringify(json));
    }
    ShowPassword()
})