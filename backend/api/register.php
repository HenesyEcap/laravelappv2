<?php
// Include the database connection
include 'config.php';

// Check if form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve form data
    $username = mysqli_real_escape_string($connection, $_POST['username']);
    $password = mysqli_real_escape_string($connection, $_POST['password']);
    $email = mysqli_real_escape_string($connection, $_POST['email']);

    // Perform basic validation (you can add more complex validation)
    if (empty($username) || empty($password) || empty($email)) {
        echo json_encode(array("success" => false, "message" => "Please fill in all fields."));
    } else {
        // Hash the password
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

        // Prepare and execute SQL query to insert user into database
        $query = "INSERT INTO users (username, password, email) VALUES ('$username', '$hashedPassword', '$email')";
        if (mysqli_query($connection, $query)) {
            echo json_encode(array("success" => true, "message" => "Registration successful."));
        } else {
            echo json_encode(array("success" => false, "message" => "Error: " . mysqli_error($connection)));
        }
    }
} else {
    echo json_encode(array("success" => false, "message" => "Invalid request."));
}
?>
