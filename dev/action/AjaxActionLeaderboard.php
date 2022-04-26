<?php
require_once("action/CommonAction.php");
require_once("action/DAO/LBDAO.php");

class AjaxActionLeaderboard extends CommonAction
{

    public function __construct()
    {
        parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
    }

    protected function executeAction()
    {
        $result = null;

        if(isset($_POST["page"])){
            $result = LBDAO::getLB($_POST["page"]);
        }

        return compact("result");
    }
}