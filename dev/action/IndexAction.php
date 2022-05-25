<?php
//  Auteur: Alexandre Homier
//  Description: PHP action pour le login.
//  Date: 25 mai 2022
require_once("action/CommonAction.php");

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
