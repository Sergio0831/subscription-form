<?php 
    header('Access-Control-Allow-Origin: *');


// Reading JSON POST using PHP
$json = file_get_contents('php://input');
$jsonObj = json_decode($json);

// Use $jsonObj
print_r($jsonObj);
?>