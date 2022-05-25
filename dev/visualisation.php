<!-- 
    Auteur: Alexandre Homier
    Description: Page visualisation.php.
    Date: 25 mai 2022
 -->
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>M.A. Simulation | Visualisation</title>
    <link rel="icon" type="image/png" href="./media/img/overall/logo.png" />
    <link rel="stylesheet" href="./css/vis.css">
    <script src="https://rawcdn.githack.com/mrdoob/three.js/r124/build/three.js"></script>
    <script src="https://rawcdn.githack.com/mrdoob/three.js/r124/examples/js/controls/OrbitControls.js"></script>
    <script src="https://rawgit.com/Wilt/ThreeCSG/develop/ThreeCSG.js"></script>
    <script src="./js/vis/vis.js"></script>
    <script src="./js/vis/Scene.js"></script>
    <script src="./js/vis/Grille.js"></script>
    <script src="./js/vis/PlaneFormBase.js"></script>
    <script src="./js/vis/PlaneFormWalls.js"></script>
    <script src="./js/vis/Individus.js"></script>
    <script src="./js/vis/FrameList.js"></script>
    <script src="./js/vis/Node.js"></script>
    <script src="./js/vis/Conversion.js"></script>
    <script src="./js/vis/IndAnimation.js"></script>
</head>
<body>
    <div id="canvas" class="canvas">
    <div class="control-bg">
        <div class="control-container-compas">
            <h4 class="control-compas-title">Compas</h4>
            <div class="control-container-compas-little">
                <div class="control-item-compas">
                    <div class="control-item-north-compas"></div>
                </div>
            </div>
        </div>
        <div class="control-container-infos-commands">
            <div class="control-container-infos">
                <h4 class="control-infos-title">Infos</h4>
                <div class="control-container-infos-little">
                    <h5 class="control-info" id="indEvac">Individus évacués : 0</h5>
                    <h5 class="control-info" id="currentFrameCount">Position de la simulation : 0</h5>
                </div>
            </div>
            <div class="control-container-commands">
                <h4 class="control-commands-title">Commandes</h4>
                <div class="control-container-commands-little">
                    <button class="control-command-backward" onclick="getPrevFrame()"></button>
                    <button class="control-command-play" onclick="onClickPlay()"></button>
                    <button class="control-command-pause" onclick="onClickPause()"></button>
                    <button class="control-command-forward" onclick="getNextFrame()"></button>
                    <button class="control-command-pause" style="display: none;"></button>
                </div>
            </div>
        </div>
        <h3 class="control-north">N</h3>
        <h3 class="control-south">S</h3>
        <h3 class="control-west">O</h3>
        <h3 class="control-est">E</h3>
    </div>
    </div>

</body>
</html>