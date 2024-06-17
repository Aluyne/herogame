const gameContent = document.querySelector("#gameContent");
const startContent = document.querySelector("#startContent");
const startFight = document.querySelector("#startFight");
const versus = document.querySelector("#versus");
const playerContent = document.querySelector("#playerContent");
const info1 = document.querySelector("#info1");
const info2 = document.querySelector("#info2");

// Joueur 1
const player1 = 1;
let player1Pv = 100;

//Joueur 2
const player2 = 2;
let player2Pv = 100;

// Choix aléatoire du joueur
const startingPlayer = () => {
    return Math.random() < 0.5 ? player1 : player2;
};
let currentPlayer;
console.log(currentPlayer);

// Dmg aléatoire des attaques

const randomAttack = () => {
    const min = 30;
    const max = 51;
    return Math.floor(Math.random() * (max - min)) + min;
};

// Commencer le combat

startFight.addEventListener("click", () => {
    startContent.style.display = "none";

    info1.textContent = `${player1Pv} PV`;
    info2.textContent = `${player2Pv} PV`;

    currentPlayer = startingPlayer();

    if (currentPlayer === player1) {
        versus.textContent = "Vous commencez !";
    } else {
        versus.textContent = "Le Gobelin commence !";
    }

    setTimeout(() => {
        versus.style.display = "none";
    }, 2000);

    playGame();
});

// Game logique

const playGame = () => {
    if (currentPlayer === player1) {
        playerAction();
    } else {
        setTimeout(() => {
            computerAction();
        }, 2500);
    }
};

// Action Joueur

const playerAction = () => {
    const attackBtn = document.createElement("button");
    attackBtn.textContent = "Attaquer";
    attackBtn.className =
        "bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mx-auto block";
    gameContent.appendChild(attackBtn);

    attackBtn.addEventListener("click", () => {
        let dmg = randomAttack();

        let playerDmg = document.createElement("p");
        playerDmg.textContent = `Votre attaque inflige ${dmg} dégâts`;
        playerDmg.className = "font-bold text-xl p-4 text-center";
        gameContent.appendChild(playerDmg);

        setTimeout(() => {
            playerDmg.style.display = "none";
        }, 2000);

        player2Pv -= dmg;
        info2.textContent = `${player2Pv} PV`;
        attackBtn.style.display = "none";

        if (checkEnd()) {
            return;
        }

        setTimeout(() => {
            currentPlayer = player2;
            playGame();
        }, 2000);
    });
};

// Action ordinateur

const computerAction = () => {
    let dmg = randomAttack();

    let computerDmg = document.createElement("p");
    computerDmg.textContent = `Le Gobelin vous inflige ${dmg} dégâts`;
    computerDmg.className = "font-bold text-xl p-4 text-center";
    gameContent.appendChild(computerDmg);

    setTimeout(() => {
        computerDmg.style.display = "none";
    }, 2000);

    player1Pv -= dmg;
    info1.textContent = `${player1Pv} PV`;

    if (checkEnd()) {
        return;
    }

    setTimeout(() => {
        currentPlayer = player1;
        playGame();
    }, 2000);
};

// Condition victoire

const checkEnd = () => {
    if (player1Pv <= 0) {
        setTimeout(() => {
            const playerLose = document.createElement("p");
            playerLose.textContent = "Le Gobelin vous à massacré !";
            playerLose.id = "resultText";
            playerLose.className = "font-bold text-xl p-4 text-center";
            gameContent.appendChild(playerLose);
        }, 2000);
        setTimeout(() => {
            reload();
        }, 4000);
        return true;
    } else if (player2Pv <= 0) {
        setTimeout(() => {
            const playerWin = document.createElement("p");
            playerWin.textContent = "Victoire !";
            playerWin.id = "resultText";
            playerWin.className = "font-bold text-xl p-4 text-center";
            gameContent.appendChild(playerWin);
        }, 2000);
        setTimeout(() => {
            reload();
        }, 4000);
        return true;
    }
    return false;
};

// image/text debut et transi
const history = document.getElementById("history");
const imageNames = ["img1.jpg", "img2.jpg", "img3.jpg", "img4.jpg", "img5.jpg"];
const text = [
    "Le vent souffle doucement tandis que l'aventurier contemple l'horizon, prêt à se lancer dans une quête épique à travers des terres inconnues.",
    "Après des heures de marche, il se retrouve devant l'entrée d'une forêt sombre et inquiétante, un frisson parcourt son échine.",
    "Le chemin serpente à travers la forêt dense, les arbres menaçants semblent murmurer des secrets oubliés depuis longtemps.",
    "Au cœur de la forêt, l'aventurier découvre l'entrée d'une grotte obscure, le début d'un passage vers les profondeurs mystérieuses.",
    "À l'intérieur de la grotte, l'obscurité se fait oppressante, un rugissement terrifiant retentit, annonçant l'arrivée imminente d'un monstre redoutable.",
];

let currentImageIndex = 0;

const bgImg = () => {
    const imagePath = `img/${imageNames[currentImageIndex]}`;
    document.getElementById(
        "bg-image"
    ).style.backgroundImage = `url(${imagePath})`;
    history.textContent = text[currentImageIndex];
};

const bgChange = () => {
    history.style.display = "block";
    setInterval(() => {
        if (currentImageIndex < imageNames.length - 1) {
            currentImageIndex++;
            bgImg();
        } else {
            setTimeout(() => {
                history.style.display = "none";
                gameContent.style.display = "block";
            }, 1000);
        }
    }, 4000);
};

// Commencer l'aventure

document.getElementById("startGame").addEventListener("click", () => {
    document.getElementById("startGame").style.display = "none";
    bgChange();
});

window.onload = () => {
    bgImg();
};

// Btn rejouer

const reload = () => {
    const replayBtn = document.createElement("button");
    replayBtn.textContent = "Rejouer";
    replayBtn.className =
        "bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mx-auto block";
    gameContent.insertBefore(replayBtn, gameContent.firstChild);

    replayBtn.addEventListener("click", () => {
        replayBtn.style.display = "none";
        replay();
    });
};

const replay = () => {
    player1Pv = 100;
    player2Pv = 100;
    currentPlayer = startingPlayer();

    document.querySelector("#resultText").style.display = "none";
    startContent.style.display = "flex";
    versus.style.display = "flex"
    versus.textContent = "VS";

    info1.textContent = `${player1Pv} PV`;
    info2.textContent = `${player2Pv} PV`;
};
