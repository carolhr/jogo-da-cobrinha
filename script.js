const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const spanPontos = document.getElementById("pontos");
const spanRecorde = document.getElementById("recorde");
const gameOverScreen = document.getElementById("game-over-screen");
const btnReiniciar = document.getElementById("btn-reiniciar");
const btnPausa = document.getElementById("btn-pausa");
const seletorNivel = document.getElementById("seletor-nivel");

const TAMANHO_SQUARE = 20;
const LINHAS = canvas.height / TAMANHO_SQUARE;
const COLUNAS = canvas.width / TAMANHO_SQUARE;

let cobra = [];
let direcao = { x: 1, y: 0 };
let proximaDirecao = { x: 1, y: 0 };
let comida = { x: 0, y: 0, eEspecial: false };
let pontos = 0;
let recorde = localStorage.getItem("recorde_cobrinha") || 0;
let loopJogo;
let jogoPausado = false;
let velocidadeAtual = 100;
let brilhoEspecial = 0;

let tempoSuperpoder = 0;
const DURACAO_SUPERPODER = 40;

spanRecorde.textContent = recorde;

function iniciarJogo() {
    cobra = [
        { x: 5, y: 10 },
        { x: 4, y: 10 },
        { x: 3, y: 10 }
    ];
    direcao = { x: 1, y: 0 };
    proximaDirecao = { x: 1, y: 0 };
    pontos = 0;
    spanPontos.textContent = pontos;
    jogoPausado = false;
    tempoSuperpoder = 0;
    btnPausa.textContent = "Pausar";
    btnPausa.classList.remove("pausado");
    
    gerarComida();
    gameOverScreen.style.display = "none";
    
    configurarVelocidade();
}

function configurarVelocidade() {
    clearInterval(loopJogo);
    velocidadeAtual = parseInt(seletorNivel.value);
    if (!jogoPausado) {
        loopJogo = setInterval(atualizar, velocidadeAtual);
    }
}

function alternarPausa() {
    if (gameOverScreen.style.display === "flex") return;

    jogoPausado = !jogoPausado;
    if (jogoPausado) {
        clearInterval(loopJogo);
        btnPausa.textContent = "Retomar";
        btnPausa.classList.add("pausado");
        
        ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#ffffff";
        ctx.font = "20px Arial";
        ctx.textAlign = "center";
        ctx.fillText("Jogo Pausado", canvas.width / 2, canvas.height / 2);
    } else {
        btnPausa.textContent = "Pausar";
        btnPausa.classList.remove("pausado");
        loopJogo = setInterval(atualizar, velocidadeAtual);
    }
}

function gerarComida() {
    const eEspecial = Math.random() < 0.2;

    comida = {
        x: Math.floor(Math.random() * COLUNAS),
        y: Math.floor(Math.random() * LINHAS),
        eEspecial: eEspecial
    };

    for (let parte of cobra) {
        if (parte.x === comida.x && parte.y === comida.y) {
            gerarComida();
            break;
        }
    }
}

function atualizar() {
    if (jogoPausado) return;

    direcao = proximaDirecao;
    
    // CORRIGIDO: Agora puxa corretamente o primeiro elemento da lista cobra[0]
    const cabeca = {
        x: cobra[0].x + direcao.x,
        y: cobra[0].y + direcao.y
    };
    
    if (cabeca.x < 0 || cabeca.x >= COLUNAS || cabeca.y < 0 || cabeca.y >= LINHAS || colisaoCorpo(cabeca)) {
        fimDeJogo();
        return;
    }
    
    cobra.unshift(cabeca);
    
    if (cabeca.x === comida.x && cabeca.y === comida.y) {
        if (comida.eEspecial) {
            pontos += 3;
            tempoSuperpoder = DURACAO_SUPERPODER;
        } else {
            pontos += 1;
        }
        
        spanPontos.textContent = pontos;
        
        if (pontos > recorde) {
            recorde = pontos;
            spanRecorde.textContent = recorde;
            localStorage.setItem("recorde_cobrinha", recorde);
        }
        gerarComida();
    } else {
        cobra.pop();
    }
    
    if (tempoSuperpoder > 0) {
        tempoSuperpoder--;
    }
    
    brilhoEspecial += 0.2;
    
    desenhar();
}

function colisaoCorpo(cabeca) {
    for (let i = 1; i < cobra.length; i++) {
        if (cobra[i].x === cabeca.x && cobra[i].y === cabeca.y) {
            return true;
        }
    }
    return false;
}

function desenhar() {
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    const oscilacao = Math.sin(brilhoEspecial);
    const corDouradaDinamica = oscilacao > 0 ? "#FFD700" : "#FFA500";

    cobra.forEach((parte, index) => {
        if (tempoSuperpoder > 0) {
            ctx.fillStyle = index === 0 ? "#FFF59D" : corDouradaDinamica;
            ctx.shadowBlur = 8;
            ctx.shadowColor = "#FFD700";
        } else {
            ctx.fillStyle = index === 0 ? "#4CAF50" : "#81C784";
            ctx.shadowBlur = 0;
        }
        ctx.fillRect(parte.x * TAMANHO_SQUARE, parte.y * TAMANHO_SQUARE, TAMANHO_SQUARE - 2, TAMANHO_SQUARE - 2);
    });
    
    ctx.shadowBlur = 0;

    let raio = TAMANHO_SQUARE / 2;
    ctx.beginPath();
    ctx.arc(comida.x * TAMANHO_SQUARE + raio, comida.y * TAMANHO_SQUARE + raio, raio - 2, 0, Math.PI * 2);

    if (comida.eEspecial) {
        ctx.fillStyle = corDouradaDinamica;
        ctx.shadowBlur = 12;
        ctx.shadowColor = "#FFD700";
    } else {
        ctx.fillStyle = "#FF5252";
    }
    
    ctx.fill();
    ctx.shadowBlur = 0;
}

function fimDeJogo() {
    clearInterval(loopJogo);
    gameOverScreen.style.display = "flex";
}

window.addEventListener("keydown", (e) => {
    if (e.key === "p" || e.key === "P" || e.key === "Escape") {
        alternarPausa();
        return;
    }

    if (jogoPausado) return;

    switch (e.key) {
        case "ArrowUp":
        case "w":
        case "W":
            if (direcao.y === 0) proximaDirecao = { x: 0, y: -1 };
            break;
        case "ArrowDown":
        case "s":
        case "S":
            if (direcao.y === 0) proximaDirecao = { x: 0, y: 1 };
            break;
        case "ArrowLeft":
        case "a":
        case "A":
            if (direcao.x === 0) proximaDirecao = { x: -1, y: 0 };
            break;
        case "ArrowRight":
        case "d":
        case "D":
            if (direcao.x === 0) proximaDirecao = { x: 1, y: 0 };
            break;
        case " ":
            if (gameOverScreen.style.display === "flex") iniciarJogo();
            break;
    }
});

btnReiniciar.addEventListener("click", iniciarJogo);
btnPausa.addEventListener("click", alternarPausa);
seletorNivel.addEventListener("change", configurarVelocidade);

iniciarJogo();
