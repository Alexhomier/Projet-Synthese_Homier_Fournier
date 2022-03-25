<?php
    require_once("action/DAO/Connection.php");

    class LoginDAO {
        public static function login($username) {
            $connection = Connection::getConnection();

            $statement = $connection->prepare("SELECT password FROM users WHERE username = ?");
            $statement->bindParam(1, $username);
            $statement->setFetchMode(PDO::FETCH_ASSOC);
            $statement->execute();
            $hash = $statement->fetchAll();
            
            if(sizeof($hash) <= 0)
                $hash = "";
            else
                $hash = $hash[0]["password"];

            return $hash;
        }

        public static function inscription($username, $password, $mail) {
            $connection = Connection::getConnection();

            if(LoginDAO::getIfUnique($username, $mail)){
                $statement = $connection->prepare("INSERT INTO users(username, password, mail) VALUES (?, ?, ?)");
                $statement->bindParam(1, $username);
                $statement->bindParam(2, $password);
                $statement->bindParam(3, $mail);
                $statement->execute();
            } else {
                return "Ce nom d'utilisateur ou ce courriel est déjà utilisé, veuillez réessayer.";
            }
        }

        public static function getIfUnique($username, $mail) {
            $unique = true;
            $connection = Connection::getConnection();

            $statement = $connection->prepare("SELECT username FROM users WHERE username = ?");
            $statement->bindParam(1, $username);
            $statement->setFetchMode(PDO::FETCH_ASSOC);
            $statement->execute();
            $usernameUnique = $statement->fetchAll();

            $statement = $connection->prepare("SELECT mail FROM users WHERE mail = ?");
            $statement->bindParam(1, $mail);
            $statement->setFetchMode(PDO::FETCH_ASSOC);
            $statement->execute();
            $mailUnique = $statement->fetchAll();

            if(sizeOf($usernameUnique) != 0){
                $unique = false;
            }

            if(sizeOf($mailUnique) != 0){
                $unique = false;
            }

            return $unique;
        }
    }