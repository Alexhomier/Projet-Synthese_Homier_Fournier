<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/png" href="./media/img/overall/logo.png" />
    <title>Ma Simulation | Mot de passe oublié</title>
    <link rel="stylesheet" href="css/forgotmdp.css">
    <script src="js/forgotpwd.js"></script>
</head>
<body>
    <div class="background">
        <div class="mdp-container">
            <div class="mdp-key-img"></div>
            <h2 class="mdp-title">Mot de passe oublié?</h2>
            <p class="mdp-text">Pas de problème! Veuillez entrer votre nom d'utilisateur et suivre les instructions.</p>
            <input type="mail" class="mdp-input" required>
            <button class="mdp-button" onclick="sendMail()">Réinitialiser le mot de passe</button>
            <div class="mdp-back">
                <div class="mdp-arrow"></div>
                <a href="index.php" class="mdp-link">Retour à la connexion</a>
            </div>
        </div>
        <div class="sent-container">
            <h2 class="sent-title">Courriel envoyé!</h2>
            <p class="sent-text">
                Un courriel a été envoyé à l'adresse associé au nom d'utilisateur.
                Si le nom d'utilisateur n'existe pas, veuillez réessayer.
                Veuillez maintenant suivre les instructions envoyées par courriel
                pour effectuer le changement de mot de passe. Si vous ne trouvez pas 
                votre courriel, veuillez vérifier dans vos courriels indésirables.
            </p>
        </div>
        <div class="rec-container">
            <div class="rec-key-img"></div>
            <h2 class="rec-title">Changement de mot de passe</h2>
            <p class="rec-text"></p>
            <input type="password" class="rec-input" id="pwd1" required>
            <input type="password" class="rec-input" id="pwd2" required>
            <button class="rec-button" onclick="checkpwd()">Réinitialiser le mot de passe</button>
        </div>
    </div>
</body>
</html>