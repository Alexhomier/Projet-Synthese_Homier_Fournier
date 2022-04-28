<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/png" href="./media/img/overall/logo.png" />
    <title>M.A. Simulation | Classement</title>
    <link rel="stylesheet" href="css/leaderboard.css">
    <script src="js/leaderboard.js"></script>
    <script src="SpriteLeaderBoard/DateSelection.js"></script>
    <script src="SpriteLeaderBoard/ErrorMSG.js"></script>
</head>
<body>
    <div class="background">
        <div class="lb-container">
            <h2 class="lb-title">Classement</h2>
            <div class="lb-period" onclick="changeBoardSelect()">
                <div class="lb-period-day"><h4>Moi</h4></div>
                <div class="lb-period-all"><h4>Tout le monde</h4></div>
                <div class="lb-period-moving-div"></div>
            </div>
            <div class="lb-score">
                <div class="lb-score-item">
                    <div class="lb-score-left-container">
                        <h2 class="lb-score-number">1.</h2>
                        <h3 class="lb-score-name">Alexhomier</h3>
                    </div>
                    <div class="lb-score-right-container">
                        <button class="lb-score-import" onclick="goToVis(this)"></button>
                        <img src="./media/img/leaderboard/like.png" alt="like" class="lb-score-upvote" onclick="addVote(this)">
                        <h5 class="lb-score-vote">0</h5>
                    </div>
                </div>
            </div>
        </div>
        <div class="error-container">
            <h2 class="error-title">Malheureusement, vous avez déjà voté aujourd'hui. Revenez demain!</h2>
        </div>
    </div>
</body>
</html>