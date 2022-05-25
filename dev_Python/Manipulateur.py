from queue import PriorityQueue
from Transform import *
from toJson import *
from Walls import *
from Astar import *
from ClassJson import *

#
#  Vectoriser les arrays (numpy)
#

## DANS ASTAR, PEUT ETRE ESSAYER D'AJOUTER LA CASE ORIGINAL (CELLE QUI EST REGARDER) DANS LE CLOSEST POUR SAVOIR S'IL POURRAIT NE PAS BOUGER ##

## REGARDE LES ENDROITS OU J'UPDATE LES VOISINS, C'EST PEUT ETRE NECESSAIRE DE LE FAIRE POUR LA GRILLE AU COMPLET AUSSI ##

class Manipulateur():
    def __init__(self, grille):
        self.__grille_size = len(grille["grille"])
        self.__nb_indvidivu = grille["IndParSalle"]
        self.__minX = grille["minX"]
        self.__maxX = grille["maxX"]
        self.__minY = grille["minY"]
        self.__maxY = grille["maxY"]
        self.__closest_end = PriorityQueue()  
        self.__final_array = []
        self.__frames = []

        self.__grille = Traduction(grille["grille"], 1000, self.__grille_size)

        resultWalls = GetWalls(self.__grille, self.__grille_size, self.__minX, self.__maxX, self.__minY, self.__maxY)
        self.__grille = resultWalls[0]
        self.__end_array = resultWalls[1]

        self.__individu_array = []
        resultIndividu = PlaceIndividus(self.__grille, self.__nb_indvidivu, self.__minX, self.__maxX, self.__minY, self.__maxY)
        self.__grille = resultIndividu[0]
        for individu in resultIndividu[1]:
            self.__individu_array.append(individu[0])
        self.__initial_individus = self.__individu_array
        self.jsonIndividu = toJsonIndividu(self.__initial_individus)

        self.__nb_in = len(self.__individu_array)
        self.__nb_out = 0
        self.__blocked = 0

    def _do_individus_frames(self):
        if not self.__end_array == None:  #S'il n'y a pas de porte
            while self.__nb_out < self.__nb_in and self.__blocked < self.__nb_in-self.__nb_out:  #Si les individus sont tous bloqués, sa sort.
                self.__grille = UpdateVoisinGrille(self.__grille, self.__minX, self.__maxX, self.__minY, self.__maxY, "Closest")
                self.__individu_array = ChooseEnd(self.__grille, self.__end_array, self.__individu_array)
                self.__closest_end = ClosestEnd(self.__individu_array, self.__grille)
                self.__individu_array = [] 
                self.__blocked_array = []
                self.__blocked = 0

                frames_temp = []
                while not self.__closest_end.empty():
                    current_individu = self.__closest_end.get()[2]
                    self.__grille = UpdateVoisinGrille(self.__grille, self.__minX, self.__maxX, self.__minY, self.__maxY, "Algo") 
                    current_individu.update_voisins_algo(self.__grille)

                    if not len(current_individu.voisins) == 0: 
                        result = Astar.single_algo(None, self.__grille, current_individu, current_individu.get_end())
                        if result:
                            is_done = result[0]
                            next_case = result[1]
                            if is_done:  
                                next_case.iden = current_individu.iden      
                                next_case.add_came_from(current_individu)
                                next_case.type = "End"
                                pos_last = current_individu.get_position()
                                current_individu.reset()
                                self.__grille[pos_last[0]][pos_last[1]] = current_individu 
                                self.__final_array.append(next_case)
                                frames_temp.append(next_case)
                                self.__nb_out += 1
                                print(str(self.__nb_out) + " personne(s) out")
                            else :
                                next_case.iden = current_individu.iden
                                next_case.add_came_from(current_individu)
                                next_case.type = "Individu"
                                pos_last = current_individu.get_position()
                                current_individu.reset()
                                self.__grille[pos_last[0]][pos_last[1]] = current_individu 
                                pos_next = next_case.get_position()
                                self.__grille[pos_next[0]][pos_next[1]] = next_case
                                self.__individu_array.append(next_case)
                                frames_temp.append(next_case)
                        else:
                            self.__individu_array.append(current_individu)
                            frames_temp.append(current_individu)
                    else:
                        self.__individu_array.append(current_individu)
                        frames_temp.append(current_individu)
                        self.__blocked_array.append(current_individu)
                        self.__blocked += 1
                
                frames_json = []
                frames_json = caseToJson(frames_temp)
                self.__frames.append(frames_json)
            return True
        else:
            print("Il n'y a pas de porte de sortie")
            return False

    def _get_json(self):
        jsonGrille = toJsonGrid(self.__grille)
        jsonFrames = toJsonFrames(self.__frames)
        jsonBlocked = toJsonBlocked(self.__blocked_array)
        return jsonGrille, jsonFrames, jsonBlocked

    def _get_individus_json(self):
        jsonIndividu = toJsonIndividu(self.__initial_individus)
        print(jsonIndividu)
        return jsonIndividu
