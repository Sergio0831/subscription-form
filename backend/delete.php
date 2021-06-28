<?php 

include "CreateDb.php";
$database = new CreateDb();
$id = $_REQUEST['email_id'];
$delete = $database->deleteData($id);

if ($delete) {
    header('Location: index.php');
} else {
    echo "Error deleting subscription: " . $database->con->error;
}

?>