<?php

declare(strict_types=1);
require __DIR__ . '/bootstrap.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    respond(['authenticated' => !empty($_SESSION['admin_id']), 'username' => $_SESSION['admin_username'] ?? null]);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(['message' => 'Metode tidak diizinkan.'], 405);
}

$data = request_data();
$action = $data['action'] ?? 'login';
if ($action === 'logout') {
    session_unset();
    session_destroy();
    respond(['message' => 'Anda sudah logout.']);
}

$statement = database()->prepare('SELECT id, username, password_hash FROM admin_users WHERE username = ? LIMIT 1');
$statement->execute([trim((string) ($data['username'] ?? ''))]);
$admin = $statement->fetch();

if (!$admin || !password_verify((string) ($data['password'] ?? ''), $admin['password_hash'])) {
    respond(['message' => 'Username atau password salah.'], 401);
}

session_regenerate_id(true);
$_SESSION['admin_id'] = $admin['id'];
$_SESSION['admin_username'] = $admin['username'];
respond(['authenticated' => true, 'username' => $admin['username']]);
