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
        return [];
    }
}
