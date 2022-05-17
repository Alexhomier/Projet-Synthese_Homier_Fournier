from queue import PriorityQueue

from flask import jsonify
from State import *
from Transform import Scaling, Traduction, GetWalls, PlaceIndividus, UpdateVoisinGrille, ClosestEnd, ChooseEnd, toJson
from Astar import *

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
        super()._do_exiting_action()

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
        self.__frames = []

        self.__grille = Traduction(grille["grille"], 1000, self.__grille_size)
        #resultScale = Scaling(grille["grille"], 1000, self.__grille_size)
        #self.__grille = resultScale[0]
        #self.__porte_array = resultScale[1]
        resultWalls = GetWalls(self.__grille, self.__grille_size, self.__minX, self.__maxX, self.__minY, self.__maxY) #Gestion d'erreur s'il n'y a pas de porte extérieur
        self.__grille = resultWalls[0]
        self.__end_array = resultWalls[1]

        self.__individu_array = []
        resultIndividu = PlaceIndividus(self.__grille, self.__nb_ind_par_salle, self.__minX, self.__maxX, self.__minY, self.__maxY)
        self.__grille = resultIndividu[0]
        for individu in resultIndividu[1]:
            self.__individu_array.append(individu[0])
        self.__initial_individus = self.__individu_array
        self.jsonIndividu = toJson(self.__initial_individus, "individu")
    
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


# Les individus se retrouvent bloqué dans un coin, j'imagine que c'est parce que le voisins est forcé s'il y en a uniquement un.
#
    def _do_in_state_action(self):
        if not self.__algo_done:
            while self.__nb_out < self.__nb_in: 
                self.__grille = UpdateVoisinGrille(self.__grille, self.__minX, self.__maxX, self.__minY, self.__maxY, "Closest")
                self.__individu_array = ChooseEnd(self.__grille, self.__end_array, self.__individu_array)
                self.__closest_end = ClosestEnd(self.__individu_array, self.__grille)
                self.__grille = UpdateVoisinGrille(self.__grille, self.__minX, self.__maxX, self.__minY, self.__maxY, "Algo")
                self.__individu_array = [] 

                ### Créer méthode qui retournera les frames avec le code ci-dessous. ###

                framesTemp = []
                while not self.__closest_end.empty():
                    current_individu = self.__closest_end.get()[2]
                    current_individu.update_voisins_algo(self.__grille)
                    if not len(current_individu.voisins) == 0:  #*2
                        result = Astar.single_algo(None, self.__grille, current_individu, current_individu.get_end())
                        if result:
                            is_done = result[0]
                            next_case = result[1]
                            if is_done:
                                next_case.set_id(current_individu.get_id())  #Fuck up les ids
                                current_individu.reset()
                                came_from_last = current_individu.get_came_from()
                                next_case.add_came_from(came_from_last, current_individu)
                                next_case.type = "End"
                                current_individu.set_id(None)   #Fuck up les ids
                                pos_last = current_individu.get_position()
                                self.__grille[pos_last[0]][pos_last[1]] = current_individu   #Fuck up les ids
                                self.__final_array.append(next_case)
                                framesTemp.append(next_case)
                                self.__nb_out += 1
                                print(self.__nb_out)
                            elif current_individu != next_case:
                                next_case.set_id(current_individu.get_id())   #Fuck up les ids
                                current_individu.reset() 
                                came_from_last = current_individu.get_came_from()
                                next_case.add_came_from(came_from_last, current_individu)
                                next_case.type = "Individu"
                                current_individu.set_id(None)   #Fuck up les ids
                                pos_last = current_individu.get_position()
                                self.__grille[pos_last[0]][pos_last[1]] = current_individu   #Fuck up les ids
                                pos_next = next_case.get_position()
                                self.__grille[pos_next[0]][pos_next[1]] = next_case
                                self.__individu_array.append(next_case)
                                framesTemp.append(next_case)
                            else:
                                print("Didn't move")
                                self.__individu_array.append(current_individu)
                                framesTemp.append(current_individu)
                        else:
                            print("Blocked, Algo", current_individu.get_position())
                            self.__individu_array.append(current_individu)
                            framesTemp.append(current_individu)
                    else:
                        print("Blocked, sans voisins", current_individu.get_position())
                        self.__individu_array.append(current_individu)
                        framesTemp.append(current_individu)
                        
                self.__frames.append(framesTemp) #Ajouter une sauvegarde de individu_arry qui sera l'équivalent d'un frame
            jsonGrille = toJson(self.__grille, "grid")
            jsonFrames = toJson(self.__frames, "frames")
            print(jsonGrille)
            print(self.jsonIndividu)
            print(jsonFrames)
            self.__algo_done = True

    def _do_exiting_action(self):
        print("Exiting Algo")
        # jsonGrille = toJson(self.__grille, "grid")
        # jsonIndividu = toJson(self.__initial_individus, "individu")
        # jsonFrames = toJson(self.__frames, "frames")
        super()._do_exiting_action()

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
        super()._do_exiting_action()

    def _add_transition(self, transit):
        self.__list_transit.append(transit)
