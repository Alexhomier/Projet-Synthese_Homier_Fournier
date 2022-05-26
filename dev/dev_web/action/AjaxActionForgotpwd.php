<?php
// Nom fichier: AjaxActionForgotpwd.php
// Auteur: Alexandre Homier
// Description: Ajax pour le mot de passe oublié.
// Date: 25 mai 2022
require_once("action/CommonAction.php");
require_once("action/DAO/ForgotPWDDAO.php");

class AjaxActionForgotpwd extends CommonAction
{

    public function __construct()
    {
        parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
    }

    protected function executeAction()
    {
        $result = false;

        if(isset($_POST["username"])){
            $result = ForgotPWDDAO::getInfo($_POST["username"]);
        }

        if(isset($_POST["url"]) && isset($_POST["usernameRecovery"])){
            $result = ForgotPWDDAO::getUserInfo($_POST["url"], $_POST["usernameRecovery"]);
        }

        if(isset($_POST["userRec"]) && isset($_POST["pwdRec"])){
            ForgotPWDDAO::changePWD($_POST["userRec"], $_POST["pwdRec"]);
            $result = true;
        }

        return compact("result");
    }
}