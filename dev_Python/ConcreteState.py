from State import *
#from Algo import *
from Transform import GetWalls, PlaceIndividus

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
        pass  #Wait

    def _do_exiting_action(self):
        pass
        
    def _add_transition(self, transit):
        self.__list_transit.append(transit)

class StateAlgo(State):
    def __init__(self, grille):
        super().__init__()
        self.__grille = grille["grille"]
        self.__nb_ind_par_salle = grille["IndParSalle"]
        self.__algo_done = False
        self.__algo_started = False

    def _exec_entering_action(self): 
        self._do_entering_action()

    def _exec_in_state_action(self):
        self._do_in_state_action()

    def _exec_exiting_action(self):
        self._do_exiting_action()

    def _do_entering_action(self):
        print("Entering Algo")

        #Action a faire quand je recois l'Action
        #nb_ind_par_salle = grille.IndParSalle
        #grid = grille.grille
        #grid = Transform.GetWalls(grid)  #Methode qui va transformer la grille en une nouvelle grile pour l'utilisation de l'algorithme
        #grid = Transform.PlaceIndividus(grid, nb_ind_par_salle)

    def _do_in_state_action(self):
        #print("In State Algo")
        
        if not self.__algo_done:
            if not self.__algo_started:
                self.__algo_started = True
                i = 0
                run = True
                while run:
                    i += 1
                    print(i)
                    if i > 10000:
                        run = False
                        self.__algo_done = True
                    

        #for i in range(int(grille.individustotal))    
        #   open_set = PriorityQueue()    
        #   open_set.put(Algo.ClosestToEnd(grille.individu[i].start, grille.end))  #Ajoute a un set, checker pour decider comment je les classes (shrotest path)
        #for individu in open_set
        #   Algo.algo(individu)

    def _do_exiting_action(self):
        print("Exiting Algo")

        #Probablement le return
        #super()._do_exiting_action()
        
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
        pass #Retourn les informations au manipulateur pour quils puisse les retourner au dao

    def _do_exiting_action(self):
        pass
        
    def _add_transition(self, transit):
        self.__list_transit.append(transit)