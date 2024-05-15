console.log("let's write js")
let current_song = new Audio();
let sangeet;
let current_folder;
let songs;
let s_l;

function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}




async function get_Songs(folder) {
    current_folder = folder;
    let a = await fetch(`${folder}`);
    let response = await a.text();
    let div = document.createElement("div");
    div.innerHTML = response;
    let As = div.getElementsByTagName("a");
    songs = [];
    for (let index = 0; index < As.length; index++) {
        const element = As[index];
        if (element.href.endsWith(".m4a")) {
            songs.push(element.href.split(`/${folder}/`)[1]);
        }
    }

    // shows all the songs in playlist
    s_l = songs
    songUL = document.querySelector(".songs-list").getElementsByTagName("ul")[0];
    songUL.innerHTML = "";
    for (const song of s_l) {
        songUL.innerHTML = songUL.innerHTML + `<li> <div> ${song.replaceAll("%20", " ").split(".m4a")[0]} </div> </li>`
    }


    //attach an event listener to each song
    Array.from(document.querySelector(".songs-list").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", () => {
            playMusic(e.firstElementChild.innerHTML.trim())
            play.src = "SVGs/pause.svg";
        })
    })

    return songs
}


const playMusic = (track, pause = false) => {
    current_song.src = `/${current_folder}/` + track + ".m4a";
    if (!pause) {
        play.src = "SVGs/play.svg";
        current_song.play();
    }
    document.querySelector(".song-info").innerHTML = decodeURI(track.split(".m4a")[0]);
    document.querySelector(".song-time").innerHTML = "00:00 / 04:04";
}

async function displayAlbums() {
    let a = await fetch('/songs/');
    let response = await a.text();
    let div = document.createElement("div");
    div.innerHTML = response;
    let anchors = div.getElementsByTagName("a");

    let array = Array.from(anchors);
    for (let index = 0; index < array.length; index++) {
        const e = array[index];

        if (e.href.includes("/songs") && !e.href.includes(".htaccess")) {
            let folders = e.href.split("/songs/")[1].split("/")[0];
            //get the metadata of the folder
            let a = await fetch(`/songs/${folders}/info.json`);
            let response = await a.json();
            ganne = e.href.split("/songs/")[1].split("/")[0];
            document.querySelector(".album-container-main").innerHTML = document.querySelector(".album-container-main").innerHTML + `<div class="song-1">
             <div data-folder="${folders}" class="album-container">
            <div class="album-img">
                <img class="album-img-in"
                    src="/songs/${folders}/cover.jpeg" alt="animal">
                <div class="play">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16"
                        color="#000000" fill="#000000">
                        <path
                            d="M18.8906 12.846C18.5371 14.189 16.8667 15.138 13.5257 17.0361C10.296 18.8709 8.6812 19.7884 7.37983 19.4196C6.8418 19.2671 6.35159 18.9776 5.95624 18.5787C5 17.6139 5 15.7426 5 12C5 8.2574 5 6.3861 5.95624 5.42132C6.35159 5.02245 6.8418 4.73288 7.37983 4.58042C8.6812 4.21165 10.296 5.12907 13.5257 6.96393C16.8667 8.86197 18.5371 9.811 18.8906 11.154C19.0365 11.7084 19.0365 12.2916 18.8906 12.846Z"
                            stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
                    </svg>
                </div>
            </div>
            <div class="album-written">
                <h3>${response.title}</h3>
                <p>${response.description}</p>
            </div>
            </div>
            </div>`
        }

    }
    //load the playlist when card is clicked
    Array.from(document.getElementsByClassName('album-container')).forEach(e => {
        e.addEventListener("click", async (item) => {
            await get_Songs(`songs/${item.currentTarget.dataset.folder}`) /////////////////////////////////////////////songs/
            playMusic(s_l[0].replaceAll("%20", " ").split(".m4a")[0]);
            play.src = "SVGs/pause.svg"
        })
    })
}


async function main() {
    //get list of all songs
    pre_sangeet = await get_Songs("songs/Motivational")
    sangeet = pre_sangeet[0].replaceAll("%20", " ").split(".m4a")[0];
    playMusic(sangeet, true)

    //display all the albums on the page
    displayAlbums()



    // attach eventlistener to play pause and next
    play.addEventListener("click", () => {
        if (current_song.paused) {
            current_song.play();
            play.src = "SVGs/pause.svg";
        }
        else {
            current_song.pause();
            play.src = "SVGs/play.svg";
        }
    });

    //listen for timeupdate event
    current_song.addEventListener("timeupdate", () => {
        document.querySelector(".song-time").innerHTML = `${secondsToMinutesSeconds(current_song.currentTime)}/${secondsToMinutesSeconds(current_song.duration)}`
        document.querySelector(".circle").style.left = ((current_song.currentTime / current_song.duration) * 100) - 1 + "%";
        document.querySelector(".progressed").style.width = ((current_song.currentTime / current_song.duration) * 100) + 0.5 + "%";
    })
    // add an event listner to the seekbar
    document.querySelector(".seekbar").addEventListener("click", e => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = percent + "%";
        current_song.currentTime = ((current_song.duration) * percent) / 100;
    })


    //add an event listener for hamburger open
    document.querySelector(".h-menu").addEventListener("click", () => {
        document.querySelector(".left").style.left = "0";
        document.querySelector(".left").style.position = "fixed";
        document.querySelector(".left").style.height = "100%";
    })
    //add an event listener for hamburger close
    document.querySelector(".cross-in").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-100%";
        document.querySelector(".left").style.position = "absolute";
    })

    //add an event listner to previous and next
    previous.addEventListener("click", () => {
        let index = s_l.indexOf(current_song.src.split("/" + current_folder + "/")[1])
        if ((index - 1) >= 0) {
            playMusic(s_l[index - 1].replaceAll("%20", " ").split(".m4a")[0])
            play.src = "SVGs/pause.svg"
        }
    })

    // Add an event listener to next
    next.addEventListener("click", () => {
        let index = s_l.indexOf(current_song.src.split("/" + current_folder + "/")[1])
        if ((index + 1) > length) {
            playMusic((s_l[index + 1]).replaceAll("%20", " ").split(".m4a")[0])
            play.src = "SVGs/pause.svg"
        }
    })

    //automatic play next song
    current_song.addEventListener('ended', () => {
        let index_2 = s_l.indexOf(current_song.src.split(`/${current_folder}/`)[1])
        if ((index_2 + 1) < s_l.length) {
            playMusic((s_l[index_2 + 1]).replaceAll("%20", " ").split(".m4a")[0])
            play.src = "SVGs/pause.svg"
        }
        else {
            playMusic((s_l[0]).replaceAll("%20", " ").split(".m4a")[0])
            play.src = "SVGs/pause.svg"
        }
    });

    //add event to volume
    document.querySelector("#vol-range").addEventListener("change", (e) => {
        current_song.volume = parseInt(e.target.value) / 100;
        if (current_song.volume === 0) {
            document.querySelector(".volume-in").src = "SVGs/no-volume.svg";
        }
        else {
            document.querySelector(".volume-in").src = "SVGs/volume.svg";
        }
    })

    document.querySelector(".volume-in").addEventListener("click", e => {
        if (e.target.src.includes("SVGs/volume.svg")) {
            e.target.src = e.target.src.replace("SVGs/volume.svg", "SVGs/no-volume.svg")
            current_song.volume = 0;
            document.querySelector("#vol-range").value = 0;
        }
        else {
            e.target.src = e.target.src.replace("SVGs/no-volume.svg", "SVGs/volume.svg")
            current_song.volume = .50;
            document.querySelector("#vol-range").value = 50;
        }
    })
}
main()