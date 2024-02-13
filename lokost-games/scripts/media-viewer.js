import { updateApps, setActive } from "./app-controller.js";

function convertTime(time) {
  var mins = Math.floor(time / 60);
  if (mins < 10) {
    mins = "0" + mins;
  }
  var secs = Math.floor(time % 60);
  if (secs < 10) {
    secs = "0" + secs;
  }

  return mins + ":" + secs;
}

function mediaViewer(file, type) {
  const id = "Media-View" + Math.floor(Math.random() * 1000).toString();
  const mediaViewer = document.createElement("div");
  mediaViewer.id = id;
  mediaViewer.onanimationend = () => {
    mediaViewer.style.animation = "none";
  };
  mediaViewer.classList.add("app");
  const content = document.createElement("div");
  content.classList.add("content");

  const appBar = document.createElement("div");
  appBar.classList.add("app-bar");
  appBar.id = id + "-bar";
  appBar.innerText = file.name + " - Media Viewer";
  appBar.onclick = () => {
    setActive(id);
  };

  const closeBtn = document.createElement("button");
  closeBtn.classList.add("material-symbols-outlined");
  closeBtn.innerText = "close";
  closeBtn.addEventListener("click", () => {
    mediaViewer.onanimationend = () => {
      mediaViewer.remove(mediaViewer);
      updateApps();
    };
    mediaViewer.style.animation = "show-app 0.3s ease reverse";
  });
  appBar.appendChild(closeBtn);

  if (type === "image") {
    const imageViewer = document.createElement("img");
    imageViewer.src = file.path;
    imageViewer.classList.add("show");
    content.appendChild(imageViewer);
  } else if (type === "video") {
    var currentTime = "00:00";
    var duration = "00:00";

    const videoViewer = document.createElement("video");
    videoViewer.classList.add("show");
    videoViewer.src = file.path;
    content.appendChild(videoViewer);

    const videoSlider = document.createElement("input");
    videoSlider.type = "range";
    videoSlider.min = 0;
    videoSlider.max = videoViewer.duration;
    videoSlider.value = 0;
    videoSlider.oninput = (e) => {
      videoViewer.currentTime = e.target.value;
    };

    videoViewer.onloadedmetadata = () => {
      duration = convertTime(videoViewer.duration);
      videoSlider.max = videoViewer.duration;
    };

    content.appendChild(videoSlider);

    const videoControls = document.createElement("div");
    videoControls.classList.add("audio-controls");

    const timer = document.createElement("span");
    timer.innerText = currentTime + " / " + duration;
    videoControls.appendChild(timer);

    const playBtn = document.createElement("button");
    playBtn.classList.add("material-symbols-outlined");
    playBtn.innerText = "play_arrow";
    playBtn.onclick = () => {
      videoViewer.play();
    };

    videoViewer.ontimeupdate = () => {
      currentTime = convertTime(videoViewer.currentTime);
      console.log(currentTime);
      timer.innerText = currentTime + " / " + duration;
      videoSlider.value = videoViewer.currentTime;
    };

    videoViewer.onplay = () => {
      playBtn.innerText = "pause";
      playBtn.onclick = () => {
        videoViewer.pause();
      };
    };
    videoViewer.onpause = () => {
      playBtn.innerText = "play_arrow";
      playBtn.onclick = () => {
        videoViewer.play();
      };
    };
    videoViewer.onended = () => {
      playBtn.innerText = "play_arrow";
      playBtn.onclick = () => {
        videoViewer.play();
      };
      videoViewer.currentTime = 0;
      currentTime = "00:00";
      timer.innerText = currentTime + " / " + duration;
    };

    videoControls.appendChild(playBtn);

    const stopBtn = document.createElement("button");
    stopBtn.classList.add("material-symbols-outlined");
    stopBtn.innerText = "stop";
    stopBtn.onclick = () => {
      videoViewer.pause();
      videoViewer.currentTime = 0;
      currentTime = "00:00";
      timer.innerText = currentTime + " / " + duration;
    };
    videoControls.appendChild(stopBtn);

    const volumeIcon = document.createElement("span");
    volumeIcon.classList.add("material-symbols-outlined");
    volumeIcon.innerText = "volume_up";
    videoControls.appendChild(volumeIcon);
    const volumeSlider = document.createElement("input");
    volumeSlider.type = "range";
    volumeSlider.min = 0;
    volumeSlider.max = 100;
    volumeSlider.value = 100;
    volumeSlider.oninput = () => {
      videoViewer.volume = volumeSlider.value / 100;
    };

    videoControls.appendChild(volumeSlider);
    content.appendChild(videoControls);
  } else if (type === "audio") {
    var currentTime = "00:00";
    var duration = "00:00";
    const audio_icon = document.createElement("img");
    audio_icon.classList.add("audio");
    audio_icon.src = "images/icons/music_file_big.png";
    const audioViewer = document.createElement("audio");
    audioViewer.src = file.path;

    const audioSlider = document.createElement("input");
    audioSlider.type = "range";
    audioSlider.min = 0;
    audioSlider.max = audioViewer.duration;
    audioSlider.value = 0;
    audioSlider.oninput = (e) => {
      audioViewer.currentTime = e.target.value;
    };

    audioViewer.onloadedmetadata = () => {
      duration = convertTime(audioViewer.duration);
      audioSlider.max = audioViewer.duration;
    };

    const audioControls = document.createElement("div");
    audioControls.classList.add("audio-controls");

    const timer = document.createElement("span");
    timer.innerText = currentTime + " / " + duration;
    audioControls.appendChild(timer);

    const playBtn = document.createElement("button");
    playBtn.classList.add("material-symbols-outlined");
    playBtn.innerText = "play_arrow";
    playBtn.onclick = () => {
      audioViewer.play();
    };

    audioViewer.ontimeupdate = () => {
      currentTime = convertTime(audioViewer.currentTime);
      timer.innerText = currentTime + " / " + duration;
      audioSlider.value = audioViewer.currentTime;
    };

    audioViewer.onplay = () => {
      playBtn.innerText = "pause";
      playBtn.onclick = () => {
        audioViewer.pause();
      };
    };
    audioViewer.onpause = () => {
      playBtn.innerText = "play_arrow";
      playBtn.onclick = () => {
        audioViewer.play();
      };
    };
    audioViewer.onended = () => {
      playBtn.innerText = "play_arrow";
      playBtn.onclick = () => {
        audioViewer.play();
      };
      audioViewer.currentTime = 0;
      currentTime = "00:00";
      timer.innerText = currentTime + " / " + duration;
    };

    audioControls.appendChild(playBtn);

    const stopBtn = document.createElement("button");
    stopBtn.classList.add("material-symbols-outlined");
    stopBtn.innerText = "stop";
    stopBtn.onclick = () => {
      audioViewer.pause();
      audioViewer.currentTime = 0;
      currentTime = "00:00";
      timer.innerText = currentTime + " / " + duration;
    };
    audioControls.appendChild(stopBtn);

    const volumeIcon = document.createElement("span");
    volumeIcon.classList.add("material-symbols-outlined");
    volumeIcon.innerText = "volume_up";
    audioControls.appendChild(volumeIcon);
    const volumeSlider = document.createElement("input");
    volumeSlider.type = "range";
    volumeSlider.min = 0;
    volumeSlider.max = 100;
    volumeSlider.value = 100;
    volumeSlider.oninput = () => {
      audioViewer.volume = volumeSlider.value / 100;
    };

    audioControls.appendChild(volumeSlider);

    content.appendChild(audioViewer);
    content.appendChild(audio_icon);
    content.appendChild(audioSlider);
    content.appendChild(audioControls);
  }

  mediaViewer.appendChild(appBar);
  mediaViewer.appendChild(content);

  return mediaViewer;
}

export { mediaViewer };
