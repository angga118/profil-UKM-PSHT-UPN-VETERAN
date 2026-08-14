<?php

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Origin: http://localhost:5173');
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Allow-Headers: Content-Type');
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    exit;
}

header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Credentials: true');
session_start();

function respond(array $data, int $status = 200): never
{
    http_response_code($status);
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit;
}

function request_data(): array
{
    $data = json_decode((string) file_get_contents('php://input'), true);
    if (!is_array($data)) {
        respond(['message' => 'Data permintaan tidak valid.'], 400);
    }
    return $data;
}

function database(): PDO
{
    static $connection = null;
    if ($connection instanceof PDO) return $connection;

    $config = require __DIR__ . '/config.php';
    $dsn = sprintf('mysql:host=%s;dbname=%s;charset=utf8mb4', $config['host'], $config['database']);
    $connection = new PDO($dsn, $config['username'], $config['password'], [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);
    return $connection;
}

function require_admin(): void
{
    if (empty($_SESSION['admin_id'])) {
        respond(['message' => 'Silakan login sebagai admin.'], 401);
    }
}
