<?php
include 'config.php';

// Test the connection
if ($connection) {
    echo "Connected successfully!";
} else {
    echo "Connection failed: " . mysqli_connect_error();
}
?>
