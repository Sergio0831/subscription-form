<?php

include "CreateDb.php";

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');

// Create instance of Createdb class
$database = new CreateDb();

// Insert data into the database
$postdata = file_get_contents("php://input");


if(isset($postdata) && !empty($postdata)) {
    $request = json_decode($postdata);

    // Sanitize
    $email_address = $request->subscription;

    // Strore
    $database->storeData($email_address);
   
}
