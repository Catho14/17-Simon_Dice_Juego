//Declaracion de variables para el juego.
//Orden del juego
let order = [];
//Orden jugador
let playerOrder = [];
//Sobresaltar color destellos numero
let flash;
//Turno
let turn;
//Si se acerto 
let good;
//Turno compu o jugador
let compTurn;

let intervalId;
//Verificacion de botones
let strict = false;
let noise = true;
let on = false;
//Ganador
let win;
//Declaracion de variables de cada elemento en el HTML
const turnCounter = document.querySelector("#turn");
const topLeft = document.querySelector("#topleft");
const topRight = document.querySelector("#topright");
const bottomLeft = document.querySelector("#bottomleft");
const bottomRight = document.querySelector("#bottomright");
const strictButton = document.querySelector("#strict");
const onButton = document.querySelector("#on");
const startButton = document.querySelector("#start");

//Evento boton Strict: Solo para checar si esta activado o no
strictButton.addEventListener('click', (event) => {
  if (strictButton.checked == true) {
    strict = true;
  } else {
    strict = false;
  }
});
//Evento boton encendido: Para visualizar si el juego inicio o no. 
onButton.addEventListener('click', (event) => {
  if (onButton.checked == true) {
    on = true;
    //Envia en el contador dicho caracter
    turnCounter.innerHTML = "-";
  } else {
    on = false;
    //Envia en el contador dicho caracter vacio
    turnCounter.innerHTML = "";
    clearColor();
    clearInterval(intervalId);
  }
});
//Evento para iniciar el proceso del juego
startButton.addEventListener('click', (event) => {
  if (on || win) {
    play();
  }
});
//Empieza la ejecucion del proceso del juego (Valores iniciales): Primera ronda
function play() {
  win = false;
  order = [];
  playerOrder = [];
  flash = 0;
  intervalId = 0;
  turn = 1;
  turnCounter.innerHTML = 1;
  good = true;
  for (var i = 0; i < 20; i++) {
    order.push(Math.floor(Math.random() * 4) + 1);
  }
  compTurn = true;

  intervalId = setInterval(gameTurn, 800);
}
//Turno del juego: Bloquear al jugador fisico mientras el juego este ejecutando los colores girando
function gameTurn() {
  on = false;

  if (flash == turn) {
    clearInterval(intervalId);
    compTurn = false;
    clearColor();
    on = true;
  }

  if (compTurn) {
    clearColor();
    //Parpadeo de cada imagen
    setTimeout(() => {
      if (order[flash] == 1) one();
      if (order[flash] == 2) two();
      if (order[flash] == 3) three();
      if (order[flash] == 4) four();
      flash++;
    }, 200);
  }
}
//Ejecucion de audio y color segun id
function one() {
  if (noise) {
    let audio = document.getElementById("clip1");
    audio.play();
  }
  noise = true;
  topLeft.style.backgroundColor = "lightgreen";
}
//Ejecucion de audio y color segun id
function two() {
  if (noise) {
    let audio = document.getElementById("clip2");
    audio.play();
  }
  noise = true;
  topRight.style.backgroundColor = "tomato";
}
//Ejecucion de audio y color segun id
function three() {
  if (noise) {
    let audio = document.getElementById("clip3");
    audio.play();
  }
  noise = true;
  bottomLeft.style.backgroundColor = "yellow";
}
//Ejecucion de audio y color segun id
function four() {
  if (noise) {
    let audio = document.getElementById("clip4");
    audio.play();
  }
  noise = true;
  bottomRight.style.backgroundColor = "lightskyblue";
}
//Regrese al color original, sin flash
function clearColor() {
  topLeft.style.backgroundColor = "darkgreen";
  topRight.style.backgroundColor = "darkred";
  bottomLeft.style.backgroundColor = "goldenrod";
  bottomRight.style.backgroundColor = "darkblue";
}
//Color flasheado
function flashColor() {
  topLeft.style.backgroundColor = "lightgreen";
  topRight.style.backgroundColor = "tomato";
  bottomLeft.style.backgroundColor = "yellow";
  bottomRight.style.backgroundColor = "lightskyblue";
}
//Evento del btn superior izquierdo al ser presionado por el usuario
topLeft.addEventListener('click', (event) => {
  if (on) {
    playerOrder.push(1);
    check();
    one();
    if(!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
})
//Evento del btn superior derecho al ser presionado por el usuario
topRight.addEventListener('click', (event) => {
  if (on) {
    playerOrder.push(2);
    check();
    two();
    if(!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
})
//Evento del btn inferior izquierdo al ser presionado por el usuario
bottomLeft.addEventListener('click', (event) => {
  if (on) {
    playerOrder.push(3);
    check();
    three();
    if(!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
})
//Evento del btn inferior derecho al ser presionado por el usuario
bottomRight.addEventListener('click', (event) => {
  if (on) {
    playerOrder.push(4);
    check();
    four();
    if(!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
})
//Guarda y sigue los btones presionados correctamente por el usuario para detectar si lo hizo correcto o no
function check() {
  if (playerOrder[playerOrder.length - 1] !== order[playerOrder.length - 1])
    good = false;
//Pasos correctos, juego ganado
  if (playerOrder.length == 3 && good) {
    winGame();
  }
//Pasos incorrectos
  if (good == false) {
    flashColor();
    turnCounter.innerHTML = "NO!";
    setTimeout(() => {
      turnCounter.innerHTML = turn;
      clearColor();
        //Seguir jugando
      if (strict) {
        play();
      } else {
          //
        compTurn = true;
        flash = 0;
        playerOrder = [];
        good = true;
        intervalId = setInterval(gameTurn, 800);
      }
    }, 800);

    noise = false;
  }
//El juego continua sin ganar o perder
  if (turn == playerOrder.length && good && !win) {
    turn++;
    playerOrder = [];
    compTurn = true;
    flash = 0;
    turnCounter.innerHTML = turn;
    intervalId = setInterval(gameTurn, 800);
  }

}
//Funcion para detectar el juego ganado
function winGame() {
  flashColor();
  turnCounter.innerHTML = "WIN!";
  on = false;
  win = true;
}


/* 
Temas vistos
    querySelector(): Devuelve el primer elemento del documento (utilizando un recorrido primero en profundidad pre ordenado de los nodos del documento) que coincida con el grupo 
         especificado de selectores.
    addEventListener():  Registra un evento a un objeto en específico. 
    setInterval():Ejecuta una función o un fragmento de código de forma repetitiva cada vez que termina el periodo de tiempo determinado. Devuelve un ID de proceso.
    clearInterval(): Cancela una acción reiterativa que se inició mediante una llamada a setInterval
    setTimeout(): Establece un temporizador que ejecuta una función o una porción de código después de que transcurre un tiempo establecido.
    play(): Intenta comenzar la reproducción de los medios. Devuelve una promesa (Promise) que se resuelve cuando la reproducción se ha iniciado con éxito.
    Math.floor(): Devuelve el máximo entero menor o igual a un número
    Math.random(): Retorna un punto flotante, un número pseudo-aleatorio dentro del rango [0, 1). Esto es, desde el 0 (Incluido) hasta el 1 pero sin incluirlo (excluido), el cual se 
        puede escalar hasta el rango deseado.
*/


