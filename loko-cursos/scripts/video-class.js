// Start Youtube API
var tag = document.createElement("script");
tag.src = "https://youtube.com/iframe_api";

var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// Get variables from URL
const queryString = location.search;
const urlParams = new URLSearchParams(queryString);
const course = urlParams.get("course");
const videoLink = urlParams.get("video");

// Get elements from HTML with DOM
const videoTitle = document.getElementById("video-title");

// Start YT player
var player;

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
  console.log(player.getVideoData());
}

// Change primary color withe the course name
if (course == "informatica") setPrimary("#9a0000");
else if (course == "design") setPrimary("#00ba18");
else if (course == "programacao") setPrimary("#00F");
