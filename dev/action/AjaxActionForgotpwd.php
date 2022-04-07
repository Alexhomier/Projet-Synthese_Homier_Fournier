<?php
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
        $result = "";

        if(isset($_POST["username"])){
            $result = ForgotPWDDAO::getMail($_POST["username"]);
        }

        return compact("result");
    }
}