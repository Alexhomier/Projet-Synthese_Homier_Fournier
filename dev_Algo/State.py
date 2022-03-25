from sys import argv
from abc import ABC, abstractmethod

class Context():   #Classe Context (Représente l'interface graphique, initial)
    _state = None
    def __init__(self, state: State) -> None:
        self.transition_to(state)

    def transition_to(self, state: State):   #Change l'état de l'objet state, pour permettre de faire autre chose puisque l'état à changer.
        print(f"Context: Transition to {type(state).__name__}")
        self._state = state
        self._state.context = self

    def request1(self):
        self._state.handle1()

    def request2(self):
        self._state.handle2()


class State(ABC):  #Déclare les méthode qui devrait être implementer dans un "Concrete State", contient une backreference à l'objet context qui est associé au State, ce qui peut être utilisé par le State pour changer l'état

    @property
    def context(self) -> Context:
        return self._context

    @context.setter
    def context(self, context: Context) -> None:
        self._context = context

    @abstractmethod
    def handle1(self) -> None:
        pass

    @abstractmethod
    def handle2(self) -> None:
        pass

#Handle 1 : Code respectif de chacun des ConcreteState
#Handle 2 : Code permettant un changement d'état lorsque le code du Handle 1 est exécuté correctement (sans erreur)

class StateWaiting(State):
    def handle1(self) -> None:
        #Code resectif à StateWaiting
        pass

    def handle2(self) -> None:
        print("StateWaiting handles request2.")
        self.context.transition_to(StateAlgo())

class StateAlgo(State):
    def handle1(self) -> None:
        #Code resectif à StateAlgo
        pass

    def handle2(self) -> None:
        print("StateAlgo handles request2.")
        self.context.transition_to(StateDone())

class StateDone(State):
    def handle1(self) -> None:
        #Code resectif à StateDone
        pass

    def handle2(self) -> None:
        print("StateDone handles request2.")
        self.context.transition_to(StateWaiting())


if __name__ == "__main__":
    pass
