<?php
//  Auteur: Alexandre Homier
//  Description: Ajax pour le login.
//  Date: 25 mai 2022
require_once("action/CommonAction.php");
require_once("action/DAO/LoginDAO.php");

class AjaxActionIndex extends CommonAction
{

    public function __construct()
    {
        parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
    }

    protected function executeAction()
    {
        $result = null;

        if(isset($_POST["action"])){
            if($_POST["action"] == "login"){
                if(isset($_POST["username"]) && isset($_POST["password"])){
                    $info = LoginDAO::login($_POST["username"]);
                    if(!password_verify($_POST["password"], $info[0]["password"])){
                        $result[0] = "Le nom d'utilisateur ou le mot de passe est incorrect, veuillez réessayer.";
                        $result[1] = true;
                    } else {
                        $result[0] = $info[0]["id"];
                        $result[1] = false;
                    }
        
                }
            }
            if($_POST["action"] == "signup"){
                if(isset($_POST["username"]) && isset($_POST["password"]) && isset($_POST["mail"])){
                    $hash = password_hash($_POST["password"], PASSWORD_DEFAULT);
                    $result = LoginDAO::inscription($_POST["username"], $hash, $_POST["mail"]);
                }
            }
        }

        return compact("result");
    }
}