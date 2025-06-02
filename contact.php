<?php
header('Content-Type: application/json');

// Get form data
$data = json_decode(file_get_contents('php://input'), true);

// Validate input
if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'message' => 'Invalid email address']);
    exit;
}

// Prepare email
$to = 'schaganty@advisystems.com';
$subject = 'New Contact Form Submission - ' . $data['subject'];
$message = "Name: " . $data['name'] . "\n";
$message .= "Email: " . $data['email'] . "\n";
$message .= "Subject: " . $data['subject'] . "\n\n";
$message .= "Message:\n" . $data['message'];

$headers = "From: " . $data['email'] . "\r\n";
$headers .= "Reply-To: " . $data['email'] . "\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// Send email
if (mail($to, $subject, $message, $headers)) {
    // Log the contact in a database or file
    $log = date('Y-m-d H:i:s') . " - New contact from: " . $data['email'] . "\n";
    file_put_contents('contact_log.txt', $log, FILE_APPEND);
    
    echo json_encode(['success' => true, 'message' => 'Thank you for your message. We will get back to you soon.']);
} else {
    echo json_encode(['success' => false, 'message' => 'Failed to send message. Please try again later.']);
}
?> 