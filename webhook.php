<?php
    $data = json_decode($_POST['payload']);
        echo "Erreur 404";

        if(!empty($data->action) && $data->action == "closed" && 
       !empty($data->pull_request) && 
       $data->pull_request->base->ref == "master"){

                shell_exec("git pull origin master"); 
                echo "Script executed";
        }