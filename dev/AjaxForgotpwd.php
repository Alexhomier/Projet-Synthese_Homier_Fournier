<?php
require_once("action/AjaxActionForgotpwd.php");

$action = new AjaxActionForgotpwd();
$data = $action->execute();

echo json_encode($data["result"]);