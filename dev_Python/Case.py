from queue import PriorityQueue
from turtle import end_fill
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
        self.end = None

    def set_end(self, end):
        self.end = end
        
    def get_end(self):
        return self.end

    def reset(self):
        self.type = "Salle"

    def get_type(self):
        return self.type
    
    def get_position(self):
        return self.row, self.col

    def add_came_from(self, chemin, last):
        for case in chemin:
            if not case in self.came_from:
                self.came_from.append(case)
        self.came_from.append(last)

    def get_came_from(self):
        return self.came_from

    def update_voisins_algo(self, grid): #Regarde si voisin est mur ou non
        self.voisins = []
        if self.row < self.total_rows - 1 and not grid[self.row + 1][self.col].get_type() == 'Wall' and not grid[self.row + 1][self.col].get_type() == 'Individu' and not grid[self.row + 1][self.col] in self.came_from: # DOWN
            self.voisins.append(grid[self.row + 1][self.col])
        
        if self.row > 0 and not grid[self.row - 1][self.col].get_type() == 'Wall' and not grid[self.row - 1][self.col].get_type() == 'Individu' and not grid[self.row - 1][self.col] in self.came_from: # UP
            self.voisins.append(grid[self.row - 1][self.col])
        
        if self.col < self.total_rows - 1 and not grid[self.row][self.col + 1].get_type() == 'Wall' and not grid[self.row][self.col + 1].get_type() == 'Individu' and not grid[self.row][self.col + 1] in self.came_from: # RIGHT
            self.voisins.append(grid[self.row][self.col + 1])
        
        if self.col > 0 and not grid[self.row][self.col - 1].get_type() == 'Wall' and not grid[self.row][self.col - 1].get_type() == 'Individu' and not grid[self.row][self.col - 1] in self.came_from: # LEFT
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

