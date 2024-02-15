import { App } from "./app.js";
import { Notify } from "./notify.js";

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

function mediaController(viewer) {
  // Timer variables
  var currentTime = "00:00";
  var duration = "00:00";

  // Controllers variables
  var volume = 100;

  // Main div
  const mediaController = document.createElement("div");
  mediaController.classList.add("media-controller");

  // Controllers div
  const controllers = document.createElement("div");
  controllers.classList.add("media-controls");

  //Time slider
  const timeSlider = document.createElement("input");
  timeSlider.type = "range";
  timeSlider.value = 0;
  timeSlider.min = 0;

  // TimeCounter
  const timer = document.createElement("span");
  timer.innerText = currentTime + "/" + duration;

  // Play button
  const playBtn = document.createElement("button");
  playBtn.classList.add("material-symbols-outlined");
  playBtn.innerText = "play_arrow";

  // Stop button
  const stopBtn = document.createElement("button");
  stopBtn.classList.add("material-symbols-outlined");
  stopBtn.innerText = "stop";

  // Volume icon
  const volumeIcon = document.createElement("button");
  volumeIcon.classList.add("material-symbols-outlined");
  volumeIcon.innerText = "volume_up";

  // Volume slider
  const volumeSlider = document.createElement("input");
  volumeSlider.type = "range";
  volumeSlider.min = 0;
  volumeSlider.max = 100;
  volumeSlider.value = 100;

  // Volume percentage
  const volumePercentage = document.createElement("span");
  volumePercentage.innerHTML = "100%";

  // Viewer actions
  viewer.onloadedmetadata = () => {
    duration = convertTime(viewer.duration);
    timeSlider.max = viewer.duration;
    timer.innerText = currentTime + "/" + duration;
  };

  viewer.ontimeupdate = () => {
    currentTime = convertTime(viewer.currentTime);
    timer.innerText = currentTime + "/" + duration;
    timeSlider.value = viewer.currentTime;
  };

  viewer.onplay = () => {
    playBtn.innerText = "pause";
    playBtn.onclick = () => {
      viewer.pause();
    };
  };

  viewer.onended = () => {
    playBtn.innerText = "play_arrow";
    playBtn.onclick = () => {
      viewer.play();
    };
    viewer.currentTime = 0;
    currentTime = "00:00";
    timer.innerText = currentTime + "/" + duration;
  };

  // buttons actions
  playBtn.onclick = () => {
    viewer.play();
  };

  stopBtn.onclick = () => {
    viewer.currentTime = 0;
    viewer.pause();
    playBtn.onclick = () => {
      viewer.play();
    };
    playBtn.innerText = "play_arrow";
  };

  volumeSlider.oninput = () => {
    viewer.volume = volumeSlider.value / 100;
    volume = volumeSlider.value;
    volumePercentage.innerText = volumeSlider.value + "%";

    if (volumeSlider.value >= 70) volumeIcon.innerText = "volume_up";
    if (volumeSlider.value < 70) volumeIcon.innerText = "volume_down";
    if (volumeSlider.value < 40) volumeIcon.innerText = "volume_mute";
    if (volumeSlider.value == 0) volumeIcon.innerText = "volume_off";
  };

  volumeIcon.onclick = () => {
    if (viewer.volume > 0) {
      viewer.volume = 0;
      volumeSlider.value = 0;
      volumePercentage.innerText = "0%";
      volumeIcon.innerText = "volume_off";
    } else {
      viewer.volume = volume / 100;

      if (volume >= 70) volumeIcon.innerText = "volume_up";
      if (volume < 70) volumeIcon.innerText = "volume_down";
      if (volume < 40) volumeIcon.innerText = "volume_mute";
      if (volume == 0) volumeIcon.innerText = "volume_off";

      volumeSlider.value = volume;
      volumePercentage.innerText = volume + "%";
    }
  };

  timeSlider.oninput = () => {
    viewer.currentTime = timeSlider.value;
  };

  // Insert all into the container
  controllers.append(
    timer,
    playBtn,
    stopBtn,
    volumeIcon,
    volumeSlider,
    volumePercentage
  );

  mediaController.append(timeSlider, controllers);

  return mediaController;
}

function mediaViewer(file, type) {
  const content = document.createElement("div");

  // If the file is a image
  if (type == "image") {
    const imageViewer = document.createElement("img");
    imageViewer.src = file.location;
    imageViewer.classList.add("show");

    const setBg = document.createElement("button");
    setBg.classList.add("action");
    setBg.innerText = "Definir como fundo";
    setBg.onclick = () => {
      if (localStorage.getItem("background")) {
        if (localStorage.getItem("background") == file.location) {
          Notify("Papel de parede não alterado!", 2);
          return;
        }
      }
      Notify("Papel de parede alterado!", 2);
      document.body.style.background = `url("${file.location}") no-repeat fixed`;
      document.body.style.backgroundSize = "cover";
      localStorage.setItem("background", file.location);
    };

    content.append(imageViewer, setBg);
  }

  // If the file is a video
  else if (type == "video") {
    const videoViewer = document.createElement("video");
    videoViewer.classList.add("show");
    videoViewer.src = file.location;
    content.append(videoViewer, mediaController(videoViewer));
  }

  // If the file is a audio
  else if (type == "audio") {
    // audio icon
    const audio_icon = document.createElement("img");
    audio_icon.src = "images/icons/music_file_big.png";
    audio_icon.classList.add("audio");

    // audio player
    const audioViewer = document.createElement("audio");
    audioViewer.src = file.location;

    // add to the content
    content.append(audio_icon, audioViewer, mediaController(audioViewer));
  }

  return App(content, file.name + " - Media Viewer");
}

export { mediaViewer };
