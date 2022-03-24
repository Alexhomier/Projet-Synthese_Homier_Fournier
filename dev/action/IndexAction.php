<?php
require_once("action/CommonAction.php");
require_once("action/DAO/LoginDAO.php");

class IndexAction extends CommonAction
{

    public function __construct()
    {
        parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
    }

    protected function executeAction()
    {
        $error = null;

        if(isset($_POST("mail")) && isset($_POST("passwordConf"))){
            if(isset($_POST("username")) && isset($_POST("password"))){
                if(isset("password") != isset($_POST("passwordConf"))){
                    $error = "Les mots de passes ne correspondes pas."; 
                } else {
                    $hash = password_hash($_POST("password"), PASSWORD_DEFAULT);
                    LoginDAO::inscription($_POST("username"), $_POST("password"), $_POST("mail"));
                }
            }
        }else{
            if(isset($_POST("username")) && isset($_POST("password"))){
                $hash = LoginDAO::login($_POST("username"));
                if(password_verify($_POST("password"), $hash)){
                    $_SESSION["visibility"] = 1;
                    header("location:build.php");
                    exit;
                } else {
                    $error = "Une erreur s'est produite veuillez réessayer.";
                }
            }
        }
        return $error;
    }
}
