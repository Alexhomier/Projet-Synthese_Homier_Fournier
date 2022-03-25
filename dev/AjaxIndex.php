<?php
require_once("action/AjaxActionIndex.php");

$action = new AjaxActionIndex();
$data = $action->execute();

echo json_encode($data["result"]);