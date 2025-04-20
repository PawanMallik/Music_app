let songs = [];
  let current = 0;
  let isShuffle = false;
  let isRepeat = false;

  const audio = document.getElementById('audio');
  const title = document.getElementById('song-title');
  const artist = document.getElementById('song-artist');
  // const lyrics = document.getElementById('lyrics');
  const cover = document.getElementById('cover');
  // const background = document.getElementById('background');

  function loadSong(index) {
    const song = songs[index];
    title.textContent = song.title;
    artist.textContent = song.artist;
    audio.src = song.src;
    // lyrics.textContent = song.lyrics;
    cover.src = song.cover;
    // background.style.backgroundImage = `url(${song.cover})`;
    audio.play();
  }

  let progress = document.getElementById("progress")
  // let audio = document.getElementById("audio")
  let ctrl = document.getElementById("ctrlIcon")

  audio.onloadedmetadata = function(){
    progress.max = audio.duration;
    progress.value = audio.currontTime;
  }

  function playPause(){
    if(ctrlIcon.classList.contains("fa-pause")){
      audio.pause();
      ctrlIcon.classList.remove("fa-pause");
      ctrlIcon.classList.add("fa-play");
    }
    else{
      audio.play();
      ctrlIcon.classList.add("fa-pause");
      ctrlIcon.classList.remove("fa-play");
    }
  }

  if(audio.play()){
    setInterval(()=>{
      progress.value = audio.currentTime;
    },500);
  }

  progress.onchange = function(){
    audio.play();
    audio.currentTime = progress.value;
    ctrlIcon.classList.add("fa-pause");
      ctrlIcon.classList.remove("fa-play");
  }

  function nextSong() {
    if (isShuffle) {
      current = Math.floor(Math.random() * songs.length);
    } else {
      current = (current + 1) % songs.length;
    }
    loadSong(current);
  }

  function prevSong() {
    current = (current - 1 + songs.length) % songs.length;
    loadSong(current);
  }

  // Touch swipe
  let touchStartY = 0;
  let touchEndY = 0;

  document.getElementById('player').addEventListener('touchstart', e => {
    touchStartY = e.changedTouches[0].screenY;
  });

  document.getElementById('player').addEventListener('touchend', e => {
    touchEndY = e.changedTouches[0].screenY;
    if (touchEndY < touchStartY - 50) nextSong();
    if (touchEndY > touchStartY + 50) prevSong();
  });

  // Fetch songs from PHP
  fetch('getSongs.php')
    .then(res => res.json())
    .then(data => {
      songs = data;
      loadSong(current);
    });