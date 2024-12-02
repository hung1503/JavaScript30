var player = document.querySelector(".player");
var video = player.querySelector(".player__video");
var playButton = player.querySelector(".player__button");
var progress = player.querySelector(".progress");
var progressBar = player.querySelector(".progress__filled");
var skipButttons = player.querySelectorAll("[data-skip]");
var ranges = player.querySelectorAll(".player__slider");
var fullscreenButton = player.querySelector(".fullscreen");
let isPlaying = false;

function togglePlay() {
  // method = video.paused ? "play" : "pause";
  if (isPlaying) {
    video.pause();
    playButton.textContent = "►";
  } else {
    video.play();
    playButton.textContent = "❚❚";
  }
  isPlaying = !isPlaying;
}

function skipTime() {
  console.log(this.dataset.skip);
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
  video[this.name] = this.value;
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

function fullScreen(e) {
  fullscreen = !fullscreen;
  if (fullscreen) {
    player.requestFullscreen();
    fullscreenButton.textContent = "\u2725";
  } else {
    document.exitFullscreen();
    fullscreenButton.textContent = "⛶";
  }
}

video.addEventListener("click", togglePlay);
video.addEventListener("timeupdate", handleProgress);
playButton.addEventListener("click", togglePlay);
skipButttons.forEach((button) => {
  button.addEventListener("click", skipTime);
});
ranges.forEach((range) => {
  range.addEventListener("change", handleRangeUpdate);
  range.addEventListener("mousemove", handleRangeUpdate);
});
let mousedown = false;
progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", (e) => {
  if (mousedown) {
    scrub(e);
  }
});
progress.addEventListener("mousedown", () => (mousedown = true));
progress.addEventListener("mouseup", () => (mousedown = false));
let fullscreen = false;
fullscreenButton.addEventListener("click", fullScreen);
