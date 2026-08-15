<?php

declare(strict_types=1);
require __DIR__ . '/bootstrap.php';

$db = database();

// Return current values for history/training
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $filePath = __DIR__ . '/../data/sections_history_training.json';
    $payload = [];

    // Prefer file-based sections if present (history & training stored to file per request)
    if (file_exists($filePath)) {
        $decoded = json_decode((string) file_get_contents($filePath), true);
        if (is_array($decoded)) {
            $payload = $decoded;
        }
    } else {
        // Fallback to DB-stored content if file not present
        $rows = $db->query("SELECT content_key, content_value FROM site_content WHERE content_key IN ('history','training')")->fetchAll();
        foreach ($rows as $row) {
            $decoded = json_decode((string) $row['content_value'], true);
            if (is_array($decoded)) {
                $payload[$row['content_key']] = $decoded;
            }
        }
    }

    // Ensure keys exist (empty structures if missing)
    if (!array_key_exists('history', $payload)) {
        $payload['history'] = ['eyebrow' => 'Sejarah', 'title' => '', 'description' => '', 'timeline' => []];
    }
    if (!array_key_exists('training', $payload)) {
        $payload['training'] = ['eyebrow' => 'Kegiatan', 'title' => '', 'description' => '', 'schedule' => [], 'highlights' => []];
    }

    respond($payload);
}

if ($_SERVER['REQUEST_METHOD'] !== 'PUT') {
    respond(['message' => 'Metode tidak diizinkan. Gunakan GET atau PUT.'], 405);
}

// Only admins may update
require_admin();

$data = request_data();
$allowedKeys = ['history', 'training'];
$updates = [];
foreach ($allowedKeys as $k) {
    if (array_key_exists($k, $data)) {
        $updates[$k] = $data[$k];
    }
}

if (empty($updates)) {
    respond(['message' => 'Tidak ada kunci yang valid untuk diperbarui. Sertakan "history" dan/atau "training" di body JSON.'], 422);
}

// Validate types
foreach ($updates as $key => $value) {
    if (!is_array($value)) {
        respond(['message' => "Nilai untuk \"$key\" harus berupa objek/array."], 422);
    }
}

// Save to a file so history & training do NOT go into the database
$filePath = __DIR__ . '/../data/sections_history_training.json';
$existing = [];
if (file_exists($filePath)) {
    $existing = json_decode((string) file_get_contents($filePath), true) ?: [];
}
foreach ($updates as $key => $value) {
    $existing[$key] = $value; // replace the whole section
}
$dir = dirname($filePath);
if (!is_dir($dir)) {
    mkdir($dir, 0755, true);
}
if (false === file_put_contents($filePath, json_encode($existing, JSON_UNESCAPED_UNICODE|JSON_PRETTY_PRINT))) {
    respond(['message' => 'Gagal menyimpan file.'], 500);
}
respond(['message' => 'Bagian berhasil diperbarui (disimpan ke file).', 'updated' => array_keys($updates)]);

