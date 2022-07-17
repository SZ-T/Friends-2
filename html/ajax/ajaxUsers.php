<?php

session_start();

// Check CSRF token is correct
if (!isset($_GET['token']) || $_GET['token'] != $_SESSION['ajaxToken']) {
    http_response_code(401);
    exit();
}

set_include_path("..");
// Choose dataset to use depending on whether user is logged in
if (isset($_SESSION["id"])) {
    require_once ("Models/FriendsDataSet.php");
    $userDataSet = new FriendsDataSet();
} else {
    require_once ("Models/UserDataSet.php");
    $userDataSet = new UserDataSet();
}

require_once ("Models/SearchParams.php");


$search = $_GET['search'];
$page = $_GET['page'];
$mode = $_GET['mode'];

$userData = $userDataSet->searchUsers($search, (new SearchParams())->sort(), $page, 15, $mode);

// Return JSON
echo json_encode($userData);