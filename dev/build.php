<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>M.A. Simulation | Création</title>
    <link rel="icon" type="image/png" href="./media/img/overall/logo.png" />
    <link rel="stylesheet" href="./css/build.css">

<script src="https://cdn.jsdelivr.net/npm/@viselect/vanilla/lib/viselect.cjs.js"></script>
    <script src="./js/build.js"></script>
    <script src="./SpriteBuild/Case.js"></script>
</head>
<body>
    <div class="background">
        <grid class="grid"></grid>
        <div class="left-panel">
            <div class="left-panel-title-container">
                <h2 class="left-panel-title-item">Panneau de contrôle</h2>
            </div>
            <div class="left-panel-control-container">
                <div class="left-panel-control-title-container">
                    <h2 class="left-panel-title-item-cat">Commandes:</h2>
                </div>
                <div class="left-panel-control-button-container">
                    <button title="Agrandir la grille" class="left-panel-control-button-item" onclick="resizeUp()">+</button>
                    <button title="Réduire la grille" class="left-panel-control-button-item" onclick="resizeDown()">-</button>
                    <button title="Plein écran" class="left-panel-control-button-item-fullscreen" onclick="fullScreen()"></button>
                    <button title="Grille plein écran" class="left-panel-control-button-item-grid" onclick="gridFullScreen()"></button>
                    <button title="Fermer le panneau de contrôle" class="left-panel-control-button-item-close" onclick="closeMenu()"></button>
                </div>
            </div>
            <div class="left-panel-case-container">
                <div class="left-panel-case-title-container">
                    <h2 class="left-panel-title-item-cat">Cases:</h2>
                </div>
                <div class="left-panel-case-button-container">
                    <button title="Sélection: Couloir &#13Ctrl + Q" class="left-panel-button-item-couloir" onclick="setSelectionCouloir()"></button>
                    <button title="Sélection: Salle &#13Ctrl + W" class="left-panel-button-item-salle" onclick="setSelectionSalle()"></button>
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
        </div>
    </div>
</body>
</html>