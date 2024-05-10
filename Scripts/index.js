const listOfVideos = ["ScI7SBxBoLg", "h4xsO1_WYnU"];
// "h4xsO1_WYnU"

// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement("script");

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
let playerWrapper = document.getElementById("playerWrapper");

var player;
function onYouTubeIframeAPIReady() {
    for (let i = 0; i < listOfVideos.length; ) {
        const newElement = document.createElement("div");

        const id = String("y1352" + i);

        newElement.setAttribute("id", id);

        playerWrapper.appendChild(newElement);

        player = new YT.Player(id, {
            height: "240",
            width: "360",
            videoId: listOfVideos[i],
            playerVars: {
                autoplay: 0, // 1 para reproduzir automaticamente
                controls: 0, // 0 para ocultar os controles do YouTube
                modestbranding: 1, // 1 para exibir um player sem o logo do YouTube
                showinfo: 0, // 0 para ocultar o título e informações do vídeo
                loop: 1, // 1 para repetir o vídeo quando terminar
                fs: 0, // 0 para ocultar o botão de tela cheia
                autohe: 0, // 0 para manter os controles visíveis
            },
            events: {
                onReady: onPlayerReady,
                onStateChange: onPlayerStateChange,
            },
        });
        i++;
    }
}

if (!playerWrapper) {
    playerWrapper = document.getElementById("playerWrapper");
}

playerWrapper.addEventListener("mouseenter", () => {
    console.log("mouse on");
    playVideoHandle();
});

playerWrapper.addEventListener("mouseleave", () => {
    console.log("mouse off");
    stopVideo();
});

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
function stopVideo() {
    player.stopVideo();
}

function playVideoHandle() {
    player.mute();
    player.playVideo();
}
