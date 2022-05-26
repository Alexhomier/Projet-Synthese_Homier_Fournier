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
        self._iden = None
        self._type = type
        self._row = row
        self._col = col
        self._width = width
        self._total_rows = total_rows
        self._x = row * width
        self._y = col * width
        self._voisins = []
        self._came_from = []
        self._end = None

    def reset(self):
        self._type = "Salle"
        self._voisins = []
        self._came_from = []
        self._end = None
        self._iden = None

    def set_end(self, end):
        self._end = end
            
    def get_end(self):
        return self._end

    def get_type(self):
        return self._type
    
    def get_position(self):
        return self._row, self._col

    def add_came_from(self, last):
        for case in last.get_came_from():
            if not case in self._came_from:
                self._came_from.append(case)
        self._came_from.append(last)

    def get_came_from(self):
        return self._came_from

    def update_voisins_algo(self, grid): #Regarde si voisin est mur ou non
        self._voisins = []
        if self._row < self._total_rows - 1 and not grid[self._row + 1][self._col].get_type() == 'Wall' and not grid[self._row + 1][self._col].get_type() == 'Individu': # DOWN
            if not grid[self._row + 1][self._col] in self._came_from:
                self._voisins.append(grid[self._row + 1][self._col])
        
        if self._row > 0 and not grid[self._row - 1][self._col].get_type() == 'Wall' and not grid[self._row - 1][self._col].get_type() == 'Individu': # UP
            if not grid[self._row - 1][self._col] in self._came_from:
                self._voisins.append(grid[self._row - 1][self._col])
        
        if self._col < self._total_rows - 1 and not grid[self._row][self._col + 1].get_type() == 'Wall' and not grid[self._row][self._col + 1].get_type() == 'Individu': # RIGHT
            if not grid[self._row][self._col + 1] in self._came_from:
                self._voisins.append(grid[self._row][self._col + 1])
        
        if self._col > 0 and not grid[self._row][self._col - 1].get_type() == 'Wall' and not grid[self._row][self._col - 1].get_type() == 'Individu': # LEFT
            if not grid[self._row][self._col - 1] in self._came_from:
                self._voisins.append(grid[self._row][self._col - 1])

    def update_voisins_closest(self, grid): #Regarde si voisin est mur ou non
        self._voisins = []
        if self._row < self._total_rows - 1 and not grid[self._row + 1][self._col].get_type() == 'Wall': # DOWN
            self._voisins.append(grid[self._row + 1][self._col])

        if self._row > 0 and not grid[self._row - 1][self._col].get_type() == 'Wall': # UP
            self._voisins.append(grid[self._row - 1][self._col])

        if self._col < self._total_rows - 1 and not grid[self._row][self._col + 1].get_type() == 'Wall': # RIGHT
            self._voisins.append(grid[self._row][self._col + 1])

        if self._col > 0 and not grid[self._row][self._col - 1].get_type() == 'Wall': # LEFT
            self._voisins.append(grid[self._row][self._col - 1])

    def to_json(self):
        temp = CaseJson(self._row, self._col, self._type)
        return json.dumps(temp, default=lambda o: o.__dict__, sort_keys=True, indent=4)

    def to_json_individu(self):
        temp = IndividuJson(self._row, self._col, self._iden)
        return json.dumps(temp, default=lambda o: o.__dict__, sort_keys=True, indent=4)
    