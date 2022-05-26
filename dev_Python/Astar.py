###############################################################
##  Nom du fichier : Astar									 ##
##	Auteur: Mathieu Fournier                                 ##
##  Description: Algorithme Astar						     ##
##  Date: 27 mai 2022                                        ##
###############################################################

from queue import PriorityQueue 

class Astar:
	def __init__(self):
		pass

	def h(p1, p2): #Fonction Heuristique (manhattan distance)
		x1, y1 = p1
		x2, y2 = p2
		return abs(x1 - x2) + abs(y1 - y2)

	def algorithm(self, grid, start, end):
		count = 0
		open_set = PriorityQueue()
		open_set.put((0, count, start))
		came_from = {}
		g_score = {case: float("inf") for row in grid for case in row} 
		g_score[start] = 0
		f_score = {case: float("inf") for row in grid for case in row} 
		f_score[start] = Astar.h(start.get_position(), end.get_position()) 

		open_set_hash = {start}

		while not open_set.empty():

			current_case = open_set.get()[2] 
			open_set_hash.remove(current_case)

			if current_case == end:  
				return came_from

			for voisin in current_case.voisins:  
				temp_g_score = g_score[current_case] + 1

				if temp_g_score < g_score[voisin]:
					came_from[voisin] = current_case
					g_score[voisin] = temp_g_score
					f_score[voisin] = temp_g_score + Astar.h(voisin.get_position(), end.get_position())
					if voisin not in open_set_hash:
						count += 1
						open_set.put((f_score[voisin], count, voisin))
						open_set_hash.add(voisin)

		return False

	def single_algo(self, grid, start, end): 
		count = 0
		open_set = PriorityQueue()
		came_from = {}
		g_score = {case: float("inf") for row in grid for case in row} 
		g_score[start] = 0
		f_score = {case: float("inf") for row in grid for case in row} 
		f_score[start] = Astar.h(start.get_position(), end.get_position()) 
		is_done = False

		current_case = start 

		if len(current_case.voisins) == 1:
			if current_case.voisins[0].get_type() == 'End':
				is_done = True
			return is_done, current_case.voisins[0]
		elif not len(current_case.voisins) == 0:
			for voisin in current_case.voisins:  
				temp_g_score = g_score[current_case] + 1
				if voisin.get_type() == "End":
					is_done = True

				if temp_g_score < g_score[voisin]:
					came_from[voisin] = current_case 
					g_score[voisin] = temp_g_score
					f_score[voisin] = temp_g_score + Astar.h(voisin.get_position(), end.get_position()) 
					count += 1
					open_set.put((f_score[voisin], count, voisin))
			return is_done, open_set.get()[2]
		else:
			return False

		