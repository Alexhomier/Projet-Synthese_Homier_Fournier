##############################################################################################
##  Auteur: Mathieu Fournier                                                                ##
##  Description: Méthodes retournant les murs pour la grille                                ##
##  Date: 27 mai 2022                                                                       ##
##############################################################################################

from tabnanny import check
from Case import *
import numpy as np

## Méthode qui regarde si une case est entre une salle et un couloir, ce qui est donc un mur, et retourne s'il l'est ou non ##

def checkWalls(x, y, size, grille):
    isWall = False
    lookVoisinXDown = 1
    lookVoisinYDown = 1
    lookVoisinXUp = 1
    lookVoisinYUp = 1
    conditionArray = []

    if y == 0:
        lookVoisinYDown = 0
    if y == size-1:
        lookVoisinYUp = 0
    if x == 0:
        lookVoisinXDown = 0
    if x == size-1:
        lookVoisinXUp = 0

    conditionArray = [
        bool(grille[x][y + lookVoisinYUp].type == None or grille[x]
             [y + lookVoisinYUp].type == "Couloir"),
        bool(grille[x][y - lookVoisinYDown].type ==
             None or grille[x][y - lookVoisinYDown].type == "Couloir"),
        bool(grille[x + lookVoisinXUp][y].type ==
             None or grille[x + lookVoisinXUp][y].type == "Couloir"),
        bool(grille[x - lookVoisinXDown][y].type ==
             None or grille[x - lookVoisinXDown][y].type == "Couloir")
    ]

    for condtion in conditionArray:
        if grille[x][y].type == "Salle" and condtion:
            isWall = True

    return isWall

## Fait checkWalls pour tout la grille et retourne la grille modifié ##

def GetWalls(grille, size, minX, maxX, minY, maxY):
    intial_grille = grille
    grille_size = size
    end_array = []
    for x in range(minX, maxX + 1):
        for y in range(minY, maxY + 1):
            checkWall = checkWalls(x, y, grille_size, intial_grille)
            if checkWall:
                grille[x][y].type = "Wall"
            if (x == minX or x == maxX or y == minY or y == maxY) and grille[x][y].type == "Porte":
                grille[x][y].type = "End"
                end_array.append(grille[x][y])
    return grille, end_array