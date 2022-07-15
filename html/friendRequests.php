<?php

session_start();

// Anti spam
if (isset($_POST["url"]) && $_POST["url"] != '') {
    die();
}

// Ensure user is logged in
if (!isset($_SESSION["id"])) {
    header('Location: login.php');
    exit();
}
require_once ("Models/SearchParams.php");

// Create the $view variable and pagination height and search statement
$view = new stdClass();
$view->footer = [];

// Set CSRF token
$_SESSION["ajaxToken"] = substr(str_shuffle(md5(uniqid(mt_rand(), true))), 0, 20);

require_once ("Views/friendRequests.phtml");
