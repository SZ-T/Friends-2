<?php

session_start();

// Ensure user is logged in
if (!isset($_SESSION["id"])) {
    http_response_code(401);
    exit();
}

set_include_path("..");
require_once ("Models/FriendsDataSet.php");

$dataset = new FriendsDataSet();
$requests = $dataset->getFriendRequests();

// Return number of requests
echo $requests;