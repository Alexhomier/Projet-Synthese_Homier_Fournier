# M.A. Simulation

  > Simulation d'évacuation par intelligence artificielle représenté en web avec la librairie Three.js. 

# Qu'est-ce que M.A. Simulation?

   > M.A. Simulation est un projet réalisé par Alexandre Homier et Mathieu Fournier.
   >> Il permet à n'importe qui de vérifier qu'elles sorties seraient les plus utilisé en situation d'urgence. Notre site vous offre la possibilitée de créer un plan et de le simuler grâce à notre algorithme personnalisé.
  
# Installation

 - Vous devrez installer un serveur Wamp : https://www.wampserver.com/en/
 - Vous devrez partir le site sur le localhost
 - L'algorithme est hébergé sur un serveur distant, vous ne pouvez donc pas le partir de la maison
 
  > La meilleure option pour tester le site est de se rendre directement dessus: https://masimulation.ca
  
# Utilisation

   > Pour l'utilisation de la grille, vous aurez besoin d'une grille en CSS qui contient ces attributs:
  
  ![alt text](https://i.imgur.com/4vdHoAC.png)
  
   > Ensuite vous devrez créer la grille avec l'lélement HTML de la grille ci-haut:
  
  ![alt text](https://i.imgur.com/TLQkgJn.png)
  
   > Finalement, pour la visualisation, vous devrez initialiser une autre grille dans le dossier d
  
  ![alt text](https://i.imgur.com/XY0qnVa.png)
  
   > Celle-ci prendra en paramètre une grille, les importations de ThreeJS et la scene ThreeJS.

   > La grille pour la visulation est généré par l'algorithme, qui se retrouve dans dev_Python.
   >> Le type d'algorithme est un "Astar Pathfinding Algorithm"

# Références

 - Librairie de sélection multiple en JavaScript : https://github.com/Simonwep/selection/tree/master/packages/vanilla (Simonwep multi select)
 - Librairie 3D en Javascript: https://threejs.org/ (ThreeJS)
 - Librairie pour modéliser façilement des objets ThreeJs : https://www.npmjs.com/package/three-csg-ts (ThreeCSG)

# Remerciements

 - Merci à Frédéric pour son expertise en Web
 - Merci à Jean-Christophe pour son aide.
 - Merci à Pierre-Paul pour son aide

# Liscence MIT

MIT License

Copyright (c) 2022 Alexhomier

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
