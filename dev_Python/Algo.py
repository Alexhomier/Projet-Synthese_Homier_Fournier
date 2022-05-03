from queue import PriorityQueue
from AstarAlgo2 import Astar

class Case:
	def __init__(self, row, col, width, total_rows, type):
		self.type = type
		self.row = row
		self.col = col
		self.width = width
		self.total_rows = total_rows
		self.x = row * width
		self.y = col * width
		self.has_individu = False
		self.voisins = []

	def update_voisins(self, grid): #Regarde si voisin est mur ou non
		self.voisins = []
		if self.row < self.total_rows - 1 and not grid[self.row + 1][self.col].is_barrier(): # DOWN
			self.voisins.append(grid[self.row + 1][self.col])

		if self.row > 0 and not grid[self.row - 1][self.col].is_barrier(): # UP
			self.voisins.append(grid[self.row - 1][self.col])

		if self.col < self.total_rows - 1 and not grid[self.row][self.col + 1].is_barrier(): # RIGHT
			self.voisins.append(grid[self.row][self.col + 1])

		if self.col > 0 and not grid[self.row][self.col - 1].is_barrier(): # LEFT
			self.voisins.append(grid[self.row][self.col - 1])


def make_grid(rows, width):
	grid = [] 
	gap = width // rows
	for i in range(rows):
		grid.append([])
		for j in range(rows):
			case = Case(i, j, gap, rows)
			grid[i].append(case)
	return grid

def closestToEnd(grille, individus, sortie):  #Méthode qui classera les individu du plus pret au plus loin.
	grid = grille
	individu_array = individus
	end = sortie
	closest_end = PriorityQueue()
	count = 0
	for individu in individu_array:
		came_from = Astar.algorithm(grid, individu, end)
		closest_end.put((len(came_from), count, individu))
		count += 1
	return closest_end

def main(width, rows):
	ROWS = 51 #Nombre de colonne envoyé par l'utilisateur
	grid = make_grid(ROWS, width)
	start = None #Position de départ
	end = None #Position de fin

	run = True
	while run:
		run = False
		#Faire roulé l'algo
