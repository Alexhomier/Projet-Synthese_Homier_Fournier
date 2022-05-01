<?php
require_once("action/AjaxActionLeaderboard.php");

$action = new AjaxActionLeaderboard();
$data = $action->execute();

echo json_encode($data["result"]);