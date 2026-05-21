import pygame
import sys
import random

# Inicialização do Pygame
pygame.init()

# Cores
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)
GRAY = (200, 200, 200)

# Configurações da tela
WIDTH, HEIGHT = 800, 600
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption('Pong - Atari Style')
clock = pygame.time.Clock()

# Configurações do jogo
BALL_SPEED_X = 7
BALL_SPEED_Y = 7
PADDLE_SPEED = 8
PADDLE_WIDTH, PADDLE_HEIGHT = 15, 100

class Ball:
    def __init__(self):
        self.rect = pygame.Rect(WIDTH//2 - 10, HEIGHT//2 - 10, 20, 20)
        self.speed_x = BALL_SPEED_X * random.choice((1, -1))
        self.speed_y = BALL_SPEED_Y * random.choice((1, -1))
        
    def move(self):
        self.rect.x += self.speed_x
        self.rect.y += self.speed_y
        
        # Colisão com o teto e chão
        if self.rect.top <= 0 or self.rect.bottom >= HEIGHT:
            self.speed_y *= -1

    def reset_position(self):
        self.rect.center = (WIDTH//2, HEIGHT//2)
        self.speed_x *= random.choice((1, -1))
        self.speed_y *= random.choice((1, -1))

class Paddle:
    def __init__(self, x, y):
        self.rect = pygame.Rect(x, y, PADDLE_WIDTH, PADDLE_HEIGHT)
        self.score = 0

    def move_up(self):
        self.rect.y -= PADDLE_SPEED
        if self.rect.top < 0:
            self.rect.top = 0

    def move_down(self):
        self.rect.y += PADDLE_SPEED
        if self.rect.bottom > HEIGHT:
            self.rect.bottom = HEIGHT

def main():
    # Objetos
    player = Paddle(WIDTH - 20 - PADDLE_WIDTH, HEIGHT//2 - PADDLE_HEIGHT//2)
    opponent = Paddle(20, HEIGHT//2 - PADDLE_HEIGHT//2)
    ball = Ball()
    
    font = pygame.font.Font(None, 74)

    running = True
    while running:
        # 1. Tratamento de eventos
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False
        
        keys = pygame.key.get_pressed()
        if keys[pygame.K_UP]:
            player.move_up()
        if keys[pygame.K_DOWN]:
            player.move_down()

        # 2. Lógica do oponente (IA simples)
        if opponent.rect.centery < ball.rect.y:
            opponent.rect.y += PADDLE_SPEED - 3 # Movimento um pouco mais lento para dar chance
        if opponent.rect.centery > ball.rect.y:
            opponent.rect.y -= PADDLE_SPEED - 3
            
        # Limita movimento do oponente
        if opponent.rect.top < 0:
            opponent.rect.top = 0
        if opponent.rect.bottom > HEIGHT:
            opponent.rect.bottom = HEIGHT

        # 3. Lógica da bola
        ball.move()

        # Colisão com as raquetes
        if ball.rect.colliderect(player.rect) and ball.speed_x > 0:
            ball.speed_x *= -1
        
        if ball.rect.colliderect(opponent.rect) and ball.speed_x < 0:
            ball.speed_x *= -1

        # Pontuação
        if ball.rect.left <= 0:
            player.score += 1
            ball.reset_position()
            
        if ball.rect.right >= WIDTH:
            opponent.score += 1
            ball.reset_position()

        # 4. Desenho na tela
        screen.fill(BLACK)
        
        # Linha central divisória
        pygame.draw.aaline(screen, GRAY, (WIDTH//2, 0), (WIDTH//2, HEIGHT))
        
        pygame.draw.rect(screen, WHITE, player.rect)
        pygame.draw.rect(screen, WHITE, opponent.rect)
        # Bola no estilo "quadrado" clássico do Pong
        pygame.draw.rect(screen, WHITE, ball.rect)
        
        # Textos de pontuação
        player_text = font.render(str(player.score), True, WHITE)
        screen.blit(player_text, (WIDTH//2 + 50, 50))
        
        opponent_text = font.render(str(opponent.score), True, WHITE)
        screen.blit(opponent_text, (WIDTH//2 - 50 - opponent_text.get_width(), 50))

        pygame.display.flip()
        clock.tick(60)

    pygame.quit()
    sys.exit()

if __name__ == "__main__":
    main()
