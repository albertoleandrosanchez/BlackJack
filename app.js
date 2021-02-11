//CHALLENGE 1

//var

var edad = document.getElementById('edad');
const clickBtn = document.getElementById('clickBtn');
const resetBtn = document.getElementById('resetBtn');
const challenge1 = document.getElementById('challenge1');
const ageResult = document.getElementById('age-result');


//Challenge 5 - Black Jack
// ARRAYS
const valorCartas = ['ace', '2', '3', '4', '5', '6','7', '8', '9', 'jack', 'queen', 'king'];
const tipoCartas = ['clubs','hearts','spades','diamonds'];
var cartasElegidas = []
//jguadores
const dPlayer = document.getElementById('player-display');
const dBot = document.getElementById('bot-display');
//botones
const hitBtn = document.getElementById('hitBTN');
const stayBtn = document.getElementById('stayBTN');
const PResetBtn = document.getElementById('PResetBTN');
//resultados displays
var playerPuntaje = document.getElementById('player-puntaje');
var botPuntaje = document.getElementById('bot-puntaje');
// resultados foot
var pGanadas = document.getElementById('pGanadas');
var pEmpatadas = document.getElementById('pEmpatadas');
var pPerdidas = document.getElementById('pPerdidas');

//AUX CHALLENGE
var rondaJugador = 0;
var rondaBot = 0;
var enJuego = true;
var PrimerManoBot = true;

eventListenersChallenge5();
actualizarPuntajeLS();
function eventListenersChallenge5(){
    jugarRondaBot()
    hitBtn.addEventListener('click', ()=>{

        if (enJuego === true){
            jugarRondaJugador()
        }
        else{
            console.log('la partida termino!')
        }
    });
    stayBtn.addEventListener('click', ()=>{
        if(enJuego == true){
            enJuego = false;
            jugarRondaBot()
        }
        else{
            console.log('la partida termino!')
        }
    });
    PResetBTN.addEventListener('click',resetearBJ);
}
                    //Ronda Jugador
function jugarRondaJugador(){
    let valRondaCarta = pedirCarta();
    let tipoCarta = pedirTipoCarta();
    
    if (valRondaCarta ==0 && rondaJugador==0 ){
        rondaJugador += valRondaCarta+11
    }
    else{
        let i = valRondaCarta;   
        if (i >= 9){
            rondaJugador += 10
        }
        else{
            rondaJugador += i+1
        }
        }
        console.log(rondaJugador)
    
    let contAct = dPlayer.querySelector('.contenedor-cartas');
    mostrarCarta(contAct, valRondaCarta,tipoCarta);
    if(rondaJugador < 22){
        actualizarPuntaje(playerPuntaje,rondaJugador);
    }
    else{
        enJuego = false;
        actualizarPuntaje(playerPuntaje,rondaJugador);
        resultado('Perdiste')
    }
}

function mostrarCarta(containerP, valorRondaCarta,tipoCarta){
    let vC = valorCartas[valorRondaCarta]
    let tC = tipoCartas[tipoCarta]
    let carta = document.createElement('img')
    carta.src = `img/Cards/${vC}_of_${tC}.png`
    carta.className = 'cartaDisplay'
    containerP.append(carta);
}
                        //RONDA BOT
function jugarRondaBot(){
    
    let valRondaCarta = pedirCarta();
    let tipoCarta = pedirTipoCarta();
    let contAct = dBot.querySelector('.contenedor-cartas');
    //condiciones por si sale haces blackJack
    if (valRondaCarta ==0 && rondaBot==0 ){
        rondaBot += valRondaCarta+11
    }
    else{
        let i = valRondaCarta;   
        if (i >= 9){
            rondaBot += 10
        }
        else{
            rondaBot += i+1
        }
    }
    console.log(PrimerManoBot)
    mostrarCarta(contAct, valRondaCarta,tipoCarta);
    // primera vez que juega el bot
    if(PrimerManoBot==true){
        actualizarPuntaje(botPuntaje,rondaBot);
        PrimerManoBot = false;
    }
    else{
        //al poner stay
        if(rondaBot==rondaJugador){
            actualizarPuntaje(botPuntaje,rondaBot);
            resultado('Empataste');
        }
        else if(rondaBot<22){
            actualizarPuntaje(botPuntaje,rondaBot);
            if(rondaBot>rondaJugador){
                resultado('Perdiste')
            }
            else{
                setTimeout(jugarRondaBot(),10000)
            }
        }
        else{
            enJuego = false;
            actualizarPuntaje(botPuntaje,rondaBot);
            resultado('Ganaste')
        }
    }
}

                //RESET//
function resetearBJ(){
    limpiarTablero(dPlayer)
    limpiarTablero(dBot)
    rondaJugador = 0;
    rondaBot = 0;
    actualizarPuntaje(botPuntaje,rondaBot);
    actualizarPuntaje(playerPuntaje,rondaJugador);
    enJuego = true;
    PrimerManoBot = true;

    jugarRondaBot();
    console.log(enJuego)
}

function actualizarPuntaje(player, valor){
    player.innerText= valor
}

function resultado(res){
    switch(res){
        case 'Perdiste':
            playerPuntaje.innerText='PERDISTEE!!!'
            actLSBJ('Perdiste');
            actualizarPuntajeLS()
            break;    
        case 'Ganaste':
            playerPuntaje.innerText='GANASTE!!!!'
            actLSBJ('Ganaste');
            actualizarPuntajeLS()
            break;
        case 'Empataste':
            actLSBJ('Empataste');
            playerPuntaje.innerText='EMPATEEE!!!!'
            actualizarPuntajeLS()
            break;
    }
}
function pedirCarta(){
    valorCarta= randomNumTo(12);
    return valorCarta
}
function pedirTipoCarta(){
    return randomNumTo(4)
}
//AUX
function getCeil(x) {
    return Math.ceil(x);
 }

function randomNumTo(num){
    return Math.floor(Math.random()*num)
}

function limpiarTablero(jugador){
    var contenedorActual = jugador.querySelector('.contenedor-cartas');
    console.log(contenedorActual.firstChild);
    while(contenedorActual.firstChild){
        contenedorActual.removeChild(contenedorActual.firstChild);
    }
}

function actLSBJ(res){
    if (localStorage.getItem(res)!==null){
        let i = parseInt(localStorage.getItem(res));
        localStorage.setItem(res,i+1)
    }
    else{
        localStorage.setItem(res,1)
    }    
}

function actualizarPuntajeLS(){
    if (localStorage.getItem('Ganaste')!= undefined){
        pGanadas.innerHTML= localStorage.getItem('Ganaste')
    }
    if (localStorage.getItem('Empataste')!= undefined){
        pEmpatadas.innerHTML= localStorage.getItem('Empataste')
    }
    if (localStorage.getItem('Perdiste')!= undefined){
        pPerdidas.innerHTML= localStorage.getItem('Perdiste')
    }
}
//