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
            if(isset($_POST["grille"])){
                // $url = 'https://masimulation.ca:8500/algo';
                // $data = array('grille' => $_POST["grille"]);

                // // use key 'http' even if you send the request to https://...
                // $options = array(
                //     'http' => array(
                //         'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
                //         'method'  => 'POST',
                //         'content' => http_build_query($data)
                //     )
                // );
                // $context  = stream_context_create($options);
                // $result = file_get_contents($url, false, $context);
                // if ($result === FALSE) { /* Handle error */ }

                // var_dump($result);
                $result = file_get_contents("http://masimulation.ca:8500/test");
            }            
        }

        if($result == null){
            $result = "caliss";
        }


        return compact("result");
    }
}