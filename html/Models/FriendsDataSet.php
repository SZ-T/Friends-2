<?php

require_once ('Models/Database.php');
require_once ('Models/FriendData.php');
require_once ("Models/UserData.php");
require_once ("Models/UserLocationData.php");

class FriendsDataSet {

protected $_dbConnection, $_dbInstance;
    
    public function __construct() {
        $this->_dbInstance = Database::getInstance();
        $this->_dbConnection = $this->_dbInstance->getDbConnection();
    }

    // Searches friends relation with given parameters
    public function searchUsers($searchText, $sort, $page, $limit, $status='') {
        // Set the limit to retrieve from the database
        if (1 < (int) $limit && (int) $limit <= 200) {
            $offset = ($page - 1) * $limit;
            $limit = ' LIMIT '.(int) $limit.' OFFSET '.$offset;
        } else {
            $limit = '';
        }
        // Edit search statement for LIKE search
        $searchText = '%'.$searchText.'%';
        $status = '%'.$status.'%';
        // Search the database for friends of current user
        $sqlQuery = "SELECT * FROM
                            (SELECT id, email, username, first_name, last_name, profile, latitude, longitude, sender, status FROM users JOIN friends ON users.id = friends.sender WHERE friends.recipient = :id
                            UNION
                            SELECT id, email, username, first_name, last_name, profile, latitude, longitude, sender, status FROM users JOIN friends on users.id = friends.recipient WHERE friends.sender = :id
                            UNION
                            SELECT id, email, username, first_name, last_name, profile, latitude, longitude, '' AS sender, '' AS status FROM users WHERE id NOT IN (
                                SELECT id FROM users JOIN friends ON users.id = friends.sender WHERE friends.recipient = :id
                                UNION
                                SELECT id FROM users JOIN friends on users.id = friends.recipient WHERE friends.sender = :id)) AS query
                            WHERE (username LIKE :text OR first_name LIKE :text OR last_name LIKE :text) AND id != :id AND status LIKE :status".$sort.$limit;
        $statement = $this->_dbConnection->prepare($sqlQuery); // prepare a PDO statement
        $statement->execute(['id' => $_SESSION["id"], 'text' => $searchText, 'status' => $status]); // execute the PDO statement
        
        $dataSet = [];
        while ($row = $statement->fetch()) {
            if (isset($row["status"])) {
                $dataSet[] = new FriendData($row);
            } else {
                $dataSet[] = new UserData($row);
            }

        }

        return $dataSet;
    }

    // Returns the location of all Accepted friend relations
    public function getFriendLocation() {
        $sqlQuery = "SELECT 'me' AS id, username, latitude, longitude, profile, '' AS sender, '' AS status FROM users WHERE id = :id
                            UNION
                            SELECT * FROM
                            (SELECT id, username, latitude, longitude, profile, sender, status FROM users JOIN friends ON users.id = friends.sender WHERE friends.recipient = :id
                            UNION
                            SELECT id, username, latitude, longitude, profile, sender, status FROM users JOIN friends on users.id = friends.recipient WHERE friends.sender = :id
                            ) AS query
                            WHERE status = 'Accepted'";
        $statement = $this->_dbConnection->prepare($sqlQuery); // prepare a PDO statement
        $statement->execute(['id' => $_SESSION["id"]]); // execute the PDO statement
        $dataSet = [];
        while ($row = $statement->fetch()) {
            $dataSet[] = new UserLocationData($row);
        }
        return $dataSet;
    }

    // Returns the number of friend relations Pending which were initiated by another user
    public function getFriendRequests() {
        $sqlQuery = "SELECT COUNT(id) FROM users JOIN friends ON users.id = friends.sender WHERE friends.recipient = :id
                            AND status = 'Pending'";
        $statement = $this->_dbConnection->prepare($sqlQuery); // prepare a PDO statement
        $statement->execute(['id' => $_SESSION["id"]]); // execute the PDO statement
        
        return $statement->fetch()["COUNT(id)"];
    }
}