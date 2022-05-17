from sys import argv
from abc import ABC, abstractmethod

#Déclare les méthode qui devrait être implementer dans un "Concrete State", contient une backreference à l'objet context qui est associé au State, ce qui peut être utilisé par le State pour changer l'état
class State(ABC):  
    def __init__(self, parameters = None):
        self.__parameters = parameters
        self.__list_transit = []

    @property
    def is_valid(self):
        for transit in self.__list_transit:
            if transit.is_valid() == False :
                return False
        return True

    @property
    def is_terminal(self):
        return True

    @property
    def is_transiting(self):
        transit = None

        for transition in self.__list_transit:
            value = transition.is_transiting

            if value:
                transit = transition
                break

        return transit

    def add_transition(self, transition):
        self.__list_transit.append( transition )

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

class Transition:
    def __init__(self, next_state = None):
        self.__next_state = next_state

    @property
    def is_valid(self):
        return True

    @property
    def next_state(self):
        return self.__next_state

    @next_state.setter
    def next_state(self, state):
        self.__next_state = state

    @property
    def is_transiting(self):
        return True

    @abstractmethod
    def _exec_transiting_action(self):
        self._do_transiting_action()

    @abstractmethod
    def _do_transiting_action(self):
        pass

class FiniteStateMachine:
    def __init__(self, layout):
        self.__continue = True
        self.__layout = layout
        self.__curent_state = None


    @property
    def is_valid(self):
        if self.__layout.is_valid():
            return True
        else:
            return False

    @property
    def current_state(self):
        return self.__curent_state

    def reset(self):
        if self.__curent_state == None:
            self.__curent_state = self.__layout.initial_state

    def transit_to(self, state):
        self.__curent_state = state

    def _transit_by(self, transition):
        self.__curent_state._exec_exiting_action()
        transition._exec_transiting_action()

        state = transition.next_state
        state._exec_entering_action()
        self.transit_to( state )

    def track(self):
        transit = self.__curent_state.is_transiting

        if transit is None:
            self.__curent_state._exec_in_state_action()
        else:
            self._transit_by(transit)

    def run(self, reset: bool = True, time_budget: float = None ):
        while self.__continue:
            self.track()

    @abstractmethod
    def stop(self):
        pass

    class Layout:
        def __init__(self ):
            self.__list_state = []
            self.__initial_state = None

        @property
        def is_valid(self):
            if self.initial_state != None:
                for state in self.__list_state:
                    if state.is_valid() == False:
                        return False
                return True

        @property
        def initial_state(self):
            return self.__initial_state

        @initial_state.setter
        def initial_state(self, initial_state):
            self.__initial_state = initial_state


        def add_state(self, state):
            self.__list_state.append(state)

        def add_states(self, list_state):
            for state in list_state:
                self.__list_state.append(state)