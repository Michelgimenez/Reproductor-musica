// Elementos del DOM
let image;
let title;
let artist;
let music;
let currentTimeEl;
let durationEl;
let progress;
let progressContainer;
let prevBtn;
let playBtn;
let nextBtn;
const songsContainer = document.querySelector(".main__music");

// Establece el valor inicial para mostrar la primera cancion del array
let songIndex;

// Al iniciar la aplicacion esto va a ser false para no reproducir nada.
let isPlaying = false;

// La lista de canciones
const songs = [
  {
    name: "geronimo",
    displayName: "Geronimo",
    artist: "Dpr Live",
    id: 0,
  },
  {
    name: "jam",
    displayName: "Jam & Butterfly",
    artist: "DPR LIVE (feat. CRUSH, eaJ)",
    id: 1,
  },
  {
    name: "blueberries",
    displayName: "No blueberries",
    artist: "Dpr Ian",
    id: 2,
  },
  {
    name: "tip-toe",
    displayName: "Tip Toe",
    artist: "Crush (feat. 이하이)",
    id: 3,
  },
  {
    name: "she-said",
    displayName: "She Said",
    artist: "Crush (feat. BIBI)",
    id: 4,
  },
  {
    name: "money-talk",
    displayName: "Money Talk",
    artist: "Upstrz",
    id: 5,
  },
  {
    name: "ff-viii-collections",
    displayName: "Final Fantasy VIII",
    artist: "Nobuo Uematsu",
    id: 6,
  },
  {
    name: "from-midnight-to-sunrise",
    displayName: "From Midnight To Sunrise",
    artist: "Crush",
    id: 7,
  },
  {
    name: "still-with-you",
    displayName: "Still With You",
    artist: "Jungkook",
    id: 8,
  },
  {
    name: "love-yourself",
    displayName: "Singularity",
    artist: "V",
    id: 9,
  },
];

const displaySongs = () => {
  let markup = songs
    .map((song, i) => {
      return `<div class="main__music-card" data-id=${i}>
      <img src="./img/${song.name}.jpg" alt="" />
      <h2>${song.displayName}</h2>
      <p>${song.artist}</p>
    </div>`;
    })
    .join("");

  songsContainer.innerHTML = markup;
};

displaySongs();

const songsCards = document.querySelectorAll(".main__music-card");

songsCards.forEach((card) => {
  card.addEventListener("click", (e) => {
    let card = e.target.closest(".main__music-card");
    let attribute = card.dataset.id;

    document.querySelector(".main").remove();
    document.querySelector("body").classList.remove("container");
    document.querySelector("body").classList.add("player");

    songIndex = Number(attribute);

    displayMusicPlayer(songIndex);
  });
});

const displayMusicPlayer = (songIndex) => {
  const song = songs.filter((song) => {
    return song.id === songIndex;
  });

  document.querySelector("body").innerHTML = `<div class="player-container">
      
  <div class="img-container">
    <img src="./img/${song[0].name}.jpg" alt="Album Art" />
  </div>
  <h2 id="title">${song[0].displayName}</h2>
  <h3 id="artist">${song[0].artist}</h3>
  <audio src="./music/${song[0].name}.mp3"></audio>
  
  <div class="progress-container" id="progress-container">
    <div class="progress" id="progress"></div>
    <div class="duration-wrapper">
      <span id="current-time"></span>
      <span id="duration"></span>
    </div>
  </div>
  
  <div class="player-controls">
    <i class="fas fa-backward" id="prev" title="Previous"></i>
    <i class="fas fa-play main-button" id="play" title="Play"></i>
    <i class="fas fa-forward" id="next" title="Next"></i>
  </div>
</div>`;

  musicPlayerEventListeners();

  let button = `
  <a href="/" class='back-btn'>  
  <i class="fas fa-long-arrow-alt-left"></i>Volver
  </a>`;

  document.querySelector("body").insertAdjacentHTML("afterbegin", button);
};

const musicPlayerEventListeners = () => {
  image = document.querySelector("img");
  title = document.getElementById("title");
  artist = document.getElementById("artist");
  music = document.querySelector("audio");
  currentTimeEl = document.getElementById("current-time");
  durationEl = document.getElementById("duration");
  progress = document.getElementById("progress");
  progressContainer = document.getElementById("progress-container");
  prevBtn = document.getElementById("prev");
  playBtn = document.getElementById("play");
  nextBtn = document.getElementById("next");

  playBtn.addEventListener("click", () =>
    isPlaying ? pauseSong() : playSong()
  );

  prevBtn.addEventListener("click", prevSong);
  nextBtn.addEventListener("click", nextSong);
  music.addEventListener("ended", nextSong);
  // Cada vez que vaya pasando el tiempo de la cancion voy a llamar a updateProgressBar para mostrar en tiempo real cuando va avanzado la cancion y el tiempo total que dura
  music.addEventListener("timeupdate", updateProgressBar);
  // En caso de hacer click en alguna parte de la barra de progreso, llamo a la funcion que me lleva a la parte de la cancion de esa parte de la barra de progreso.
  progressContainer.addEventListener("click", setProgressBar);
};

// Esta funcion es llamada al hacer click al boton de reproducir, de esa forma cambia la variable de isPlaying a TRUE y de esa forma se llama a esta funcion que le da la class al boton para mostrar el boton de pausa, le doy un atributo y finalmente reproduzco la cancion
function playSong() {
  isPlaying = true;
  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.setAttribute("title", "Pause");
  music.play();
}

// Esta funcion es llamada al hacer click al boton de pausar, de esa forma cambia la variable de isPlaying a FALSE y de esa forma se llama a esta funcion que le da la class al boton para mostrar el boton de reproducir, le doy un atributo y finalmente pauso la cancion
function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "Play");
  music.pause();
}

// Si hago click al boton de cancion anterior, songIndex baja en 1 su valor, si este valor pasa a ser menor a 0, es decir estoy en la primera cancion tocando cancion anterior, entonces songIndex va a equivaler a la longitud del array - 1, de esa forma obtengo el index de la ultima cancion que voy a reproducir, caso contrario songIndex va a equivaler a 0 o a 1 dependiendo de la cancion en la que me encuentre, y procedo a llamar a la funcion que carga la informacion de la cancion en el html pasandole el index que quiero del array de canciones y finalmente llamo a la funcion que reproduce la cancion.
function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  displayMusicPlayer(songIndex);
  playSong();
}

// Si hago click al boton de siguiente cancion, songIndex sube en 1 su valor, si este valor pasa a ser mayor a la longitud del array de canciones - 1, es decir estoy en la ultima cancion tocando siguiente cancion, entonces songIndex va a equivaler a 0, de esa forma obtengo el index de la primera cancion que voy a reproducir, caso contrario songIndex va a equivaler a 1/2 dependiendo de la cancion en la que me encuentre, y procedo a llamar a la funcion que carga la informacion de la cancion en el html pasandole el index que quiero del array de canciones y finalmente llamo a la funcion que reproduce la cancion.
function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  displayMusicPlayer(songIndex);
  playSong();
}

// Esta funcion es llamada al iniciar una cancion y cada vez que transcurre un microsegundo en ella. En ese caso procedo primero a verificar que solo si isPlaying es true, es decir, hay algo reproduciendose, entonces procedo a extraer del evento que se llama TIMEUPDATE, el field de srcElement que contiene el elemento html del audio, es decir, de la cancion que emite el evento de timeupdate, y procedo a extraer de esta su duracion total y el tiempo en el que se encuentra. Esta informacion que extraigo la utilizo para actualizar la barra de progreso haciendo un calculo donde divido el tiempo actual por la duracion total, por ejemplo si voy por el segundo 1, esto equivale a "1.131166" y la duracion total por ejemplo si dura 50 minutos, seria "2990.112" y el resultado lo multiplico por 100, esto me daria "0.03783022174", ese valor lo voy a usar para darselo de ancho a la barra de progreso que va a ir rellenando de color negro la barra de progreso a medida que aumenta el ancho. Y para mostrar la duracion de la cancion en un formato legible procedo a primero obtener los minutos de la cancion diviendo la duracion por 60, esto lo paso a un entero con FLOOR y me da los minutos, para obtener los segundos obtengo el remainder de dividir la duracion por 60. Por ejemplo la cancion de final fantasy dura 49:50, hago 2990.112 % 60, esto me da 50, me da los segundos. Y procedo a verificar que si los segundos son menores a 10, le agrego un 0 a la izquierda para que quede en buen formato de "08" por ejemplo. Despues procedo a verificar que si hay contenido en durationSeconds, entonces procedo a seleccionar el elemento donde va a ir la duracion total de la cancion, y procedo a colocar los minutos totales y los segundos totales. Despues para pasar a formato legible el tiempo actual en el que me encuentro de la cancion repito el mismo proceso para los minutos y los segundos y finalmente coloco el tiempo transcurrido de la cancion en el html.
function updateProgressBar(e) {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement;

    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);

    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`;
    }

    if (durationSeconds) {
      durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    }

    // Calculate display for currentTime
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`;
    }
    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
  }
}

// Esta funcion es llamada cada vez que se le hace click a la barra de progreso, en este caso extraigo de THIS (que es el elemento que hizo que se llame a esta funcion, en este caso el div que contiene la barra de progreso) el field de clientWidth que contiene el ancho de la barra de progreso (360px), despues del evento obtengo el field de offsetX que me dice en que PIXEL exacto de la barra de progreso hice click, si hice click en la mitad entonces obtengo 180 ya que es la mitad de 360PX, despues obtengo la duracion total de la cancion a usar toda esta informacion para realizar un calculo que seria el ancho de la barra en el que di click dividido el ancho de la barra de progreso y esto lo multiplico por la duracion de la cancion. Por ejemplo seria 180 / 360 * 182.496(la duracion total de tip-toe sin tener formato legible) y esto me daria 91.248, que seria el valor sin formato legible de la mitad de la cancion ya que hice click en la mitad de la barra de progreso sumado que tambien directamente saco ese valor dividiendo 182.496 por 2, y este valor lo uso para que colocar que la cancion pase a estar en esa parte de la duracion. De esa forma cuando la cancion este avanzado se llama a updateProgressBar actualizando la barra de progreso, esto seria al instante practicamente.
function setProgressBar(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const { duration } = music;
  console.log(duration);
  music.currentTime = (clickX / width) * duration;
}
