<?php

class CreateDb {

    public $servername;
    public $username;
    public $password;
    public $dbname;
    public $tablename;
    public $con;

    // Class constructor
    public function __construct(
        $dbname = "Subscriptions",
        $tablename = "Emails",
        $servername = "localhost",
        $username = "root",
        $password = ""
    ) {
        $this->dbname = $dbname;
        $this->tablename = $tablename;
        $this->servername = $servername;
        $this->username = $username;
        $this->password = $password;

        // Create connection
        $this->con = mysqli_connect($servername, $username, $password);

        // Check connection
        if(!$this->con) { 
            die("Connection failed:" .mysqli_connect_error());
        }

        // query
        $sql = "CREATE DATABASE IF NOT EXISTS $dbname";

        // Execute query
        if(mysqli_query($this->con, $sql)) {

            $this->con = mysqli_connect($servername, $username, $password, $dbname);

            // sql to create new table
            $sql = "CREATE TABLE IF NOT EXISTs $tablename 
                    (id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
                    email_address VARCHAR(255) NOT NULL,
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
                    );";

            if(!mysqli_query($this->con, $sql)){
                echo "Error creating table:" .mysqli_error($this->con);
            } else {
                return false;
            }
        }
    }
    
    
    // Get data from the database
    public function getData() {
        $sql = "SELECT * FROM $this->tablename";

        $result = mysqli_query($this->con, $sql);

        if(mysqli_num_rows($result) > 0) {
            return $result;
        }
    }

    public function deleteData($id) {
        $sql = "DELETE FROM $this->tablename where id = '$id'";

        if(mysqli_query($this->con, $sql)){
            return true;
        } else {
            return false; 
        }
    }
    
}