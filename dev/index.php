<?php
require_once("action/CommonAction.php");
require_once("action/IndexAction.php");

$action = new IndexAction();
$data = $action->execute();

?>
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>M.A. Simulation | Connexion</title>
  <link rel="icon" type="image/png" href="./media/img/overall/logo.png" />
  <link rel="stylesheet" href="css/login.css">
  <link href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@700&family=Roboto+Mono:wght@200&family=Work+Sans&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@700&family=Roboto+Mono:wght@200&family=Roboto:wght@100&family=Work+Sans&display=swap" rel="stylesheet"> 
  <script src="js/login.js"></script>
  <script src="SpriteLogin/login.js"></script>
  <script src="SpriteLogin/header.js"></script>
    <!-- Global site tag (gtag.js) - Google Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-K3WF2KHEJM"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'G-K3WF2KHEJM');
  </script>
</head>
<body id="body">
  <div class="background-blacken" onclick="loginButton()"></div>
  <header class="header">
      <div class="header-container">
        <a href="index" class="header-item-title">M.A.</a>
        <div class="header-item-link">
          <a href="#ma" class="header-item-link-decoration">M.A.</a>
          <p class="header-item-link-decoration">|</p>
          <a href="#serv" class="header-item-link-decoration">Services</a>
          <p class="header-item-link-decoration">|</p>
          <a href="#cvm" class="header-item-link-decoration">CVM</a>
        </div>
        <div class="header-container-login">
          <div class="header-item-login-decoration" onclick="loginButton()"><h2>Connexion</h2></div>
        </div>
      </div>
    </header>

  <!-- Presentation  -->
  <div class="pres-background">
    <div class="pres-background-ia-img"></div>
    <header class="header-pres">
      <div class="header-container">
        <a href="index" class="header-item-title-pres">M.A.</a>
        <div class="header-container-login-pres">
          <div class="header-item-login-decoration-pres" onclick="loginButton()">
            <h2 class="header-item-login-title-decoration-pres">Connexion</h2>
          </div>
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
        <div class="container-pres-start" id="container-pres-start" onclick="signupButton()">
          <h3 class="item-pres-start-text" onclick="signupButton()">Commencer maintenant</h3>
          <div class="item-pres-start-button"></div>
      </div>
      </div>
    </div>
  </div>

  <!-- Section M.A. --> 
  <div class="ma-background" id="ma">
    <div class="ma-container">
      <h2 class="ma-item-title">Qu'est-ce que M.A.?</h2>
      <p class="ma-item-texte">
        Mathieu et Alexandre, deux étudiants de la technique informatique du Cégep du Vieux-Montréal.
        Ce site est notre projet de fin de fin d'étude, il associe le web avec l'intelligence artificielle
        pour créer une application optimale, aux particuliers et aux entreprises. Les technologies utilisées
        dans ce projet sont Python, Flask, Apache2 et PHP.
      </p>
    </div>
    <div class="ma-container-img">
      <a href="https://www.python.org/"><img src="./media/img/login/python.png" alt="python"></a>
      <a href="https://flask.palletsprojects.com/en/2.0.x/"><img src="./media/img/login/flask.png" alt="flask"></a>
      <a href="https://www.apache.org/"><img src="./media/img/login/apache.png" alt="apache"></a>
      <a href="https://www.php.net/"><img src="./media/img/login/php.png" alt="php"></a>
      <a href="https://www.cvm.qc.ca/"><img src="./media/img/login/cvm.png" alt="cvm"></a>
    </div>
  </div>

  <!-- Section Services -->
  <div class="serv-background" id="serv">
    <div class="serv-container">
      <div class="serv-container-title">
        <h2 class="serv-title">Nos services</h2>
        <p class="serv-text">
          Les services disponibles permettent 
          à n'importe qui de construire la simulation
          qu'ils désirent.
        </p>
      </div>
      <div class="serv-container-service">
        <div class="serv-service-container">
          <img src="./media/img/login/code.svg"  class="serv-service-img" alt="code">
          <h2 class="serv-service-title">Création</h2>
          <p class="serv-service-text">
            Notre outil de création permet
            à n'importe qui de créer façilement
            le plan d'un bâtiment qu'il désire.
            La grille fournit est intuitive, simple
            et fonctionnelle.
          </p>
        </div>
        <div class="serv-service-container">
          <img src="./media/img/login/rocket.svg"  class="serv-service-img" alt="rocket">
          <h2 class="serv-service-title">Simulation</h2>
          <p class="serv-service-text">
            Notre programme de simulation
            est une intelligence artificielle
            basée sur l'algorithme de PathFinding.
            Elle reconnait le chemin le plus rapide
            qu'un individu pourrait emprunter 
            dans un espace défini.
          </p>
        </div>
        <div class="serv-service-container">
          <img src="./media/img/login/cup.svg"  class="serv-service-img" alt="cup">
          <h2 class="serv-service-title">Visionnement</h2>
          <p class="serv-service-text">
            Notre page de visionnement en 3D
            permet d'avoir un apperçu en temps réelle 
            de la simulation. Vous pouvez vous diriger
            dans n'importe quel angle de vue, pour 
            découvrir votre plan.
          </p>
        </div>
      </div>
    </div>
  </div>

  <!-- Section CVM -->
  <div class="cvm-background" id="cvm">
    <div class="cvm-container">
      <div class="cvm-container-title">
        <h2 class="cvm-title">Notre projet</h2>
        <p class="cvm-text">
          Notre projet comporte plusieurs documents.
          Voici quelques-un d'entre eux.
          Vous pouvez les télécharger pour 
          suivre la progression que nous avons eu
          tout au long du développement du site.
        </p>
        <p class="cvm-text">
          Il est important de rappeller que ce projet
          est créer entièrement dans un but académique.
          Il n'a pas été créé dans un but lucratif.
        </p>
        <div class="cvm-container-img">
          <img src="./media/img/login/partner.svg"  class="cvm-img" alt="partner">
        </div>
      </div>
      <div class="cvm-container-links">
        <a href="./media/files/login/Mandat.pdf" class="cvm-item-link">
          <div class="cvm-link-img-container">
            <img src="./media/img/login/to-do.png" class="cvm-link-img" alt="to-do">
          </div>
          <div class="cvm-link-text-container">
            <p class="cvm-link-text">
              Le mandat est le repère
              de tous nos idées, la conception est possible 
              grâce à ce "BrainStorm".
            </p>
          </div>
        </a>
        <a href="./media/files/login/Conception.pdf" class="cvm-item-link">
          <div class="cvm-link-img-container">
            <img src="./media/img/login/planif.png" class="cvm-link-img" alt="planif">
          </div>
          <div class="cvm-link-text-container">
            <p class="cvm-link-text">
              La conception est l'application concrète de nos idées.
              Elle comporte des shémas UML, tout comme des maquettes.
            </p>
          </div>
        </a>
        <a href="./media/files/login/Planification.pdf" class="cvm-item-link">
          <div class="cvm-link-img-container">
            <img src="./media/img/login/temps.png" class="cvm-link-img" alt="temps">
          </div>
          <div class="cvm-link-text-container">
            <p class="cvm-link-text">
              La planification est notre gestionnaire de tâches et de temps.
              Elle nous permet de garder en tête nos objectifs.
            </p>
          </div>
        </a>
      </div>
    </div>
  </div>

  <!-- Section login -->
  <div class="login-background">
    <button class="login-exit" onclick="loginButton()">x</button>
    <div class="login-ia-img"></div>
    <form class="login-form" onsubmit="return false"">
      <div class="login-form-title-container">
        <div class="login-form-title-item-login" onclick="loginClickedView()"><h2>Connexion</h2></div>
        <div class="login-form-title-item-signup" onclick="signupClickedView()"><h2>Inscription</h2></div>
      </div>
      <div class="login-error-container">
        <p class="login-error-text"></p>
      </div>
      <div class="login-working-container">
        <p class="login-working-text"></p>
      </div>
      <div class="login-container-form-input"></div>
      <a href="forgotpwd.php" class="login-form-forgetmdp">Mot de passe oublié?</a>
      <button type="submit" class="login-form-button" onsubmit="login()">Se connecter</button>
    </form>
  </div>

  <!-- footer -->
  <footer class="footer-background">
    <div class="footer-container">
      <div class="footer-title-container">
        <h2 class="footer-title-item">M.A.</h2>
      </div>
      <div class="footer-copyright-container">
        <p class="footer-copyright-item">Copyrights aren't reserved. All works aren't protected by copyright of the corresponding authors. </p>
      </div>
      <div class="footer-link-container">
        <a href="#ma" class="footer-link-items">M.A.</a>
        <a href="#serv" class="footer-link-items">Services</a>
        <a href="#cvm" class="footer-link-items">CVM</a>
      </div>
    </div>
  </footer>
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
