<?php

require_once("./CreateDb.php");

// Create instance of Createdb class
$database = new CreateDB();
$filename = "subscriptions.csv";
$i = 1;

if(isset($_POST['export'])) {

    // Download
    header('Content-Description: File Transfer');
    header('Content-Disposition: attachment; filename='.$filename);
    header('Content-Type: application/csv; charset=utf-8');

    $file = fopen("php://output", "w");
    fputcsv($file, array("Id", "Email Address", "Created At"));

    $sql = "SELECT * FROM $database->tablename";
    $subscriptions = mysqli_query($database->con, $sql);

    while ($row = mysqli_fetch_assoc($subscriptions)) { 
        $subscription_number = $i++;
        $subscription_email = $row['email_address'];
        $subscription_created_at = date_format(date_create($row['created_at']), 'd-m-Y');

        fputcsv($file, array($subscription_number, $subscription_email, $subscription_created_at));
    }
    fclose($file);
}



