from Case import *
from Astar import *
from queue import PriorityQueue

### Méthodes pour la transformation des données en ce qui est necessaire pour l'aglorithme. ###

BLOCKED_VALUE = 1000

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
                case = Case(i, j, gap, rows, "Porte")
                # if i % 10 == 0 and j % 10 == 10 :
                #     case = Case(i, j, gap, rows, "Porte")
                #     porteArray.append([case])
                # else :
                #     case = Case(i, j, gap, rows, "Couloir")
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

def PlaceIndividus(grille, nb_individus_max, minX, maxX, minY, maxY):  #Méthode qui va, aléatoirement, placer des individus dans une salle dépendement de son nombre max
    i = 0
    individu_array = []
    for x in range(minX, maxX + 1):
        for y in range(minY, maxY + 1):
            if grille[x][y].type == "Salle" and i % 5 == 0:
                grille[x][y].type = "Individu"
                individu_array.append([grille[x][y]])
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

#Astar.algorithm() retourne false, ce qui fait en sorte que je perds des individus qui ne sons pas rajouter dans le self.__closest_end *1
def ClosestEnd(individu_array, grid):
    count = 0
    closest_end = PriorityQueue()
    for individu in individu_array:
        individu.update_voisins_closest(grid)
        chemin = Astar.algorithm(None, grid, individu, individu.get_end()) #*1
        if chemin :
            closest_end.put((len(chemin), count, individu)) #Rammene individus pour ensuite fait l'Algo un par un 
            count += 1
        else: 
            print("Failed Algo Shortest")
            closest_end.put((BLOCKED_VALUE + count, count, individu))   # TROUVER QUOI METTRE A LA PLACE DU CHEMIN POUR QUIL SOIT APRES OU AVANT WTV
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
                    closest_end.put((BLOCKED_VALUE + count, count, sortie))   # TROUVER QUOI METTRE A LA PLACE DU CHEMIN POUR QUIL SOIT APRES OU AVANT WTV
                    count += 1
                    print("Failed Algo Choix Sortie")
            individu.set_end(closest_end.get()[2])
    return individu_array