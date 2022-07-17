<?php

session_start();

// Check user is loggedin and CSRF token is correct
if (!isset($_GET['token']) || $_GET['token'] != $_SESSION['ajaxToken'] || !isset($_SESSION["id"])) {
    http_response_code(401);
    exit();
}

set_include_path("..");
require_once ("Models/UserLocationData.php");
require_once ("Models/FriendsDataSet.php");

$dataset = new FriendsDataSet();
$locations = $dataset->getFriendLocation();

// Return JSON
echo json_encode($locations);