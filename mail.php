<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $admin_email = "profita@mail.io"; // Your email address
    $email = $_POST['email'];
    $message = "Email: " . $email;
    $subject = "Pitch deck request";
    $headers = array(
        'From' => $admin_email,
        'X-Mailer' => 'PHP/' . phpversion()
    );
    $result = mail($admin_email, $subject, $message, $headers);

    if ($result) {
        echo 'Success';
    } else {
        http_response_code(500);
        echo 'Error';
    }
}
