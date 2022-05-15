<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>M.A. Simulation | Création</title>
    <link rel="icon" type="image/png" href="./media/img/overall/logo.png" />
    <link rel="stylesheet" href="./css/build.css">
    <link rel="stylesheet" href="./css/progress-waves-no-vars.css">

<script src="https://cdn.jsdelivr.net/npm/@viselect/vanilla/lib/viselect.cjs.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js" integrity="sha512-894YE6QWD5I59HgZOGReFYm4dnWc1Qt5NtvYSaNcOP+u1T9qYdvdihz0PPSiiqn/+/3e7Jo4EaG7TubfWGUrMQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="./js/build/build.js"></script>
    <script src="./js/build/Case.js"></script>
    <script src="./js/build/Grille.js"></script>
    <script src="./js/build/DAO/DAOGrille.js"></script>
</head>
<body>
    <div class="background">
        <grid class="grid"></grid>
        <button class="open-menu-button" onclick="openCloseControlPanel()"></button>
        <div class="left-panel">
            <div class="left-panel-container">
                <div class="left-panel-title-container">
                    <h2 class="left-panel-title-item">Panneau de contrôle</h2>
                </div>
                <div class="left-panel-control-container">
                    <div class="left-panel-control-title-container">
                        <h2 class="left-panel-title-item-cat">Commandes:</h2>
                    </div>
                    <div class="left-panel-control-button-container">
                        <button title="Agrandir la grille" class="left-panel-control-button-item" onclick="grille.resizeUp()">+</button>
                        <button title="Réduire la grille" class="left-panel-control-button-item" onclick="grille.resizeDown()">-</button>
                        <button title="Plein écran" class="left-panel-control-button-item-fullscreen" onclick="fullScreen()"></button>
                        <button title="Grille plein écran" class="left-panel-control-button-item-grid" onclick="grille.gridFullScreen()"></button>
                        <button title="Fermer le panneau de contrôle" class="left-panel-control-button-item-close" onclick="openCloseControlPanel()"></button>
                    </div>
                </div>
                <div class="left-panel-case-container">
                    <div class="left-panel-case-title-container">
                        <h2 class="left-panel-title-item-cat">Cases:</h2>
                    </div>
                    <div class="left-panel-case-button-container">
                        <button title="Sélection: Couloir &#13Alt + Z" class="left-panel-button-item-couloir" onclick="setSelectionCouloir()"></button>
                        <button title="Sélection: Salle &#13Alt + X" class="left-panel-button-item-salle" onclick="setSelectionSalle()"></button>
                        <button title="Sélection: Porte &#13Alt + C" class="left-panel-button-item-door" onclick="setSelectionDoor()"></button>
                        <button title="Sélection: Efface &#13Alt + V" class="left-panel-button-item-efface" onclick="setSelectionEfface()"></button>
                    </div>
                </div>
                <div class="left-panel-info-container">
                    <div class="left-panel-info-title-container">
                        <h2 class="left-panel-title-item-cat">Informations:</h2>
                    </div>
                    <div class="left-panel-info-value-container">
                        <h3 class="left-panel-info-value-selection">Sélection courante : </h3>
                        <div class="left-panel-info-scrollbar-container">
                            <h3 class="left-panel-info-value-selection-sb">Individus par salle : </h3>
                            <input title= "Individus par salle 1-100" type="range" min="1" max="100" class="left-panel-info-scrollbar" oninput="updateScrollBar()">
                        </div>
                    </div>
                </div>
                <div class="left-panel-options-container">
                    <div class="left-panel-options-title-container">
                        <h2 class="left-panel-title-item-cat">Options:</h2>
                    </div>
                    <div class="left-panel-options-button-container">
                        <button title="Enregistrer le plan" class="left-panel-button-item-save" onclick="saveGrid()"></button>
                        <button title="Accéder au classement" class="left-panel-button-item-lb" onclick="seeLeaderboard()"></button>
                        <button title="Simulation" class="left-panel-button-item-simu" onclick="grille.sendGrilleToPy()"></button>
                    </div>
                </div>
            </div>
            <div class="left-panel-welcome-container">
                <div class="left-panel-welcome-title-container">
                    <h2 class="left-panel-welcome-title-item"></h2>
                </div>
            </div>
        </div>
    </div>
    <div class="loading">
        <div class="loading-container">
            <div class="loading-img"></div>
            <div class="loading-title-anim">
                <h1 class="loading-title">Chargement de la simulation en cours</h1>
                <div class="in-progress"></div>
            </div>
        </div>
    </div>
</body>
</html>