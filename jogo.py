import random
import sys
import pygame

# Inicialização do Pygame
pygame.init()

# Dimensões da tela e tamanho dos blocos
LARGURA, ALTURA = 600, 400
TAMANHO_CELULA = 20

# Cores (RGB)
PRETO = (0, 0, 0)
VERDE = (0, 255, 0)
VERMELHO = (255, 0, 0)
BRANCO = (255, 255, 255)

# Configuração da tela e relógio
tela = pygame.display.set_mode((LARGURA, ALTURA))
pygame.display.set_caption("Jogo da Cobrinha - Python")
relogio = pygame.time.Clock()


def rodar_jogo():
  cobra = [[100, 100], [80, 100], [60, 100]]
  velocidade_x = TAMANHO_CELULA
  velocidade_y = 0

  comida = [
      random.randrange(0, LARGURA, TAMANHO_CELULA),
      random.randrange(0, ALTURA, TAMANHO_CELULA),
  ]

  pontuacao = 0

  while True:
    for evento in pygame.event.get():
      if evento.type == pygame.QUIT:
        pygame.quit()
        sys.exit()
      elif evento.type == pygame.KEYDOWN:
        if evento.key == pygame.K_UP and velocidade_y == 0:
          velocidade_x = 0
          velocidade_y = -TAMANHO_CELULA
        elif evento.key == pygame.K_DOWN and velocidad_y == 0:
          velocidade_x = 0
          velocidade_y = TAMANHO_CELULA
        elif evento.key == pygame.K_LEFT and velocidade_x == 0:
          velocidade_x = -TAMANHO_CELULA
          velocidade_y = 0
        elif evento.key == pygame.K_RIGHT and velocidade_x == 0:
          velocidade_x = TAMANHO_CELULA
          velocidade_y = 0

    cabeca_x = cobra[0][0] + velocidade_x
    cabeca_y = cobra[0][1] + velocidade_y
    nova_cabeca = [cabeca_x, cabeca_y]

    if (
        cabeca_x < 0
        or cabeca_x >= LARGURA
        or cabeca_y < 0
        or cabeca_y >= ALTURA
    ):
      break

    if nova_cabeca in cobra:
      break

    cobra.insert(0, nova_cabeca)

    if nova_cabeca == comida:
      pontuacao += 1
      comida = [
          random.randrange(0, LARGURA, TAMANHO_CELULA),
          random.randrange(0, ALTURA, TAMANHO_CELULA),
      ]
    else:
      cobra.pop()

    tela.fill(PRETO)
    pygame.draw.rect(
        tela, VERMELHO, (comida[0], comida[1], TAMANHO_CELULA, TAMANHO_CELULA)
    )

    for parte in cobra:
      pygame.draw.rect(
          tela, VERDE, (parte[0], parte[1], TAMANHO_CELULA, TAMANHO_CELULA)
      )

    pygame.display.update()
    relogio.tick(10)


if __name__ == "__main__":
  rodar_jogo()
