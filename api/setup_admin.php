<?php

declare(strict_types=1);
require __DIR__ . '/bootstrap.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(['message' => 'Gunakan metode POST.'], 405);
}

$data = request_data();
$username = trim((string) ($data['username'] ?? ''));
$password = (string) ($data['password'] ?? '');

if (strlen($username) < 4 || strlen($password) < 8) {
    respond(['message' => 'Username minimal 4 karakter dan password minimal 8 karakter.'], 422);
}

$db = database();
if ((int) $db->query('SELECT COUNT(*) FROM admin_users')->fetchColumn() > 0) {
    respond(['message' => 'Admin sudah dibuat. Gunakan halaman login.'], 403);
}

$statement = $db->prepare('INSERT INTO admin_users (username, password_hash) VALUES (?, ?)');
$statement->execute([$username, password_hash($password, PASSWORD_DEFAULT)]);
respond(['message' => 'Admin berhasil dibuat.'], 201);
