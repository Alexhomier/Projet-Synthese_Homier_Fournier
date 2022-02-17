<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>M.A. Simulation | Connexion</title>
  <link rel="stylesheet" href="css/login.css">
  <link href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@700&family=Roboto+Mono:wght@200&family=Work+Sans&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@700&family=Roboto+Mono:wght@200&family=Roboto:wght@100&family=Work+Sans&display=swap" rel="stylesheet"> 
</head>
<body>
  <div class="pres-background">
      <div class="pres-background-ia-img"></div>
      <header class="header">
        <div class="header-container">
          <a href="index.php" class="header-item-title">M.A.</a>
          <div class="header-item-link">
            <a href="#" class="header-item-link-decoration">M.A.</a>
            <p class="header-item-link-decoration">|</p>
            <a href="#" class="header-item-link-decoration">Services</a>
            <p class="header-item-link-decoration">|</p>
            <a href="#" class="header-item-link-decoration">Contexte</a>
            <p class="header-item-link-decoration">|</p>
            <a href="#" class="header-item-link-decoration">CVM</a>
          </div>
          <div class="header-container-login">
            <div class="header-item-login-decoration"><h2>Connexion</h2></div>
          </div>
        </div>
      </header>
      <!-- Section Pres -->
      <div class="container-pres">
        <div class="container-pres-title-text">
          <div class="container-pres-title">
            <h1>Créer, tester et s'informer.</h1>
          </div>
          <div class="container-pres-text">
            <p class="item-pres-text">
              Notre solution de simulation offre à n'importe quel utilisateur
              un moyen d'apprendre et de s'amuser en créant des dispositions 
              d'immeubles réelle ou tout droit sortie de leur imagination.
              Que ce soit pour un projet professionnelle ou personnel, 
              notre équipe vous assure qu'elle saura répondre à
              vos besoins.
            </p>
          </div>
        </div>
        <div class="container-pres-start" id="container-pres-start" onclick="gotoSignup()">
          <h3 class="item-pres-start-text">Commencer maintenant</h3>
          <div class="item-pres-start-button"></div>
        </div>
      </div>
    </div>
    <!-- Section M.A. -->
    <!-- <div class="ma-background">

    </div> -->

    <!-- Section login -->
    <div class="login-background">
      <div class="login-ia-img"></div>
      <form action="" class="login-form">
        <div class="login-form-title-container">
          <div class="login-form-title-item-login"><h2>Connexion</h2></div>
          <div class="login-form-title-item-signup"><h2>Inscription</h2></div>
        </div>
        <div class="login-container-form-input">
          <input type="text" class="login-form-input-decoration" placeholder="Nom d'utilisateur" required>
          <input type="password" class="login-form-input-decoration" placeholder="Mot de passe" required>
        </div>
        <button type="submit" class="login-form-button">Se connecter</button>
      </form>
    </div>
</body>
</html>

<!-- 
⢀⡴⠑⡄⠀⠀⠀⠀⠀⠀⠀⣀⣀⣤⣤⣤⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠸⡇⠀⠿⡀⠀⠀⠀⣀⡴⢿⣿⣿⣿⣿⣿⣿⣿⣷⣦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠑⢄⣠⠾⠁⣀⣄⡈⠙⣿⣿⣿⣿⣿⣿⣿⣿⣆⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⢀⡀⠁⠀⠀⠈⠙⠛⠂⠈⣿⣿⣿⣿⣿⠿⡿⢿⣆⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⢀⡾⣁⣀⠀⠴⠂⠙⣗⡀⠀⢻⣿⣿⠭⢤⣴⣦⣤⣹⠀⠀⠀⢀⢴⣶⣆
⠀⠀⢀⣾⣿⣿⣿⣷⣮⣽⣾⣿⣥⣴⣿⣿⡿⢂⠔⢚⡿⢿⣿⣦⣴⣾⠁⠸⣼⡿
⠀⢀⡞⠁⠙⠻⠿⠟⠉⠀⠛⢹⣿⣿⣿⣿⣿⣌⢤⣼⣿⣾⣿⡟⠉⠀⠀⠀⠀⠀
⠀⣾⣷⣶⠇⠀⠀⣤⣄⣀⡀⠈⠻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⠀⠀⠀⠀⠀⠀
⠀⠉⠈⠉⠀⠀⢦⡈⢻⣿⣿⣿⣶⣶⣶⣶⣤⣽⡹⣿⣿⣿⣿⡇⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠉⠲⣽⡻⢿⣿⣿⣿⣿⣿⣿⣷⣜⣿⣿⣿⡇⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⣷⣶⣮⣭⣽⣿⣿⣿⣿⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⣀⣀⣈⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠇⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠃⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠹⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠟⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠛⠻⠿⠿⠿⠿⠛⠉ 
      Code made by AlexHomier
-->