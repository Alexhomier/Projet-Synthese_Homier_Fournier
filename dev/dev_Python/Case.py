##############################################################################################
##  Nom du fichier : Case								                                    ##
##  Auteur: Mathieu Fournier                                                                ##
##  Description: Classes Case, représenter un objet dans la grille                          ##
##  Date: 27 mai 2022                                                                       ##
##############################################################################################

from ClassJson import *
import json

class Case:
    def __init__(self, row, col, width, total_rows, type):
        self.iden = None
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

    def reset(self):
        self.type = "Salle"
        self.voisins = []
        self.came_from = []
        self.end = None
        self.iden = None

    def set_end(self, end):
        self.end = end
            
    def get_end(self):
        return self.end

    def get_type(self):
        return self.type
    
    def get_position(self):
        return self.row, self.col

    def add_came_from(self, last):
        for case in last.get_came_from():
            if not case in self.came_from:
                self.came_from.append(case)
        self.came_from.append(last)

    def get_came_from(self):
        return self.came_from

    def update_voisins_algo(self, grid): 
        self.voisins = []
        if self.row < self.total_rows - 1 and not grid[self.row + 1][self.col].get_type() == 'Wall' and not grid[self.row + 1][self.col].get_type() == 'Individu': # DOWN
            if not grid[self.row + 1][self.col] in self.came_from:
                self.voisins.append(grid[self.row + 1][self.col])
        
        if self.row > 0 and not grid[self.row - 1][self.col].get_type() == 'Wall' and not grid[self.row - 1][self.col].get_type() == 'Individu': # UP
            if not grid[self.row - 1][self.col] in self.came_from:
                self.voisins.append(grid[self.row - 1][self.col])
        
        if self.col < self.total_rows - 1 and not grid[self.row][self.col + 1].get_type() == 'Wall' and not grid[self.row][self.col + 1].get_type() == 'Individu': # RIGHT
            if not grid[self.row][self.col + 1] in self.came_from:
                self.voisins.append(grid[self.row][self.col + 1])
        
        if self.col > 0 and not grid[self.row][self.col - 1].get_type() == 'Wall' and not grid[self.row][self.col - 1].get_type() == 'Individu': # LEFT
            if not grid[self.row][self.col - 1] in self.came_from:
                self.voisins.append(grid[self.row][self.col - 1])

    def update_voisins_closest(self, grid): 
        self.voisins = []
        if self.row < self.total_rows - 1 and not grid[self.row + 1][self.col].get_type() == 'Wall': # DOWN
            self.voisins.append(grid[self.row + 1][self.col])

        if self.row > 0 and not grid[self.row - 1][self.col].get_type() == 'Wall': # UP
            self.voisins.append(grid[self.row - 1][self.col])

        if self.col < self.total_rows - 1 and not grid[self.row][self.col + 1].get_type() == 'Wall': # RIGHT
            self.voisins.append(grid[self.row][self.col + 1])

        if self.col > 0 and not grid[self.row][self.col - 1].get_type() == 'Wall': # LEFT
            self.voisins.append(grid[self.row][self.col - 1])

    def to_json(self):
        temp = CaseJson(self.row, self.col, self.type)
        return json.dumps(temp, default=lambda o: o.__dict__, sort_keys=True, indent=4)

    def to_json_individu(self):
        temp = IndividuJson(self.row, self.col, self.iden)
        return json.dumps(temp, default=lambda o: o.__dict__, sort_keys=True, indent=4)
    