<?php
    require_once("action/DAO/Connection.php");

    class LoginDAO {
        public static function login($username) {
            $connection = Connection::getConnection();

            $statement = $connection->prepare("SELECT password FROM user WHERE username = ?");
            $statement->bindParam(1, $username);
            $statement->setFetchMode(PDO::FETCH_ASSOC);
            $statement->execute();

            return $statement->fetchAll();
        }

        public static function inscription($username, $password, $mail) {
            $connection = Connection::getConnection();

            $statement = $connection->prepare("INSERT INTO user(username, password, mail) VALUES (?, ?, ?)");
            $statement->bindParam(1, $username);
            $statement->bindParam(2, $password);
            $statement->bindParam(3, $mail);
            $statement->execute();
        }
    }