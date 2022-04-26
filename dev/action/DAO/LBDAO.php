<?php
    require_once("action/DAO/Connection.php");

    class LBDAO {
        public static function getLB($page) {
            $connection = Connection::getConnection();
            $page -= 1;

            $statement = $connection->prepare("SELECT username, vote, layout FROM layout INNER JOIN users ON layout.iduser = users.id ORDER BY vote DESC LIMIT 5 OFFSET ?;");
            $statement->bindParam(1, $page);
            $statement->setFetchMode(PDO::FETCH_ASSOC);
            $statement->execute();
            $lb = $statement->fetchAll();
            
            return compact("lb");
        }

        public static function addVote($username) {
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
    }