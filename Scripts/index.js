const listOfVideos = ["ScI7SBxBoLg", "h4xsO1_WYnU", "mDf0Jb9bz4Y", "HvdWmeGVMEI", "1TkGuFCmFno",
 "5ceSpqBs2JI", "5ktBK6Lj8Y4", "7ztljolVZi0", "NKeU1twQYX4","5ceSpqBs2JI", "5ktBK6Lj8Y4",
  "7ztljolVZi0", "NKeU1twQYX4", "5ceSpqBs2JI", "5ktBK6Lj8Y4", "7ztljolVZi0", "NKeU1twQYX4"];
// , "h4xsO1_WYnU", "mDf0Jb9bz4Y"



// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement("script");

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
let playerWrapper = document.getElementById("playerWrapper");

let players = [];
var player = {};
function onYouTubeIframeAPIReady() {
    for (let i = 0; i < listOfVideos.length; ) {
        const elementChild = document.createElement("div");

        const id = String(i);
        const elementclass = "playerContainer";

        elementChild.setAttribute("id", id);
        elementChild.setAttribute("class", elementclass);

        playerWrapper.appendChild(elementChild);

        player = new YT.Player(id, {
            height: "240",
            width: "360",
            videoId: listOfVideos[i],
            playerVars: {
                autoplay: 0, // 1 para reproduzir automaticamente
                controls: 1, // 0 para ocultar os controles do YouTube
                modestbranding: 0, // 1 para exibir um player sem o logo do YouTube
                showinfo: 0, // 0 para ocultar o título e informações do vídeo
                loop: 1, // 1 para repetir o vídeo quando terminar
                fs: 1, // 0 para ocultar o botão de tela cheia
                autohe: 0, // 0 para manter os controles visíveis
                startSeconds: 60,
            },
            events: {
                onReady: onPlayerReady,
                onStateChange: onPlayerStateChange,
            },
        });
        players.push(player);
        i++;
    }
}

if (!playerWrapper) {
    playerWrapper = document.getElementById("playerWrapper");
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
    event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !done) {
        setTimeout(stopVideo, 6000);
        done = true;
    }
}
function stopVideo(instance) {
    instance.stopVideo();
}

function playVideoHandle(instance) {
    instance.mute();
    instance.playVideo();
}

document
    .getElementById("playerWrapper")
    .addEventListener("mouseover", function (event) {
        if (event.target.classList.contains("playerContainer")) {
            const index = event.target.id;
            console.log(index)
            playVideoHandle(players[parseInt(index)]);
        }
    });

document
    .getElementById("playerWrapper")
    .addEventListener("mouseout", function (event) {
        if (event.target.classList.contains("playerContainer")) {
            const index = event.target.id;
            stopVideo(players[parseInt(index)]);
        }
    });