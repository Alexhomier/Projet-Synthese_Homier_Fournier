<?php
//  Nom fichier: BuildDAO.php
//  Auteur: Alexandre Homier
//  Description: DAO base de donnée de la grille.
//  Date: 25 mai 2022
    require_once("action/DAO/Connection.php");

    class BuildDAO {
        public static function saveGrid($grille, $iduser) {
            $connection = Connection::getConnection();
            $statement = $connection->prepare("INSERT INTO layout (iduser, layout) VALUES (?, ?) RETURNING iduser, id");
            $statement->bindParam(1, $iduser);
            $statement->bindParam(2, $grille);
            $statement->setFetchMode(PDO::FETCH_ASSOC);
            $statement->execute();
            $result = $statement->fetchAll();

            return $result;
        }
    }