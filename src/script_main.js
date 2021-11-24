const dino = document.getElementById('dino');
const cenario = document.getElementById('cena');

const score = document.getElementById('score');
const hora = document.getElementById('hor');
const minuto = document.getElementById('min');
const segundo = document.getElementById('sec');

let isJumping = false;
let isGameOver = false;
let dinoPosition = 20;
let scoreCount = 0;
var timer = true;

function handleKeyDown(event) {

    if(event.keyCode === 32) {

        if(!isJumping) {

            jump();
        }
    }
}

function jump() {
    
    isJumping = true;

    let upTime = setInterval( () => {

        if(dinoPosition >= 42) {

            clearInterval(upTime);

            let downTime = setInterval( () => {

                if(dinoPosition <= 20) {

                    clearInterval(downTime);

                    isJumping = false;
                }
                else {

                    dinoPosition -= 3;
                    dino.style.bottom = dinoPosition + '%';
                }
            }, 60);
        }
        else {

            dinoPosition += 20;
            dino.style.bottom = dinoPosition + '%';
        }
    }, 40);
}

function createCactus() {

    const cactus = document.createElement('div');
    let cactusPosition = 70;
    let randomCactus = parseInt(Math.random() * 7000);

    if(isGameOver) {
        
        timer = false;
        return;
    }

    cactus.classList.add('cactus');
    cenario.appendChild(cactus);
    cactus.style.left = cactusPosition + '%';

    let leftTime = setInterval( () => {

        if(cactusPosition < 25) {

            clearInterval(leftTime);
            cenario.removeChild(cactus);
            scoreCount += 15;
            score.innerText = scoreCount;
        }
        else if(cactusPosition > 0 && cactusPosition < 35 && dinoPosition < 35) {

            clearInterval(leftTime);
            document
                .getElementById('cena')
                .innerHTML = '<h1 class="gameOverText">Fim de jogo!!</h1><p class="text-center"><a href="index.html">Recarregar</a></p>';
            isGameOver = true;

        }
        else {

            cactusPosition -= 3;
            cactus.style.left = cactusPosition + '%';
        }
    }, 80);

    setTimeout(createCactus, randomCactus);
}

let s = 0;
let m = 0;
let h = 0;

var set = setInterval( () => {

    s += 1;
    
    if(s == 60) s = 0;

    if(s < 10) {

        segundo.innerText = '0'+s;
    }
    else {

        segundo.innerText = s;
    }
    
    if(s == 0) {

        m += 1;

        if(m == 60) m = 0;

        if(m < 10) {

            s = 0;
            minuto.innerText = '0'+m;
        }
        else {

            s = 0;
            minuto.innerText = m;
        }
    }
    if(m == 59) {

        h += 1;

        if(h == 24) h = 0;

        if(h < 10) {

            m = 0;
            hora.innerText = '0'+h;
        }
        else {

            m = 0;
            hora.innerText = h;
        }
    }
}, 1000);

function timeClock() {
    
    if(timer) {

        return set;
    }

    setTimeout(set);
}

window.onload = timeClock();
createCactus();
document.addEventListener('keydown', handleKeyDown);
