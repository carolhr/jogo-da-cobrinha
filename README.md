# 🐍 Jogo da Cobrinha (Snake Game) - Web & Python

Um projeto divertido que recria o clássico **Jogo da Cobrinha** em duas versões totalmente independentes: uma versão moderna para rodar direto no navegador (**HTML5/JavaScript**) e uma versão clássica feita em **Python**.

---

## 🚀 Versão Web (HTML/CSS/JS)

A versão principal foi desenvolvida para ser jogada online, direto do navegador, com uma interface estilizada e mecânicas adicionais.

### 🌟 Diferenciais e Recursos:
- **Frutas Especiais Douradas:** Há 20% de chance de surgir uma maçã dourada brilhante que concede **+3 pontos** e ativa um modo superpoder.
- **Efeito Visual Dourado:** Ao comer a fruta especial, a cobrinha ganha uma aura neon e muda de cor temporariamente.
- **Seleção de Dificuldade:** Menu dinâmico com 4 níveis (Fácil, Médio, Difícil e Insano).
- **Sistema de Pausa:** Botão para pausar/retomar o jogo a qualquer momento (atalho nas teclas `P` ou `Esc`).
- **Placar de Recorde:** O recorde máximo fica salvo no navegador através do `localStorage`.
- **Fundo Animado:** Layout divertido com formas geométricas e ícones flutuantes de videogame.

### 🛠️ Como Jogar a Versão Web:
1. Abra a pasta do projeto.
2. Dê um duplo clique no arquivo `index.html` (ou use a extensão *Live Server* no VS Code).
3. Controle a cobra usando as setas do teclado ou as teclas `W`, `A`, `S`, `D`.
4. Use a barra de espaço para reiniciar caso dê Game Over.

---

## 🐍 Versão Python (Pygame)

Como alternativa de código bônus, a pasta também inclui a versão clássica desenvolvida em ambiente Desktop utilizando Python.

### 🛠️ Como Rodar a Versão Python:
1. Certifique-se de ter o Python instalado em sua máquina.
2. Instale a biblioteca gráfica Pygame abrindo o terminal e digitando:
   ```bash
   pip install pygame
   ```
3. Execute o arquivo do jogo com o comando:
   ```bash
   python jogo.py
   ```
4. Controle a cobrinha utilizando as setas direcionais do teclado.

---

## 📂 Estrutura de Arquivos da Pasta

```text
├── index.html   # Estrutura visual da página do jogo
├── style.css    # Fundo quadriculado e animações das formas flutuantes
├── script.js     # Lógica do jogo, colisões, níveis e frutas especiais
├── jogo.py      # Versão bônus alternativa em Python (Pygame)
└── README.md    # Documentação do projeto (Este arquivo)
```

---
Desenvolvido com 💚 para fins de aprendizado e diversão!
