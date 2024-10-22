let player;
let playerDirection = 0; // Inicialmente sem movimento
let playerPositionX;
let playerPositionY;
let game = false;
let frames;
let screenWidth = window.innerWidth;
let screenHeight = window.innerHeight;
let contSacolas;    
let contSacolasEliminadas = 0;
let points_ = document.querySelector("#total-sacolas");
let velSacolas = 2.9;
let time = 300;
let vel = 2.7;

let play = document.querySelector(".play-window");
let initial = document.querySelector(".initial-window");

document.addEventListener('mousedown', function(event) {
    shot(playerPositionX+1,playerPositionY-10);
});

function Moviment(event) {
    const tecla = event.code;
    if (tecla === "ArrowLeft" || tecla === "KeyA") {
        playerDirection = -vel;
        console.log(vel);
        console.log(time);
    } else if (tecla === "ArrowRight" || tecla === "KeyD") {
        playerDirection = vel;
        console.log(vel);
        console.log(time);
    } else if (tecla === "Space") {
        shot(playerPositionX+1,playerPositionY-10);
    } else if (tecla === "Enter") {
        window.location.href = "index.html"
    }
}

function limitPlayerMovement() {
    let playerWidth = player.offsetWidth;

    // Limita o player à borda esquerda
    if (playerPositionX < 0) {
        playerPositionX = 0;
    }

    // Limita o player à borda direita
    if (playerPositionX + playerWidth > screenWidth) {
        playerPositionX = screenWidth - playerWidth;
    }

    // Atualiza a posição do player após aplicar as limitações
    player.style.left = playerPositionX + "px";
}

function setTime(time) {
    setInterval(createSacola, time);    
    clearInterval(createSacola);
    console.log(time+"USUAL")
}

function createSacola() {
    if (game) {
        let y = 0;
        let x = Math.random()*screenWidth;

        let sacola = document.createElement("div");
        
        let atributeOne = document.createAttribute("class");
        let atributeTwo = document.createAttribute("style");
        
        atributeOne.value = "sacola";
        atributeTwo.value = "top: "+y+"px;left:"+x+"px";

        sacola.setAttributeNode(atributeOne);
        sacola.setAttributeNode(atributeTwo);
        document.body.appendChild(sacola);
    }
}

function sacolaControl() {
    let sacolas = document.querySelectorAll(".sacola");
    let sacolasLenght = sacolas.length;
    for (let i = 0;i < sacolasLenght;i++) {
        if (sacolas[i]) {
            let indPosition = sacolas[i].offsetTop;
            indPosition+=velSacolas;
            sacolas[i].style.top = indPosition + "px";
            if (indPosition>screenHeight) {
                sacolas[i].remove();
            }
        }
    }
}

function colisionSacola(shot) {
    let sacolas = document.querySelectorAll(".sacola");
    let lengthSacolas = sacolas.length;
    let most_vel = document.getElementById("most-vel");
    let most_vel_inimigo = document.getElementById("most-vel-inimigo");

    most_vel.textContent = vel;
    most_vel_inimigo.textContent = velSacolas;

    for (let i = 0;i < lengthSacolas;i++) {
        if (sacolas[i]) {
            if (((shot.offsetTop<=(sacolas[i].offsetTop+64))&&((shot.offsetTop+5)>=(sacolas[i].offsetTop)))&& ((shot.offsetLeft<=(sacolas[i].offsetLeft+64))&&(shot.offsetLeft+5)>=(sacolas[i].offsetLeft))) {
                sacolas[i].remove();
                shot.remove();
                contSacolasEliminadas++;
                points_.innerHTML = contSacolasEliminadas;
                if (contSacolasEliminadas < 20) {
                    console.log('rodando velocidade inicial');
                }
                else if (contSacolasEliminadas >= 20  && contSacolasEliminadas < 30 ) {
                    vel = 3.7;
                    velSacolas = 3.9;
                } else if (contSacolasEliminadas >= 30 && contSacolasEliminadas < 40 ) {
                    vel = 4.9;
                    velSacolas = 5.5;
                    // setTime(1200);
                } else if (contSacolasEliminadas >= 40 && contSacolasEliminadas < 50 ) {
                    vel = 5.9;
                    velSacolas = 6.9;
                    // setTime(1150);
                } else if (contSacolasEliminadas >= 50 && contSacolasEliminadas < 60 ) {
                    vel = 6.6;
                    velSacolas = 7.9;
                    // setTime(1000);
                } else if (contSacolasEliminadas >= 60 && contSacolasEliminadas < 70 ) {
                    vel = 7.6;
                    velSacolas = 8.5
                    // setTime(850)
                } else if (contSacolasEliminadas <= 80) {
                    vel = 8.1;
                    velSacolas = 9.7
                    // setTime(700)
                } else {
                    console.log("fim");
                    velSacolas = 15;
                    // setTime(400);
                }
            }
        }
    } 
}

function shot(x,y) {
    let shot = document.createElement('div');
    let logo = document.createElement('p');
    logo.innerHTML = "C";
    logo.style.color = "white"
    let atributeOne = document.createAttribute("class");
    let atributeTwo = document.createAttribute("style");
    atributeOne.value = "playerShot";
    atributeTwo.value = "top: "+y+"px;left:"+x+"px";
    shot.setAttributeNode(atributeOne);
    shot.setAttributeNode(atributeTwo);
    // shot.appendChild(logo);
    document.body.appendChild(shot);
}

function shotControl() {
    let shots = document.getElementsByClassName("playerShot");
    let lengthShots = shots.length;
    for (let i = 0;i < lengthShots;i++) {
        if(shots[i]) {
            let shotPosition = shots[i].offsetTop;
            shotPosition-=3;
            shots[i].style.top = shotPosition + "px";
            colisionSacola(shots[i]);
            if (shotPosition<0) {
                shots[i].remove();
            }
        }
    }
}

function stopMovement(event) {
    const tecla = event.code;
    if (tecla === "ArrowLeft" || tecla === "KeyA" || tecla === "ArrowRight" || tecla === "KeyD" ) {
        playerDirection = 0; // Para o movimento quando a tecla é solta
    }
}

function playerControl() {
    playerPositionX += playerDirection * 2;
    limitPlayerMovement(); // Limita o movimento do player
    player.style.left = playerPositionX + "px";
}
    

function gameLoop() {
    if (game) {
        playerControl(); 
        shotControl();
        sacolaControl();
        detectCollisionPlayerSacola();
    }
    frames = requestAnimationFrame(gameLoop);
}

function initGameComponents() {
    game = true;

    playerDirection = 0;
    playerPositionX = screenWidth / 2 -10;
    playerPositionY = screenHeight / 2;
    player = document.getElementById("player");
    player.style.top = playerPositionY + "px";
    player.style.left = playerPositionX + "px";
    contSacolas = 0;
    setInterval(createSacola, time);    
    clearInterval(createSacola);
    console.log(time+"INIT")

    gameLoop();
}

function detectCollisionPlayerSacola() {
    let sacolas = document.querySelectorAll(".sacola");
    let sacolasLength = sacolas.length;
    let playerWidth = player.offsetWidth;
    let playerHeight = player.offsetHeight;

    for (let i = 0; i < sacolasLength; i++) {
        if (sacolas[i]) {
            let sacolaX = sacolas[i].offsetLeft;
            let sacolaY = sacolas[i].offsetTop;
            let sacolaWidth = sacolas[i].offsetWidth;
            let sacolaHeight = sacolas[i].offsetHeight;

            // Verifica se há sobreposição entre o player e a sacola
            if (playerPositionX < sacolaX + sacolaWidth &&
                playerPositionX + playerWidth > sacolaX &&
                playerPositionY < sacolaY + sacolaHeight &&
                playerPositionY + playerHeight > sacolaY) {
                
                // Colisão detectada
                sacolas[i].remove(); // Remover a sacola em caso de colisão
                let derrotado = document.querySelector('.player-derroted');
                let pontos_finais = document.querySelector('#pontos-finais');
                derrotado.style.display = "block";
                pontos_finais.textContent = points_.textContent;
                game = false;
                // let error = document.querySelector(".play-window-screen-erro");
                // error.style.display = "block";
            }
        }
    }
}


window.addEventListener("load", initGameComponents);
document.addEventListener("keydown", Moviment);
document.addEventListener("keyup", stopMovement);
