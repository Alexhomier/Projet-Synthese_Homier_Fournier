import pygame
from queue import PriorityQueue
from State import *
from Transform import Scaling, GetWalls, PlaceIndividus, Traduction, GetWallsT, PlaceIndividusT, UpdateVoisinsIndividu, UpdateVoisinGrille
from Algo import *

from TEST_AstarAlgo import main

WIDTH = 1000  # Taille de la fenêtre

class StateWaiting(State):
    def __init__(self):
        super().__init__()

    def _exec_entering_action(self):
        self._do_entering_action()

    def _exec_in_state_action(self):
        self._do_in_state_action()

    def _exec_exiting_action(self):
        self._do_exiting_action()

    def _do_entering_action(self):
        pass

    def _do_in_state_action(self):
        pass

    def _do_exiting_action(self):
        pass

    def _add_transition(self, transit):
        self.__list_transit.append(transit)

class StateAlgo(State):
    def __init__(self, grille):
        super().__init__()
        self.__grille_size = len(grille["grille"])
        self.__nb_ind_par_salle = grille["IndParSalle"]
        self.__minX = grille["minX"]
        self.__maxX = grille["maxX"]
        self.__minY = grille["minY"]
        self.__maxY = grille["maxY"]
        self.__algo_done = False
        self.__closest_end = PriorityQueue()
        self.__final_array = []

        self.__grille = Traduction(grille["grille"], 1000, self.__grille_size)
        #resultScale = Scaling(self.__grille, 1000, self.__grille_size)
        #self.__grille = resultScale[0]
        #self.__porte_array = resultScale[1]
        resultWalls = GetWallsT(self.__grille, self.__grille_size, self.__minX, self.__maxX, self.__minY, self.__maxY)
        self.__grille = resultWalls[0]
        self.__sortie = resultWalls[1]

        self.__individu_array = []
        resultIndividu = PlaceIndividusT(self.__grille, self.__nb_ind_par_salle, self.__minX, self.__maxX, self.__minY, self.__maxY)
        self.__grille = resultIndividu[0]
        for individu in resultIndividu[1]:
            self.__individu_array.append(individu[0])
        self.__nb_in = len(self.__individu_array)
        self.__nb_out = 0

    def _exec_entering_action(self):
        self._do_entering_action()

    def _exec_in_state_action(self):
        self._do_in_state_action()

    def _exec_exiting_action(self):
        self._do_exiting_action()

    def _do_entering_action(self):
        print("Entering Algo")

#
# Currently : Astar.algorithm() retourne false, ce qui fait en sorte que je perds des individus qui ne sons pas rajouter dans le self.__closest_end *1
# Problème d'oscillation, certain vont retourner sur une case précédente et sortent malgré tout
# Les individus se retrouvent sans voisins, donc bloqué sans pouvoir (Trouver manière de debug) *2
#


    def _do_in_state_action(self):
        if not self.__algo_done:
            while self.__nb_out < self.__nb_in: 
                self.__individu_array = UpdateVoisinsIndividu(self.__individu_array, self.__grille, "Closest")
                self.__grille = UpdateVoisinGrille(self.__grille, self.__minX, self.__maxX, self.__minY, self.__maxY, "Closest")
                
                count = 0

                for individu in self.__individu_array:
                    chemin = Astar.algorithm(None, self.__grille, individu, self.__sortie) #*1
                    if chemin :
                        self.__closest_end.put((len(chemin), count, individu)) #Rammene individus pour ensuite fait l'Algo un par un 
                        #self.__closest_end.put((len(chemin), count, chemin)) #Rammene les chemin pour construire les frames prématurément
                        count += 1

                self.__grille = UpdateVoisinGrille(self.__grille, self.__minX, self.__maxX, self.__minY, self.__maxY, "Algo")
                self.__individu_array = [] 

                while not self.__closest_end.empty():
                    current_individu = self.__closest_end.get()[2]
                    current_individu.update_voisins_algo(self.__grille)
                    #if len(voisins) == 0 skip le truc en dessous pour ensuite print "Blocked" pour eviter de recevoir false dans l'algo. *2
                    result = Astar.single_algo(None, self.__grille, current_individu, self.__sortie)
                    if result:
                        is_done = result[0]
                        next_case = result[1]
                        if is_done:
                            next_case.type = "End"
                            came_from_last = current_individu.get_came_from()
                            next_case.add_came_from(came_from_last, current_individu)
                            self.__final_array.append(next_case)
                            self.__nb_out += 1
                            print(self.__nb_out)
                        elif current_individu != next_case:
                            next_case.type = "Individu"
                            current_individu.reset()
                            pos_last = current_individu.get_position()
                            came_from_last = current_individu.get_came_from()
                            next_case.add_came_from(came_from_last, current_individu)
                            self.__grille[pos_last[0]][pos_last[1]] = current_individu
                            pos_next = next_case.get_position()
                            self.__grille[pos_next[0]][pos_next[1]] = next_case
                            self.__individu_array.append(next_case)
                        else:
                            print("Ancienne case == Nouvelle case")
                            self.__individu_array.append(current_individu)
                    else:
                        print("Blocked", current_individu.get_position())
                        self.__individu_array.append(current_individu)
                        
                    

            self.__algo_done = True
            #main(pygame.display.set_mode((WIDTH, WIDTH)), WIDTH, self.__grille)

    def _do_exiting_action(self):
        print("Exiting Algo")
        # Probablement le return
        # super()._do_exiting_action()

    def _add_transition(self, transit):
        self.__list_transit.append(transit)

    def _algo_done(self):
        return self.__algo_done

class StateDone(State):
    def __init__(self):
        super().__init__()

    def _on_enter(self):
        pass

    def _in_state(self):
        pass

    def _on_finish(self):
        pass

    def _exec_entering_action(self):
        self._do_entering_action()

    def _exec_in_state_action(self):
        self._do_in_state_action()

    def _exec_exiting_action(self):
        self._do_exiting_action()

    def _do_entering_action(self):
        pass

    def _do_in_state_action(self):
        pass 

    def _do_exiting_action(self):
        pass

    def _add_transition(self, transit):
        self.__list_transit.append(transit)
