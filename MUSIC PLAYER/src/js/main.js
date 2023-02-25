const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

const songs = [
  {
    name: 'If You Want Love',
    displayTitle: 'If You Want Love',
    artist: 'NF',
  },
  {
    name: 'Lie',
    displayTitle: 'Lie',
    artist: 'NF',
  },
  {
    name: 'The Search',
    displayTitle: 'The Search',
    artist: 'NF',
  },
  {
    name: 'Let You Down',
    displayTitle: 'Let You Down',
    artist: 'NF',
  },
];

let isPlaying = false;

const playSong = function () {
  isPlaying = true;
  playBtn.classList.replace('fa-play', 'fa-pause');
  playBtn.setAttribute('title', 'Pause');
  music.play();
};

const pauseSong = function () {
  isPlaying = false;
  playBtn.classList.replace('fa-pause', 'fa-play');
  playBtn.setAttribute('title', 'play');
  music.pause();
};

playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

const loadSong = function (song) {
  title.textContent = song.displayTitle;
  artist.textContent = song.artist;
  music.src = `src/music/${song.name}.mp3`;
};

let currentSong = 0;

const prevSong = function () {
  currentSong--;
  if (currentSong < 0) {
    currentSong = songs.length - 1;
  }
  loadSong(songs[currentSong]);
  playSong();
};

const nextSong = function () {
  currentSong++;
  if (currentSong > songs.length - 1) {
    currentSong = 0;
  }
  loadSong(songs[currentSong]);
  playSong();
};

loadSong(songs[currentSong]);

const updateProgressBar = function (e) {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement;
    // Update progress bar
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    // Update Display Duration
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }
    if (seconds) {
      durationEl.textContent = `${minutes}:${seconds}`;
    }
    // Update Display Current Time
    const minutesDuration = Math.floor(currentTime / 60);
    let secondsDuration = Math.floor(currentTime % 60);
    if (secondsDuration < 10) {
      secondsDuration = `0${secondsDuration}`;
    }
    currentTimeEl.textContent = `${minutesDuration}:${secondsDuration}`;
  }
};

const setProgressBar = function (e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const { duration } = music;
  music.currentTime = (clickX / width) * duration;
};

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
music.addEventListener('ended', nextSong);
progressContainer.addEventListener('click', setProgressBar);
