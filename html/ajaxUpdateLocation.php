<?php

session_start();

// Ensure user is logged in
if (!isset($_SESSION["id"])) {
    die();
}
require_once ("Models/User.php");

$latitude = $_GET['latitude'];
$longitude = $_GET['longitude'];

// Update location in database
$user = new User();
$user->updateLocation($latitude, $longitude);

// Return success
http_response_code(204);