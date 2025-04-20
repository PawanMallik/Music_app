<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// DB connection
$mysqli = new mysqli("localhost", "root", "", "music_db");
if ($mysqli->connect_errno) {
    die("Failed to connect to MySQL: " . $mysqli->connect_error);
}

// Get form data
$title = $_POST['title'] ?? '';
$artist = $_POST['artist'] ?? '';
// $lyrics = $_POST['lyrics'] ?? '';

// Check if files are received
if (!isset($_FILES['song']) || !isset($_FILES['cover'])) {
    die("No file(s) uploaded.");
}

$songFile = $_FILES['song'];
$coverFile = $_FILES['cover'];

// Create folders if they don't exist
if (!is_dir(__DIR__ . "/songs")) mkdir(__DIR__ . "/songs", 0755, true);
if (!is_dir(__DIR__ . "/covers")) mkdir(__DIR__ . "/covers", 0755, true);

// Define paths
$songPath = "assets/songs/" . basename($songFile['name']);
$coverPath = "assets/covers/" . basename($coverFile['name']);

// Move files to correct location
move_uploaded_file($songFile['tmp_name'], __DIR__ . "/songs/" . basename($songFile['name']));
move_uploaded_file($coverFile['tmp_name'], __DIR__ . "/covers/" . basename($coverFile['name']));

// Insert into DB
$stmt = $mysqli->prepare("INSERT INTO songs (title, artist, src, cover) VALUES (?, ?, ?, ?)");
$stmt->bind_param("sssss", $title, $artist, $songPath, $coverPath);
$stmt->execute();

echo "✅ Song uploaded successfully!";
?>
