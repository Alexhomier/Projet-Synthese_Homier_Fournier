<?php
//  Nom fichier: AjaxBuild.php
//  Auteur: Alexandre Homier
//  Description: Ajax Build redirection.
//  Date: 25 mai 2022
require_once("action/AjaxActionBuild.php");

$action = new AjaxActionBuild();
$data = $action->execute();

echo json_encode($data["result"]);