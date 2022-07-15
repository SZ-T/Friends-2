<?php

require_once ('Models/Database.php');
require_once ('Models/BasicUserData.php');

class UserDataSet {
    protected $_dbHandle, $_dbInstance;
        
    public function __construct() {
        $this->_dbInstance = Database::getInstance();
        $this->_dbHandle = $this->_dbInstance->getdbConnection();
    }

    // Searches users relation with given parameters
    public function searchUsers($searchText, $sort, $page, $limit): array
    {
        // Set the limit to retrieve from the database for pagination
        if (1 < (int) $limit && (int) $limit <= 200) {
            $offset = ($page - 1) * $limit;
            $limit = ' LIMIT '.(int) $limit.' OFFSET '.$offset;
        } else {
            $limit = '';
        }
        // Edit search statement for LIKE search
        $searchText = '%'.$searchText.'%';

        // SQL statement to search for search statement
        $sqlQuery = 'SELECT * FROM users WHERE username LIKE :text ORDER BY username ASC'.$limit;
        $statement = $this->_dbHandle->prepare($sqlQuery);
        $statement->execute(['text' => $searchText]); // execute the PDO statement

        $dataSet = [];
        while ($row = $statement->fetch()) {
            $dataSet[] = new BasicUserData($row);
        }

        return $dataSet;
    }
}


