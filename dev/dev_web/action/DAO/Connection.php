<?php
//  Nom fichier: Connection.php
//  Auteur: Alexandre Homier
//  Description: DAO base de donnée informations de connection.
//  Date: 25 mai 2022
    class Connection {
        private static $connection = null;

        public static function getConnection() {
            if (Connection::$connection == null) {
                Connection::$connection = new PDO(DB_HOST, DB_USER, DB_PASS);
                Connection::$connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                Connection::$connection->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
            }

            return Connection::$connection;
        }
    }