<?php
//  Nom fichier: AjaxActionLeaderboard.php
//  Auteur: Alexandre Homier
//  Description: Ajax pour le leaderboard.
//  Date: 25 mai 2022
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

        if(isset($_POST["page"]) && isset($_POST["currentSelection"]) && isset($_POST["iduser"])){
            $result = LBDAO::getLB($_POST["page"], $_POST["currentSelection"], $_POST["iduser"]);
        }
        if(isset($_POST["usernameVote"]) && isset($_POST["vote"]) && isset($_POST["idVoter"])){
            $result = LBDAO::addVote($_POST["usernameVote"], $_POST["vote"], $_POST["idVoter"]);
        }

        return compact("result");
    }
}