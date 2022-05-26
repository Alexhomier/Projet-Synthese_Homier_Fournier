<?php
//  Nom fichier: LBDAO.php
//  Auteur: Alexandre Homier
//  Description: DAO base de donnée leaderboard.
//  Date: 25 mai 2022

    require_once("action/DAO/Connection.php");

    class LBDAO {
        public static function getLB($page, $currentSelection, $iduser) {
            $connection = Connection::getConnection();
            $page -= 1;
            $page *= 5;

            if($currentSelection == "all"){
                $statement = $connection->prepare("SELECT username, vote, layout FROM layout INNER JOIN users ON layout.iduser = users.id ORDER BY vote DESC LIMIT 5 OFFSET ?;");
                $statement->bindParam(1, $page);
            } else {
                $statement = $connection->prepare("SELECT iduser, username, vote, layout FROM layout INNER JOIN users ON layout.iduser = users.id WHERE iduser = ? ORDER BY vote DESC LIMIT 5 OFFSET ?;");
                $statement->bindParam(1, $iduser);
                $statement->bindParam(2, $page);
            }
            $statement->setFetchMode(PDO::FETCH_ASSOC);
            $statement->execute();
            $lb = $statement->fetchAll();

            $statement = $connection->prepare("SELECT count(*) FROM layout;");
            $statement->setFetchMode(PDO::FETCH_ASSOC);
            $statement->execute();
            $pageCount = $statement->fetchAll();
            
            return compact("lb", "pageCount");
        }

        public static function addVote($username, $vote, $idvoter) {
            $connection = Connection::getConnection();
            $newVoteCount = 0;

            if(LBDAO::checkVote($idvoter)){
                $newVoteCount = $vote + 1;
                $statement = $connection->prepare("UPDATE layout SET vote = ? FROM users WHERE (SELECT id FROM users WHERE username = ?) = iduser AND layout.vote = ? RETURNING layout.id");
                $statement->bindParam(1, $newVoteCount);
                $statement->bindParam(2, $username);
                $statement->bindParam(3, $vote);
                $statement->setFetchMode(PDO::FETCH_ASSOC);
                $statement->execute();
                $voteInfo = $statement->fetchAll();
                $layoutId = $voteInfo[0]["id"];

                $statement = $connection->prepare("INSERT INTO vote (idlayout, iduser) VALUES (?, ?)");
                $statement->bindParam(1, $layoutId);
                $statement->bindParam(2, $idvoter);
                $statement->setFetchMode(PDO::FETCH_ASSOC);
                $statement->execute();

                return true;
            } else {
                return false;
            }
        }

        public static function checkVote($iduser) {
            $connection = Connection::getConnection();
            $result = true;

            $statement = $connection->prepare("SELECT time FROM vote WHERE iduser = ?");
            $statement->bindParam(1, $iduser);
            $statement->setFetchMode(PDO::FETCH_ASSOC);
            $statement->execute();
            $voteInfo = $statement->fetchAll();

            if(sizeof($voteInfo) > 0){
                if(date("Y-m-d") == $voteInfo[0]["time"]){
                    $result = false;
                }
            }

            return $result;
        }
    }