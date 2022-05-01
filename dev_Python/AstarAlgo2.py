class Astar:
	def __init__(grid, start, end):
		self.grid = grid
		self.start = start
		self.end = end

	def h(p1, p2): #Heuristic function (manhattan distance)
		x1, y1 = p1
		x2, y2 = p2
		return abs(x1 - x2) + abs(y1 - y2)

	def algorithm(self):
		count = 0
		open_set = PriorityQueue()
		open_set.put((0, count, start))
		came_from = {}
		g_score = {case: float("inf") for row in self.grid for case in row} #Contient tout les G scores
		g_score[self.start] = 0
		f_score = {case: float("inf") for row in self.grid for case in row} # Contient les F scores
		f_score[self.start] = h(self.start.get_position(), self.end.get_position()) #F score de start est la distance heuristique calculé dans la métohde h

		open_set_hash = {self.start}

		while not open_set.empty():

			current_case = open_set.get()[2] #Prends la case ayant le meilleur score (plus bas) avec la PriorityQueue
			open_set_hash.remove(current_case)

			if current_case == self.end:  #Si la current_case est end, c'est la fin de l'ago
				reconstruct_path(came_from, self.end)  #Nouvelle méthode qui initialisera le chemin pour l'individu
				return True

			for voisin in current_case.voisins:  #Analyse les voisin de la current_case
				temp_g_score = g_score[current_case] + 1

				if temp_g_score < g_score[voisin]:
					came_from[voisin] = current_case # Ajoute la case au chemin le plus court
					g_score[voisin] = temp_g_score
					f_score[voisin] = temp_g_score + h(voisin.get_position(), self.end.get_position())
					if voisin not in open_set_hash:
						count += 1
						open_set.put((f_score[voisin], count, voisin))
						open_set_hash.add(voisin)

		return False