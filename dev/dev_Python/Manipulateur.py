###################################################################################
##  Nom du fichier : Manipulateur           									 ##
##  Auteur: Mathieu Fournier                                                     ##
##  Description: Manipulateur de données, gérant la récepetions et l'analyse     ##
##  Date: 27 mai 2022                                                            ##
###################################################################################

from queue import PriorityQueue
from Transform import *
from toJson import *
from Walls import *
from Astar import *
from ClassJson import *
from datetime import datetime, timedelta

#
#  Les méthodes des fichiers ci-dessus tel que: Transform, toJson, Walls, ClassJson et Astar, ont tous leurs description à l'intérieur de ceux-ci
#

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
        self.jsonIndividu = toJsonIndividu(self.__individu_array)               # Stockage, en JSON, de l'array initial des individus pour l'envoie au Web.

        self.__nb_in = len(self.__individu_array)                               
        self.__nb_out = 0                                                       
        self.__blocked = 0                                                      # Initialisation du nombre de personne bloqué.(Patch, puisque certains invidus se retrouve bloqué dans un coin, sans voisins...)
        self.__now = datetime.now()                                             # Gestion du temps pour une limite de 2 minutes, sinon la requête web est annulé
        self.__start = datetime.now()                                           

    def _do_individus_frames(self):
        if not self.__end_array == None: 
            while self.__nb_out < self.__nb_in and self.__blocked < self.__nb_in-self.__nb_out and self.__now < self.__start + timedelta(minutes = 2):   
                self.__grille = UpdateVoisinGrille(self.__grille, self.__minX, self.__maxX, self.__minY, self.__maxY, "Closest") 
                self.__individu_array = ChooseEnd(self.__grille, self.__end_array, self.__individu_array)   
                self.__closest_end = ClosestEnd(self.__individu_array, self.__grille)                       
                self.__individu_array = [] 
                self.__blocked_array = []
                self.__blocked = 0

                frames_temp = []
                while not self.__closest_end.empty():
                    current_individu = self.__closest_end.get()[2]  #Prends l'individu avec le chemin le plus court (plus près de la sortie)
                    self.__grille = UpdateVoisinGrille(self.__grille, self.__minX, self.__maxX, self.__minY, self.__maxY, "Algo") 
                    current_individu.update_voisins_algo(self.__grille)

                    if not len(current_individu.voisins) == 0: 
                        result = Astar.single_algo(None, self.__grille, current_individu, current_individu.get_end())
                        if result:
                            is_done = result[0]
                            next_case = result[1]
                            next_case.iden = current_individu.iden      
                            next_case.add_came_from(current_individu)
                            pos_last = current_individu.get_position()
                            current_individu.reset()
                            self.__grille[pos_last[0]][pos_last[1]] = current_individu 
                            if is_done:  
                                next_case.type = "End"
                                self.__final_array.append(next_case)
                                self.__nb_out += 1
                            else :
                                next_case.type = "Individu"
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
                self.__now = datetime.now()
            return True
        else:
            return False

    def _get_json(self):
        jsonFrames = toJsonFrames(self.__frames)
        jsonBlocked = toJsonBlocked(self.__blocked_array)
        return jsonFrames, jsonBlocked

    def _get_individus_json(self):
        return self.jsonIndividu
