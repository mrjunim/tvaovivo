<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = htmlspecialchars($_POST["username"]);
    $message = htmlspecialchars($_POST["message"]);
    $data = "<li><strong>$username:</strong> $message</li>\n";
    file_put_contents("chat.txt", $data, FILE_APPEND);
}
?>