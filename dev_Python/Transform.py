#from Algo import *
from AstarAlgoTest import *

def Scaling(grille, width, rows): #Méthode qui permet de faire en sorte que les salles sont 10 de larges et non 1. pour pouvoir y inserer des personnes a linterieur des petites cases
    grid = []
    porteArray = []
    gap = width // rows * 10
    for i in range(rows * 10):
        grid.append([])
        for j in range(rows * 10):
            if(grille[i // 10][j // 10]["state"]  == "Couloir"):
                case = Case(i, j, gap, rows, "Couloir")
            elif(grille[i // 10][j // 10]["state"]  == "Salle"):
                case = Case(i, j, gap, rows, "Salle")
            elif(grille[i // 10][j // 10]["state"] == "Porte"):
                if i % 10 == 0 and j % 10 == 10 :
                    case = Case(i, j, gap, rows, "Porte")
                    porteArray.append([case])
                else :
                    case = Case(i, j, gap, rows, "Couloir")
            else :
                case = Case(i, j, gap, rows, None)
            grid[i].append(case)
    return grid, porteArray

def checkWalls(x, y, size, grille):
    isWall = False
    lookVoisinXDown = 1
    lookVoisinYDown = 1
    lookVoisinXUp = 1
    lookVoisinYUp = 1
    conditionArray = []

    if y == 0 :
        lookVoisinYDown = 0
    if y == size :
        lookVoisinYUp = 0
    if x == 0 :
        lookVoisinXDown = 0
    if x == size :
        lookVoisinXUp = 0
    
    conditionArray = [
        bool(grille[x][y + lookVoisinYUp].type == None or grille[x][y + lookVoisinYUp].type == "Couloir"),
        bool(grille[x][y - lookVoisinYDown].type == None or grille[x][y - lookVoisinYDown].type == "Couloir"),
        bool(grille[x + lookVoisinXUp][y].type == None or grille[x + lookVoisinXUp][y].type == "Couloir"),
        bool(grille[x - lookVoisinXDown][y].type == None or grille[x - lookVoisinXDown][y].type == "Couloir")
    ]

    for condtion in conditionArray:
        if grille[x][y].type == "Salle" and condtion :
            isWall = True

    # Trouver une condition qui permettera de trouver si un porte est collé sur un extrémité. Sinon il n'y a pas de "end"

    return isWall   

def GetWalls(grille, size, minX, maxX, minY, maxY): #Méthode qui identifie les murs (trouve entre une salle et un couloir pour mettre un mur)
    grille_size = size * 10
    GRID_FOR_CHECKING = grille  
    for x in range(minX * 10, maxX * 10 + 1):
        for y in range(minY * 10, maxY * 10 + 1):
            checkWall = checkWalls(x, y, grille_size, GRID_FOR_CHECKING)
            if checkWall:
                grille[x][y].type = "Wall"
    return grille

def PlaceIndividus(grille, nb_individus_max):  #Méthode qui va, aléatoirement, placer des individus dans une salle dépendement de son nombre max
    return grille


################ MÉTHODES SANS SCALING POUR UTILISATION EFFICACE DE PYGAME ######################

def GetWallsT(grille, size, minX, maxX, minY, maxY):
    grille_size = size
    GRID_FOR_CHECKING = grille  
    for x in range(minX, maxX + 1):
        for y in range(minY, maxY + 1):
            checkWall = checkWalls(x, y, grille_size, GRID_FOR_CHECKING)
            if checkWall:
                grille[x][y].type = "Wall"
            if (x == minX or x == maxX or y == minY or y == maxY) and grille[x][y].type == "Porte":
                grille[x][y].type = "End"
                end = grille[x][y]
    return grille, end

def Traduction(grille, width, rows): 
    grid = []
    gap = width // rows
    for i in range(rows):
        grid.append([])
        for j in range(rows):
            if(grille[i][j]["state"]  == "Couloir"):
                case = Case(i, j, gap, rows, "Couloir")
            elif(grille[i][j]["state"]  == "Salle"):
                case = Case(i, j, gap, rows, "Salle")
            elif(grille[i][j]["state"] == "Porte"):
                case = Case(i, j, gap, rows, "Porte")
            else :
                case = Case(i, j, gap, rows, None)
            grid[i].append(case)
    return grid

def PlaceIndividusT(grille, nb_individus_max, minX, maxX, minY, maxY):  #Méthode qui va, aléatoirement, placer des individus dans une salle dépendement de son nombre max
    i = 0
    individu_array = []
    for x in range(minX, maxX + 1):
        for y in range(minY, maxY + 1):
            if grille[x][y].type == "Salle" and i % 5 == 0:
                grille[x][y].type = "Individu"
                individu_array.append([grille[x][y]])
            i += 1
    return grille, individu_array