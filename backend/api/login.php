<?php
// Include the database connection
include 'config.php';

// Check if form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve form data
    $username = mysqli_real_escape_string($connection, $_POST['username']);
    $password = mysqli_real_escape_string($connection, $_POST['password']);

    // Fetch user data from database based on username
    $query = "SELECT * FROM users WHERE username='$username'";
    $result = mysqli_query($connection, $query);

    if ($result) {
        // Check if user exists
        if (mysqli_num_rows($result) == 1) {
            $row = mysqli_fetch_assoc($result);
            $hashedPassword = $row['password'];

            // Verify password
            if (password_verify($password, $hashedPassword)) {
                echo json_encode(array("success" => true, "message" => "Login successful."));
            } else {
                echo json_encode(array("success" => false, "message" => "Invalid password."));
            }
        } else {
            echo json_encode(array("success" => false, "message" => "User not found."));
        }
    } else {
        echo json_encode(array("success" => false, "message" => "Error: " . mysqli_error($connection)));
    }
} else {
    echo json_encode(array("success" => false, "message" => "Invalid request."));
}
?>
