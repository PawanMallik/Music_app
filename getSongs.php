<?php
$mysqli = new mysqli("localhost", "root", "", "music_db");
if ($mysqli->connect_errno) {
  echo json_encode(["error" => "DB connection failed: " . $mysqli->connect_error]);
  exit();
}

$result = $mysqli->query("SELECT * FROM songs");
$songs = [];

while ($row = $result->fetch_assoc()) {
  $songs[] = $row;
}

echo json_encode($songs);
?>
