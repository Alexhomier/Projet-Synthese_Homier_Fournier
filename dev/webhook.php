<?php
    shell_exec("git pull origin main");
    shell_exec("sudo systemctl restart apache2");
    echo 'Pull terminé';
