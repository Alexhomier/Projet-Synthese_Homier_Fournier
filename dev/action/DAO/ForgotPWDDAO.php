<?php
    require_once("action/DAO/Connection.php");

    class ForgotPWDDAO {
        public static function getMail($username) {
            $connection = Connection::getConnection();

            $statement = $connection->prepare("SELECT mail FROM users WHERE username = ?");
            $statement->bindParam(1, $username);
            $statement->setFetchMode(PDO::FETCH_ASSOC);
            $statement->execute();
            $email = $statement->fetchAll();
            
            return $email[0]["mail"];
        }
    }