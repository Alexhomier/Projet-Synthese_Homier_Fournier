<?php
//  Auteur: Alexandre Homier
//  Description: Ajax forgotpwd redirection.
//  Date: 25 mai 2022
require_once("action/AjaxActionForgotpwd.php");

$action = new AjaxActionForgotpwd();
$data = $action->execute();

echo json_encode($data["result"]);