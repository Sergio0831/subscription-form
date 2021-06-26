<?php

require "CreateDb.php";

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');

$tablename = new CreateDb();

// Insert data into the database
$postdata = file_get_contents("php://input");


if(isset($postdata) && !empty($postdata)) {
    $request = json_decode($postdata);

    print_r($request);

    // Sanitize
    $email_address = $request->subscription;

    // Strore
    $sql = "INSERT INTO $tablename->tablename(`email_address`) VALUES ('{$email_address}')";

    
    if(mysqli_query($tablename->con, $sql)) {
        http_response_code(201);
    } else {
        http_response_code(422);
        
    }
   
}
