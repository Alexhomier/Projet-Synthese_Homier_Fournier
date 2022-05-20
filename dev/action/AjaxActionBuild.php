<?php
require_once("action/CommonAction.php");
require_once("action/DAO/BuildDAO.php");

class AjaxActionBuild extends CommonAction
{

    public function __construct()
    {
        parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
    }

    protected function executeAction()
    {
        $result = null;
        if(isset($_POST["grille"]) && isset($_POST["iduser"])){
            $result = BuildDAO::saveGrid($_POST["grille"], $_POST["iduser"]);
        } else {
            if(isset($_POST["infos"])){
                $url = "http://masimulation.ca:8500/algo";

                $curl = curl_init($url);
                curl_setopt($curl, CURLOPT_URL, $url);
                curl_setopt($curl, CURLOPT_POST, true);
                curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

                $headers = array(
                "Content-Type: application/json",
                );
                curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);

                $data = $_POST["infos"];

                curl_setopt($curl, CURLOPT_POSTFIELDS, $data);

                //for debug only!
                curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
                curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);

                $result = curl_exec($curl);
                curl_close($curl);
                var_dump($result);
            }            
        }
        return compact("result");
    }
}