from itertools import count
from Case import *
from Astar import *
from queue import PriorityQueue

### Méthodes pour la transformation des données en ce qui est necessaire pour l'aglorithme. ###

BLOCKED_VALUE = 1000

#------- FICHIER WALLS ----------#

def checkWalls(x, y, size, grille):
    isWall = False
    lookVoisinXDown = 1
    lookVoisinYDown = 1
    lookVoisinXUp = 1
    lookVoisinYUp = 1
    conditionArray = []

    if y == 0:
        lookVoisinYDown = 0
    if y == size:
        lookVoisinYUp = 0
    if x == 0:
        lookVoisinXDown = 0
    if x == size:
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

def GetWalls(grille, size, minX, maxX, minY, maxY):
    GRID_FOR_CHECKING = grille
    grille_size = size
    end_array = []
    for x in range(minX, maxX + 1):
        for y in range(minY, maxY + 1):
            checkWall = checkWalls(x, y, grille_size, GRID_FOR_CHECKING)
            if checkWall:
                grille[x][y].type = "Wall"
            if (x == minX or x == maxX or y == minY or y == maxY) and grille[x][y].type == "Porte":
                grille[x][y].type = "End"
                end_array.append(grille[x][y])
    return grille, end_array

#------- FICHIER WALLS ----------#
#------- FICHIER Manipulation Grille ----------#

def Scaling(grille, width, rows):  # Méthode qui permet de faire en sorte que les salles sont 10 de larges et non 1. pour pouvoir y inserer des personnes a linterieur des petites cases
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

def UpdateVoisinGrille(grille, minX, maxX, minY, maxY, type):
    for x in range(minX, maxX + 1):
        for y in range(minY, maxY + 1):
            if type == "Closest":
                grille[x][y].update_voisins_closest(grille)
            elif type == "Algo":
                grille[x][y].update_voisins_algo(grille)
    return grille

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

#------- FICHIER Manipulation Grille ----------#
#------- FICHIER toJSON --------#

def toJson(grid, param):
    first = True
    jsonString = ""
    if param == "grid":
        jsonString += '{ "grille": ['
        for x in range(len(grid)):
            for y in range(len(grid)):
                if first:
                    jsonString += grid[x][y].to_json()
                    first = False
                else:
                    jsonString = jsonString + ", " + grid[x][y].to_json()
        jsonString += ']}'
    elif param == "individu":
        jsonString += '{ "individus": ['
        for individu in grid:
            if first:
                jsonString += individu.to_json_individu()
                first = False
            else:
                jsonString = jsonString + ", " + individu.to_json_individu()
        jsonString += ']}'
    elif param == "frames":
        jsonString += '{ "Frame": ['
        for frames in grid:
            for individu in frames:
                if first:
                    jsonString += individu.to_json_frames()
                    first = False
                else:
                    jsonString = jsonString + ", " + individu.to_json_frames()
        jsonString += ']}'
    return jsonString

def caseToJson(frames_temp):
    jsonObjects = []
    for individu in frames_temp:
        if individu.type == "End":
            temp = FramesJson(individu.row, individu.col,
                              individu.iden, True)  # IsOut
        else:
            temp = FramesJson(individu.row, individu.col,
                              individu.iden, False)  # not IsOut
        jsonObjects.append(temp)

    return jsonObjects

#------ FICHIER toJSON -------#