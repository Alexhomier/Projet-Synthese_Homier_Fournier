<?php
//  Nom fichier: AjaxIndex.php
//  Auteur: Alexandre Homier
//  Description: Ajax Index redirection.
//  Date: 25 mai 2022
require_once("action/AjaxActionIndex.php");

$action = new AjaxActionIndex();
$data = $action->execute();

echo json_encode($data["result"]);