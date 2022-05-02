from AstarAlgo2 import Astar

class Case:
	def __init__(self, row, col, width, total_rows):
		self.row = row
		self.col = col
		self.width = width
		self.total_rows = total_rows
		self.x = row * width
		self.y = col * width
		self.voisins = []


def make_grid(rows, width):
	grid = []  #Cases envoyé par alex
	gap = width // rows
	for i in range(rows):
		grid.append([])
		for j in range(rows):
			case = Case(i, j, gap, rows)
			grid[i].append(case)
	return grid

def closestToEnd():  #Méthode qui classera les individu du plus pret au plus loin.
	pass

def main(window, width):
	ROWS = 51 #Nombre de colonne envoyé par l'utilisateur
	grid = make_grid(ROWS, width)
	start = None #Position de départ
	end = None #Position de fin

	run = True
	while run:
		run = False
		#Faire roulé l'algo
