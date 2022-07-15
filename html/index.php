<?php

session_start();

require_once ("Models/SearchParams.php");

// Anti spam
if (isset($_POST["url"]) && $_POST["url"] != '') {
    die();
}

$view = new stdClass();
$view->footer = [];

// Set CSRF token
$_SESSION["ajaxToken"] = substr(str_shuffle(md5(uniqid(mt_rand(), true))), 0, 20);

require_once("Views/home.phtml");