<?php
require_once("action/CommonAction.php");
require_once("action/DAO/BuildDAO.php");

class AjaxActionBuild extends CommonAction
{

    public function __construct()
    {
        parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
    }

    protected function executeAction()
    {
        $result = null;
        if(isset($_POST["grille"]) && isset($_POST["iduser"])){
            $result = BuildDAO::saveGrid($_POST["grille"], $_POST["iduser"]);
        }

        return compact("result");
    }
}