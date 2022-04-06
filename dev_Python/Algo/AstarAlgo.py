import pygame
import math
from queue import PriorityQueue

#Avec pygame, 0,0 est en haut a gauche. Donc plus on descends y monte et plus on va a droite x monte

WIDTH = 800 #Taille de la fenêtre
WIN = pygame.display.set_mode((WIDTH, WIDTH))
pygame.display.set_caption("A* Path Finding Algorithm")

RED = (255, 0, 0)  #Closed
GREEN = (0, 255, 0)
GREY = (128, 128, 128)
ORANGE = (255, 165 ,0) #Start
TURQUOISE = (64, 224, 208) #End
PURPLE = (128, 0, 128) #Path
WHITE = (255, 255, 255) #Espace
BLACK = (0, 0, 0) #Murs

class Case:
	def __init__(self, row, col, width, total_rows):
		self.row = row
		self.col = col
		self.width = width
		self.total_rows = total_rows
		self.x = row * width
		self.y = col * width
		self.color = WHITE  #Couleur d'une case n'ayant pas été visité
		self.neighbors = []

	def get_position(self):
		return self.row, self.col

	def is_closed(self):  # Est déja regardé
		return self.color == RED

	def is_open(self):  # Est regardé (dans l'open set)
		return self.color == GREEN

	def is_barrier(self):  # Est un mur
		return self.color == BLACK

	def is_start(self): # Est le début
		return self.color == ORANGE

	def is_end(self): # Est la fin
		return self.color == TURQUOISE

	def reset(self):
		self.color = WHITE

	def make_start(self):   #Méthode make_case(type) if(start) color = orange Regarder si mieux
		self.color = ORANGE

	def make_closed(self):
		self.color = RED

	def make_open(self):
		self.color = GREEN

	def make_barrier(self):
		self.color = BLACK

	def make_end(self):
		self.color = TURQUOISE

	def make_path(self):
		self.color = PURPLE

	def draw(self, win):
		pygame.draw.rect(win, self.color, (self.x, self.y, self.width, self.width))

	def update_neighbors(self, grid): #Regarde si voisin est mur ou non
		self.neighbors = []
		if self.row < self.total_rows - 1 and not grid[self.row + 1][self.col].is_barrier(): # DOWN
			self.neighbors.append(grid[self.row + 1][self.col])

		if self.row > 0 and not grid[self.row - 1][self.col].is_barrier(): # UP
			self.neighbors.append(grid[self.row - 1][self.col])

		if self.col < self.total_rows - 1 and not grid[self.row][self.col + 1].is_barrier(): # RIGHT
			self.neighbors.append(grid[self.row][self.col + 1])

		if self.col > 0 and not grid[self.row][self.col - 1].is_barrier(): # LEFT
			self.neighbors.append(grid[self.row][self.col - 1])

	def __lt__(self, other):   #Less than
		return False

def h(p1, p2): #Heuristic function (manhattan distance)
	x1, y1 = p1
	x2, y2 = p2
	return abs(x1 - x2) + abs(y1 - y2)

def make_grid(rows, width):
	grid = []  #Contient les cases
	gap = width // rows
	for i in range(rows):
		grid.append([])
		for j in range(rows):
			case = Case(i, j, gap, rows)
			grid[i].append(case)
	return grid

def draw_grid(win, rows, width): #Dessine la grid pour le retour visuel
	gap = width // rows
	for i in range(rows): #Horizontal
		pygame.draw.line(win, GREY, (0, i * gap), (width, i * gap))
		for j in range(rows): #Vertical
			pygame.draw.line(win, GREY, (j * gap, 0), (j * gap, width))

def draw(win, grid, rows, width):
	win.fill(WHITE)
	for row in grid:
		for case in row:
			case.draw(win)

	draw_grid(win, rows, width)
	pygame.display.update()

def get_clicked_pos(pos, rows, width): #Retourne la position cliqué
	gap = width // rows
	y, x = pos
	row = y // gap
	col = x // gap

	return row, col

def main(win, width):
	ROWS = 50 #Nombre de colonne dans le carré de 1000x1000
	grid = make_grid(ROWS, width)
	start = None #Position de départ
	end = None #Position de fin

	run = True
	while run:
		draw(win, grid, ROWS, width)
		for event in pygame.event.get():
			if event.type == pygame.QUIT: #Devrait toujours être le premier
				run = False

			if pygame.mouse.get_pressed()[0]:  #Left mouse button
				pos = pygame.mouse.get_pos()
				row, col = get_clicked_pos(pos, ROWS, width)
				case = grid[row][col] #Accède à la case à cette position
				if not start and case != end:
					start = case
					start.make_start()
				elif not end and case != start:
					end = case
					end.make_end()
				elif case != end and case != start:
					case.make_barrier()

			elif pygame.mouse.get_pressed()[2]: #Right mouse button / Effacer
				pos = pygame.mouse.get_pos()
				row, col = get_clicked_pos(pos, ROWS, width)
				case = grid[row][col]
				case.reset()
				if case == start:
					start = None
				elif case == end:
					end = None

			if event.type == pygame.KEYDOWN:
				if event.key == pygame.K_SPACE and start and end:
					pass
	pygame.quit()

if __name__ == '__main__':
	main(WIN, WIDTH)