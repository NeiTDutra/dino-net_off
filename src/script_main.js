const dino = document.getElementById('dino');
const cenario = document.getElementById('cena');

let isJumping = false;
let isGameOver = false;
let dinoPosition = 20;

function handleKeyUp(event) {

    if(event.keyCode === 32) {

        if(!isJumping) {

            jump();
        }
    }

}

function jump() {
    
    isJumping = true;

    let upTime = setInterval( () => {

        if(dinoPosition >= 40) {

            clearInterval(upTime);

            let downTime = setInterval( () => {

                if(dinoPosition <= 20) {

                    clearInterval(downTime);

                    isJumping = false;
                }
                else {

                    dinoPosition -= 20;
                    dino.style.bottom = dinoPosition + '%';
                }
            }, 60);
        }
        else {

            dinoPosition += 20;
            dino.style.bottom = dinoPosition + '%';
        }
    }, 60);
}

function createCactus() {

    const cactus = document.createElement('div');
    let cactusPosition = 1100;
    let randomCactus = Math.random() * 6000;

    if(isGameOver) return;

    cactus.classList.add('cactus');
    cenario.appendChild(cactus);
    cactus.style.left = cactusPosition + 'px';

    let leftTime = setInterval( () => {

        if(cactusPosition < -60) {

            clearInterval(leftTime);
            cenario.removeChild(cactus);
        }
        else if(cactusPosition > 0 && cactusPosition < 350 && dinoPosition < 80) {

            clearInterval(leftTime);
            isGameOver = true;
            document.getElementById('cena').innerHTML = '<h1 class="gameOverText">Fim de jogo!!</h1>';
        }
        else {

            cactusPosition -= 10;
            cactus.style.left = cactusPosition + 'px';
        }
    }, 20);

    setTimeout(createCactus, randomCactus);
}

createCactus();
document.addEventListener('keyup', handleKeyUp);
