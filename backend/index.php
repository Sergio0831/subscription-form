<?php

require_once("./CreateDb.php");

// Create instance of Createdb class
$database = new CreateDB();
$subscriptions = $database->getData();
//$subscriptions = mysqli_fetch_assoc($result);
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
    <button type="submit" form="export" value="Export" name="export">Export to CSV</button>
    <table border="1px" >
        <tr>
            <th>Id</th>
            <th>Email Address:</th>
            <th>Created At:</th>
            <th>Action</th>
        </tr>
        <?php
        $i = 1;
        if(!empty($subscriptions)) {
            foreach ($subscriptions as $subscription) { 
                $subscriptionId = $subscription['id'];
                $subscriptionEmail = htmlentities($subscription['email_address']);
                $subscriptionCreatedAt = date_format(date_create($subscription['created_at']), 'd-m-Y');
                ?>
                <tr>
                    <td><?php echo $i++; ?></td>
                    <td>
                    <form action="" method="post" style="display: inline-block;" id="export">
                        <input type="checkbox" name="email_export[]" value=<?php echo $subscriptionEmail; ?>>
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
        }
        ?>
    </table>
</body>
</html>