<?php

declare(strict_types=1);
require __DIR__ . '/bootstrap.php';

$db = database();

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $contentRows = $db->query('SELECT content_key, content_value FROM site_content')->fetchAll();
    $content = [];
    foreach ($contentRows as $row) {
        $content[$row['content_key']] = json_decode($row['content_value'], true);
    }

    $gallery = $db->query('SELECT id, title, description AS date, image_url AS image FROM gallery_items ORDER BY sort_order, id')->fetchAll();
    respond(['hero' => $content['hero'] ?? null, 'welcome' => $content['welcome'] ?? null, 'gallery' => $gallery]);
}

if ($_SERVER['REQUEST_METHOD'] !== 'PUT') {
    respond(['message' => 'Metode tidak diizinkan.'], 405);
}

require_admin();
$data = request_data();
if (!is_array($data['hero'] ?? null) || !is_array($data['welcome'] ?? null) || !is_array($data['gallery'] ?? null)) {
    respond(['message' => 'Struktur konten tidak valid.'], 422);
}

$db->beginTransaction();
try {
    $contentStatement = $db->prepare(
        'INSERT INTO site_content (content_key, content_value) VALUES (?, ?) ON DUPLICATE KEY UPDATE content_value = VALUES(content_value)'
    );
    $contentStatement->execute(['hero', json_encode($data['hero'], JSON_UNESCAPED_UNICODE)]);
    $contentStatement->execute(['welcome', json_encode($data['welcome'], JSON_UNESCAPED_UNICODE)]);

    $db->exec('DELETE FROM gallery_items');
    $galleryStatement = $db->prepare('INSERT INTO gallery_items (title, description, image_url, sort_order) VALUES (?, ?, ?, ?)');
    foreach ($data['gallery'] as $index => $item) {
        $title = trim((string) ($item['title'] ?? ''));
        $image = trim((string) ($item['image'] ?? ''));
        if ($title === '' || $image === '') {
            throw new InvalidArgumentException('Setiap foto wajib memiliki judul dan file gambar.');
        }
        $galleryStatement->execute([$title, trim((string) ($item['date'] ?? '')), $image, $index]);
    }
    $db->commit();
    respond(['message' => 'Konten berhasil disimpan.']);
} catch (Throwable $error) {
    $db->rollBack();
    respond(['message' => $error->getMessage()], 422);
}
