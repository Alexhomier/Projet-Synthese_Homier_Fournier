import sys
sys.path.insert(1, r'C:\Users\Poste\Documents\GitHub\Projet-Synthese_Homier_Fournier\dev_Python\State.py')

from State import *
import msvcrt

class LightState(State):
    def __init__(self, name):
        super().__init__()
        self.__name = name

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
        super()._do_entering_action()
        print(f'turn on {self.__name}')

    def _do_in_state_action(self):
        pass

    def _do_exiting_action(self):
        super()._do_exiting_action()
        print(f'turn off {self.__name}')

    def _add_transition(self, transit):
        self.__list_transit.append(transit)

class KeyTransit(Transition):
    def __init__(self, keys, next_state):
        super().__init__(next_state)
        self.__keys = set([c for c in keys])

    @property
    def is_transiting(self) -> bool:
        if msvcrt.kbhit():
            c = msvcrt.getch().decode('UTF-8')
            return c in self.__keys
        return False


class ManualTrafficLight(FiniteStateMachine):
    def __init__(self):
        layout = FiniteStateMachine.Layout()

        s_red = LightState('red')
        s_green = LightState('green')
        s_yellow = LightState('yellow')

        t_r_g = KeyTransit(' ', s_green)
        t_g_y = KeyTransit(' ', s_yellow)
        t_y_r = KeyTransit(' ', s_red)

        s_red.add_transition(t_r_g)
        s_green.add_transition(t_g_y)
        s_yellow.add_transition(t_y_r)

        layout.add_states([s_red, s_green, s_yellow])
        layout.initial_state = s_red

        super().__init__(layout)

def main():
    tl = ManualTrafficLight()
    tl.reset()
    tl.run()

if __name__ == '__main__':
    main()