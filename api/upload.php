<?php

declare(strict_types=1);
require __DIR__ . '/bootstrap.php';
require_admin();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(['message' => 'Gunakan metode POST.'], 405);
}

if (empty($_FILES['image']) || $_FILES['image']['error'] !== UPLOAD_ERR_OK) {
    respond(['message' => 'File foto tidak ditemukan.'], 422);
}

$file = $_FILES['image'];
if ($file['size'] > 1_500_000) {
    respond(['message' => 'Ukuran foto maksimal 1,5 MB.'], 422);
}

$allowedTypes = ['image/jpeg' => 'jpg', 'image/png' => 'png', 'image/webp' => 'webp'];
$mimeType = mime_content_type($file['tmp_name']);
if (!isset($allowedTypes[$mimeType])) {
    respond(['message' => 'Format foto harus JPG, PNG, atau WebP.'], 422);
}

$uploadDirectory = __DIR__ . '/uploads';
if (!is_dir($uploadDirectory)) mkdir($uploadDirectory, 0755, true);
$filename = bin2hex(random_bytes(16)) . '.' . $allowedTypes[$mimeType];
if (!move_uploaded_file($file['tmp_name'], $uploadDirectory . '/' . $filename)) {
    respond(['message' => 'Foto tidak dapat disimpan.'], 500);
}

respond(['image' => 'api/uploads/' . $filename], 201);
