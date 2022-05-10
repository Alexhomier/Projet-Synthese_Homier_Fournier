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
    <script src="./js/vis/ConversionTo3D.js"></script>
    <script src="./js/vis/IndAnimation.js"></script>
</head>
<body>
    <div id="canvas" class="canvas">
        <div class="control-bg">
            <div class="control-container-compas">

            </div>
            <div class="control-container-infos-commands">
                <div class="control-container-infos">
                    <div class="control-container-infos-little">

                    </div>
                </div>
                <div class="control-container-commands">
                    <div class="control-container-commands-little">

                    </div>
                </div>
            </div>
        </div>
    </div>

</body>
</html>