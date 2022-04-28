<?php
    require_once("action/DAO/Connection.php");

    class BuildDAO {
        public static function saveGrid($grille, $iduser) {
            $connection = Connection::getConnection();
            $statement = $connection->prepare("INSERT INTO layout (iduser, layout) VALUES (?, ?);");
            $statement->bindParam(1, $iduser);
            $statement->bindParam(2, $grille);
            $statement->setFetchMode(PDO::FETCH_ASSOC);
            $statement->execute();
        }
    }