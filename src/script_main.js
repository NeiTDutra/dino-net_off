const dino = document.getElementById('dino');

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
            }, 20);
        }
        else {

            dinoPosition += 20;
            dino.style.bottom = dinoPosition + '%';
        }
    }, 20);
}

function createCactus() {

    const cactus = document.getElementById('cactus');
    let cactusPosition = 1000;
    let randomCactus = Math.random() * 6000;

    if(isGameOver) return;

    cactus.classList.add('cactus');
    cactus.style.left = cactusPosition + 'px';

    let leftTime = setInterval( () => {

        if(cactusPosition < -60) {

            clearInterval(leftTime);
            
        }
    });
}

document.addEventListener('keyup', handleKeyUp);
