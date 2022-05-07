from queue import PriorityQueue
from Astar import Astar


class Case:
    def __init__(self, row, col, width, total_rows, type):
        self.type = type
        self.row = row
        self.col = col
        self.width = width
        self.total_rows = total_rows
        self.x = row * width
        self.y = col * width
        self.voisins = []
        self.came_from = []
        
    def reset(self):
        self.type = "Salle"

    def get_type(self):
        return self.type
    
    def get_position(self):
        return self.row, self.col

    def update_voisins_algo(self, grid): #Regarde si voisin est mur ou non
        self.voisins = []
        if self.row < self.total_rows - 1 and not grid[self.row + 1][self.col].get_type() == 'Wall' and not grid[self.row + 1][self.col].get_type() == 'Individu': # DOWN
            self.voisins.append(grid[self.row + 1][self.col])

        if self.row > 0 and not grid[self.row - 1][self.col].get_type() == 'Wall' and not grid[self.row + 1][self.col].get_type() == 'Individu': # UP
            self.voisins.append(grid[self.row - 1][self.col])

        if self.col < self.total_rows - 1 and not grid[self.row][self.col + 1].get_type() == 'Wall' and not grid[self.row + 1][self.col].get_type() == 'Individu': # RIGHT
            self.voisins.append(grid[self.row][self.col + 1])

        if self.col > 0 and not grid[self.row][self.col - 1].get_type() == 'Wall' and not grid[self.row + 1][self.col].get_type() == 'Individu': # LEFT
            self.voisins.append(grid[self.row][self.col - 1])

    def update_voisins_closest(self, grid): #Regarde si voisin est mur ou non
        self.voisins = []
        if self.row < self.total_rows - 1 and not grid[self.row + 1][self.col].get_type() == 'Wall': # DOWN
            self.voisins.append(grid[self.row + 1][self.col])

        if self.row > 0 and not grid[self.row - 1][self.col].get_type() == 'Wall': # UP
            self.voisins.append(grid[self.row - 1][self.col])

        if self.col < self.total_rows - 1 and not grid[self.row][self.col + 1].get_type() == 'Wall': # RIGHT
            self.voisins.append(grid[self.row][self.col + 1])

        if self.col > 0 and not grid[self.row][self.col - 1].get_type() == 'Wall': # LEFT
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
        # Faire roulé l'algo
