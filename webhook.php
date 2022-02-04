<?php
    $data = json_decode($_POST['payload']);

        if(!empty($data->action) && $data->action == "closed" &&
       !empty($data->pull_request) &&
       $data->pull_request->base->ref == "main"){
            shell_exec("git pull origin main");
            shell_exec("sudo systemctl restart apache2");
        }
