from State import *
from ConcreteState import *

class Transit(Transition):
    def __init__(self, next_state):
        super().__init__(next_state)
        self._condition = False

    @property
    def is_transiting(self) -> bool:
        if self._condition:
            return True
        return False   #Faire condition que fera en sorte qu'il ne change pas automatiquement, uniquement quand il a fini l'algo ou wtv

class TransitFromAlgo(Transition):
    def __init__(self, next_state, reference):
        super().__init__(next_state)
        self._state = reference
        self._algo_done = False

    @property
    def is_transiting(self) -> bool:
        return bool(self._state._algo_done())

class Manipulator(FiniteStateMachine):
    def __init__(self, grille):
        layout = FiniteStateMachine.Layout()

        state_waiting = StateWaiting()
        state_algo = StateAlgo(grille)
        state_done = StateDone()

        transit_to_algo = Transit(state_algo)
        transit_to_done = TransitFromAlgo(state_done, state_algo)
        transit_to_waiting = Transit(state_waiting)

        state_waiting.add_transition(transit_to_algo)
        state_algo.add_transition(transit_to_done)
        state_done.add_transition(transit_to_waiting)

        layout.add_states([state_waiting, state_algo, state_done])
        layout.initial_state = state_algo
        
        super().__init__(layout)