<?php
// Database configuration constants
define('DB_SERVER', 'localhost'); // Change this if your database server is different
define('DB_USERNAME', 'root'); // Change this if your MySQL username is different
define('DB_PASSWORD', ''); // Change this if your MySQL password is set
define('DB_NAME', 'expo_db'); // Replace with your database name

// Establishing connection to the database
$connection = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);

// Check connection
if ($connection === false) {
    die("ERROR: Connection failed: " . mysqli_connect_error());
}
?>
