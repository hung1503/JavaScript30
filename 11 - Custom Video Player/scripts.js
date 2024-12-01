var player = document.querySelector(".player");
var video = player.querySelector(".player__video");
var playButton = player.querySelector(".player__button");
var progress = player.querySelector(".progress");
var progressBar = player.querySelector(".progress__filled");
var skipButttons = player.querySelectorAll("[data-skip]");
var ranges = player.querySelectorAll(".player__slider");
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

video.addEventListener("click", togglePlay);
playButton.addEventListener("click", togglePlay);
skipButttons.forEach((button) => {
  button.addEventListener("click", skipTime);
});
ranges.forEach((range) => {
  range.addEventListener("change", handleRangeUpdate);
  range.addEventListener("mousemove", handleRangeUpdate);
});
