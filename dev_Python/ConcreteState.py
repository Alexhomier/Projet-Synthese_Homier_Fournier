from queue import PriorityQueue
from State import *
#from Algo import *
from Transform import Scaling, GetWalls, PlaceIndividus, Traduction, GetWallsT, PlaceIndividusT
import pygame
from AstarAlgoTest import main
from AstarAlgo2 import Astar

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
        self.__grille = grille["grille"]
        self.__grille_size = len(self.__grille)
        self.__nb_ind_par_salle = grille["IndParSalle"]
        self.__minX = grille["minX"]
        self.__maxX = grille["maxX"]
        self.__minY = grille["minY"]
        self.__maxY = grille["maxY"]
        self.__algo_done = False
        self.__algo_started = False
        self.__porte_array = []
        self.__individu_array = []
        self.__closest_end = PriorityQueue()
        self.__sortie = None

    def _exec_entering_action(self):
        self._do_entering_action()

    def _exec_in_state_action(self):
        self._do_in_state_action()

    def _exec_exiting_action(self):
        self._do_exiting_action()

    def _do_entering_action(self):
        print("Entering Algo")

    def _do_in_state_action(self):
        if not self.__algo_done:
            if not self.__algo_started:
                self.__algo_started = True

                #resultScale = Scaling(self.__grille, 1000, self.__grille_size)
                #self.__grille = resultScale[0]
                #self.__porte_array = resultScale[1]
                #self.__grille = GetWalls(self.__grille, self.__grille_size, self.__minX, self.__maxX, self.__minY, self.__maxY)
                #self.__closest_end = Algo.closestToEnd(self.__grille, self.__individu_array, self.__sortie)

                self.__grille = Traduction(self.__grille, 1000, self.__grille_size)

                resultWalls = self.__grille = GetWallsT(self.__grille, self.__grille_size, self.__minX, self.__maxX, self.__minY, self.__maxY)
                self.__grille = resultWalls[0]
                self.__sortie = resultWalls[1]

                resultIndividu = PlaceIndividusT(self.__grille, self.__nb_ind_par_salle, self.__minX, self.__maxX, self.__minY, self.__maxY)
                self.__grille = resultIndividu[0]
                self.__individu_array = resultIndividu[1]

                count = 0
                for individu in self.__individu_array:
                    came_from = Astar.algorithm(None, self.__grille, individu[0], self.__sortie)
                    if came_from :
                        self.__closest_end.put((len(came_from), count, individu[0]))
                        count += 1
                
                #closest_end_hash = {start} #ajoute individu plus proche pour start
                
                #while not self.__closest_end.empty():
                    #current_individu = self.__closest_end.get()[2]
                    #closest_end_hash.remove(current_individu)
                    #Algo qui va retourner le chemin de l'individu

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
