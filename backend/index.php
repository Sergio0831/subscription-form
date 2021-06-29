<?php

require_once("./CreateDb.php");

// Create instance of Createdb class
$database = new CreateDB();

if(isset($_POST['export'])) {
    $emails = $_POST['email_export'];

    
   foreach ($emails as $email) {
             echo "Email : ".$email."<br />";
        }
}


if(isset($_POST['search'])) {
    $searchData = $database->con->real_escape_string($_POST['search']);
    $column = $database->con->real_escape_string($_POST['sort']);
    $sql = "SELECT * FROM $database->tablename WHERE $column LIKE '%$searchData%'";
} else {
    $sql = "SELECT * FROM $database->tablename";
    $searchData = "";
}

$subscriptions = mysqli_query($database->con, $sql);
    

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Addresses Table</title>
</head>
<body>

    <!-- Export to CSV button -->
    <button type="submit" form="export" value="Export" name="export">Export to CSV</button>

    <!-- Search bar -->
    <form id="form" action="" method="post">
    <label for="search"></label>
    <input type="search" id="search" name="search" placeholder="Search subscription...">
    <!-- Sorting select -->
    <label for="sort">Sort By</label>
    <select name="sort" id="sort">
        <option value="email_address">Name</option>
        <option value="created_at" selected>Date</option>
    </select>
    <!-- Submit button -->
    <input type="submit" name="submit" value="Search">
    </form>

    <!-- Table -->
    <table border="1px" >
        <tr>
            <th>Id</th>
            <th>Email Address:</th>
            <th>Created At:</th>
            <th>Action</th>
        </tr>
        <?php
        $i = 1; // Variable for row number
        if(!empty($subscriptions)) {
            while ($row = mysqli_fetch_assoc($subscriptions)) { 

                // Data variables
                $subscriptionId = $row['id'];
                $subscriptionEmail = htmlentities($row['email_address']);
                $subscriptionCreatedAt = date_format(date_create($row['created_at']), 'd-m-Y');
                ?>

                <tr>
                    <td><?php echo $i++; ?></td>
                    <td>
                    <form action="" method="post" style="display: inline-block;" id="export">
                    <label for="email-export"></label>
                        <input id="email-export" type="checkbox" name="email_export[]" value=<?php echo $subscriptionEmail; ?>>
                    </form>    
                        <?php echo $subscriptionEmail; ?> 
                    </td>
                    <td>
                        <?php echo $subscriptionCreatedAt; ?>
                    </td>
                    <td>
                    <form action="delete.php" method="POST">
                        <button type="submit" name="delete" value="Delete">Delete</button>
                        <input type="hidden" name="email_id" value=<?php echo $subscriptionId; ?>>
                    </form>    
                    </td>
                </tr>
           <?php }
        } else { ?>
                    <tr>
                        <td>Data not exsist!</td>
                    </tr>
        <?php }
        ?>
    </table>
</body>
</html>