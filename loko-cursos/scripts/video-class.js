var tag = document.createElement("script");
tag.src = "https://youtube.com/iframe_api";

var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

const queryString = location.search;

const urlParams = new URLSearchParams(queryString);

const course = urlParams.get("course");
const videoLink = urlParams.get("video");
const videoTitle = document.getElementById("video-title");

var player;

if (course == "informatica") setPrimary("#9a0000");
else if (course == "design") setPrimary("#00ba18");
else if (course == "programacao") setPrimary("#00F");

function onYouTubeIframeAPIReady() {
  player = new YT.Player("video", {
    videoId: videoLink,
    events: {
      onReady: onPlayerReady,
    },
  });
}

function onPlayerReady(event) {
  videoTitle.innerHTML = player.getVideoData().title;
}
