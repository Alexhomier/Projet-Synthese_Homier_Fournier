<?php
//  Auteur: Alexandre Homier
//  Description: DAO base de donnée mot de passe oublié.
//  Date: 25 mai 2022
    require_once("action/DAO/Connection.php");

    class ForgotPWDDAO {
        public static function getInfo($username) {
            $connection = Connection::getConnection();

            $statement = $connection->prepare("SELECT mail FROM users WHERE username = ?");
            $statement->bindParam(1, $username);
            $statement->setFetchMode(PDO::FETCH_ASSOC);
            $statement->execute();
            $email = $statement->fetchAll();

            $statement = $connection->prepare("SELECT password FROM users WHERE username = ?");
            $statement->bindParam(1, $username);
            $statement->setFetchMode(PDO::FETCH_ASSOC);
            $statement->execute();
            $pwd = $statement->fetchAll();
            
            $email = $email[0]["mail"];
            $url = $pwd[0]["password"];
            
            return compact("email", "url");
        }

        public static function getUserInfo($url, $username) {
            $connection = Connection::getConnection();

            $statement = $connection->prepare("SELECT password FROM users WHERE username = ?");
            $statement->bindParam(1, $username);
            $statement->setFetchMode(PDO::FETCH_ASSOC);
            $statement->execute();
            $pwd = $statement->fetchAll();
            
            $pwd = $pwd[0]["password"];

            if($pwd == $url){
                $result = true;
            } else {
                $result = false;
            }
            
            return $result;
        }

        public static function changePWD($username, $pwd) {
            $connection = Connection::getConnection();

            $pwd = password_hash($pwd, PASSWORD_DEFAULT);

            $statement = $connection->prepare("UPDATE users SET password = ? WHERE username = ?;");
            $statement->bindParam(2, $username);
            $statement->bindParam(1, $pwd);
            $statement->execute();
        }
    }