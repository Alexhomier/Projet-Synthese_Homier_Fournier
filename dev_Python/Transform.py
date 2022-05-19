from Case import *
from Astar import *
from queue import PriorityQueue

BLOCKED_VALUE = 1000

## Méthodes de scaling/Traduction de JSON a python object ##

def Scaling(grille, width, rows): #Méthode probablement non utilisé
    grid = []
    porteArray = []
    gap = width // rows * 10
    for i in range(rows * 10):
        grid.append([])
        for j in range(rows * 10):
            if(grille[i // 10][j // 10]["state"] == "Couloir"):
                case = Case(i, j, gap, rows, "Couloir")
            elif(grille[i // 10][j // 10]["state"] == "Salle"):
                case = Case(i, j, gap, rows, "Salle")
            elif(grille[i // 10][j // 10]["state"] == "Porte"):
                case = Case(i, j, gap, rows, "Porte")
            else:
                case = Case(i, j, gap, rows, None)
            grid[i].append(case)
    return grid, porteArray

def Traduction(grille, width, rows):
    grid = []
    gap = width // rows
    for i in range(rows):
        grid.append([])
        for j in range(rows):
            if(grille[i][j]["state"] == "Couloir"):
                case = Case(i, j, gap, rows, "Couloir")
            elif(grille[i][j]["state"] == "Salle"):
                case = Case(i, j, gap, rows, "Salle")
            elif(grille[i][j]["state"] == "Porte"):
                case = Case(i, j, gap, rows, "Porte")
            else:
                case = Case(i, j, gap, rows, None)
            grid[i].append(case)
    return grid

## Méthode retournant une PriorityQueue ayant, placé en ordre croissant de longueur de chemin, les individus ##

def ClosestEnd(individu_array, grid):
    count = 0
    closest_end = PriorityQueue()
    for individu in individu_array:
        individu.update_voisins_closest(grid)
        chemin = Astar.algorithm(None, grid, individu, individu.get_end())
        if chemin:
            closest_end.put((len(chemin), count, individu))
            count += 1
        else:
            print("Failed Algo Shortest")
            closest_end.put((BLOCKED_VALUE + count, count, individu))
            count += 1
    return closest_end

## Méthode retournant la meilleur sortie pour un individu dépendement des différentes sorties différentes, s'il y a lieu. ##

def ChooseEnd(grid, end_array, individu_array):
    for individu in individu_array:
        if individu.get_end() == None:
            count = 0
            closest_end = PriorityQueue()
            individu.update_voisins_closest(grid)
            for sortie in end_array:
                chemin = Astar.algorithm(None, grid, individu, sortie)
                if chemin:
                    closest_end.put((len(chemin), count, sortie))
                    count += 1
                else:
                    closest_end.put((BLOCKED_VALUE + count, count, sortie))
                    count += 1
                    print("Failed Algo Choix Sortie")
            individu.set_end(closest_end.get()[2])
    return individu_array

#-------- A CHANGER --------#

# Méthode qui va, aléatoirement, placer des individus dans une salle dépendement de son nombre max
def PlaceIndividus(grille, nb_individus_max, minX, maxX, minY, maxY):
    i = 0
    counter = 0
    individu_array = []
    for x in range(minX, maxX + 1):
        for y in range(minY, maxY + 1):
            if grille[x][y].type == "Salle" and i % 5 == 0:
                grille[x][y].type = "Individu"
                grille[x][y].iden = counter
                individu_array.append([grille[x][y]])
                counter += 1
            i += 1
    return grille, individu_array

## Méthode permettant d'update les voisins de chaque case dans la grille, pour calculer le chemin le plus court, ou l'agorithme ##

def UpdateVoisinGrille(grille, minX, maxX, minY, maxY, type):
    for x in range(minX, maxX + 1):
        for y in range(minY, maxY + 1):
            if type == "Closest":
                grille[x][y].update_voisins_closest(grille)
            elif type == "Algo":
                grille[x][y].update_voisins_algo(grille)
    return grille