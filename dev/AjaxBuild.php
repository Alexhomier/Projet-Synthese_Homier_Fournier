<?php
require_once("action/AjaxActionBuild.php");

$action = new AjaxActionBuild();
$data = $action->execute();

echo json_encode($data["result"]);