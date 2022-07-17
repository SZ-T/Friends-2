<?php

session_start();

// Ensure user is logged in
if (!isset($_SESSION["id"])) {
    http_response_code(401);
    exit();
}
set_include_path("..");
require_once ("Models/Friend.php");

// Choose what action the user wants to take
switch ($_GET['action']) {
    case 'accept':
        (new Friend())->accept($_GET["id"], $_SESSION["id"]);
        break;
    case 'reject':
        (new Friend())->delete($_SESSION["id"], $_GET["id"]);
        break;
    case 'request':
        (new Friend())->create($_SESSION["id"], $_GET["id"]);
        break;
}

// Return success
http_response_code(204);