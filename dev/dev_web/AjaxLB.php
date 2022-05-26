<?php
//  Nom fichier: AjaxLB.php
//  Auteur: Alexandre Homier
//  Description: Ajax leaderboard redirection.
//  Date: 25 mai 2022
require_once("action/AjaxActionLeaderboard.php");

$action = new AjaxActionLeaderboard();
$data = $action->execute();

echo json_encode($data["result"]);