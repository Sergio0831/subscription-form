<?php

require_once("./CreateDb.php");

// Create instance of Createdb class
$database = new CreateDB();

// Pagination
if(isset($_GET['page'])) {
    $page = $_GET['page'];
} else {
    $page = 1;
}

$num_per_page = 10;
$start_from = ($page * $num_per_page) - $num_per_page;

// Display subscriptions and search
if(isset($_POST['search'])) {
    $search_data = $database->con->real_escape_string($_POST['search']);
    $column = $database->con->real_escape_string($_POST['sort']);
    $sql = "SELECT * FROM $database->tablename WHERE $column LIKE '%$search_data%' LIMIT $start_from, $num_per_page";
} else {
    $sql = "SELECT * FROM $database->tablename LIMIT $start_from, $num_per_page";
    $search_data = "";
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
    <form action="export.php" method="POST">
        <input type="submit" value="Export to CSV" name="export">
    </form>

    <!-- Search bar -->
    <form id="form" action="index.php" method="post">
    <label for="search"></label>
    <input type="search" id="search" name="search" placeholder="Search subscription...">
    <!-- Sorting select -->
    <label for="sort">Search By</label>
    <select name="sort" id="sort">
        <option value="email_address">Name</option>
        <option value="created_at" selected>Date</option>
    </select>
    <!-- Submit button -->
    <input type="submit" name="submit" value="Search">
    </form>

    <!-- Table -->
    <table border="1px" >
        <thead>
            <tr>
                <th>Id:</th>
                <th>Email Address:</th>
                <th>Created At:</th>
                <th>Action</th>
            </tr>
        </thead>
            <?php
        $i = 1; // Variable for row number  
        if(!empty($subscriptions)) {
            while ($row = mysqli_fetch_assoc($subscriptions)) { 
                // Data variables
                $subscription_number = $i++;
                $subscription_id = $row['id'];
                $subscription_email = htmlentities($row['email_address']);
                $subscription_created_at = date_format(date_create($row['created_at']), 'd-m-Y');
                
                ?>
                <tbody>
                    <tr>
                        <td><?php echo $subscription_number; ?></td>
                        <td>
                            <?php echo $subscription_email; ?> 
                        </td>
                        <td>
                            <?php echo $subscription_created_at; ?>
                        </td>
                        <td>
                        <form action="delete.php" method="POST">
                            <button type="submit" name="delete" value="Delete">Delete</button>
                            <input type="hidden" name="email_id" value=<?php echo $subscription_id; ?>>
                        </form>    
                        </td>
                    </tr>
           <?php }
        } else { ?>
                        <tr>
                            <td>Data not exsist!</td>
                        </tr>
                    </tbody>
        <?php }
        ?>
        
    </table>
    <?php 
    // Pagination
    $sql = "SELECT * FROM $database->tablename";
    $subscriptions = mysqli_query($database->con, $sql);
    $total_subscriptions = mysqli_num_rows($subscriptions);

    $total_page = ceil($total_subscriptions/$num_per_page);
            
    for($i = 1; $i < $total_page + 1; $i++) {
        echo "<a href='?page=".$i."'> $i </a>";
    }

    ?>
</body>
</html>