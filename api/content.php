<?php

declare(strict_types=1);
require __DIR__ . '/bootstrap.php';

$db = database();

$defaultContent = [
    'hero' => ['eyebrow' => 'Persaudaraan Setia Hati Terate', 'title' => 'UKM PSHT UPN "Veteran" Jawa Timur', 'description' => 'Tangguh Dalam Aksi, Unggul Dalam Prestasi'],
    'welcome' => ['title' => 'Selamat Datang', 'text' => 'di landing page resmi UKM PSHT UPN "Veteran" Jawa Timur'],
    'profile' => ['eyebrow' => 'Profil UKM', 'title' => 'Informasi Utama', 'description' => 'Bagian ini merangkum sejarah, kegiatan, kepengurusan, prestasi, dan kontak UKM dalam format ringkas seperti katalog informasi.'],
    'profileCards' => [
        ['title' => 'Sejarah UKM', 'eyebrow' => 'Profil', 'text' => 'Narasi berdirinya UKM, nilai persaudaraan, dan perjalanan PSHT di lingkungan UPN "Veteran" Jawa Timur.', 'points' => ['Tahun berdiri', 'Tokoh perintis', 'Filosofi latihan'], 'href' => '#sejarah', 'detailRoute' => '#sejarah-detail'],
        ['title' => 'Latihan Rutin', 'eyebrow' => 'Kegiatan', 'text' => 'Informasi jadwal latihan, lokasi berkumpul, dan agenda pembinaan anggota aktif.', 'points' => ['Selasa dan Kamis', 'Pendampingan pelatih', 'Pembinaan fisik dan teknik'], 'href' => '#kontak', 'detailRoute' => '#latihan-rutin-detail'],
    ],
    'history' => ['eyebrow' => 'Sejarah', 'title' => 'Sejarah UKM PSHT', 'description' => 'Perjalanan organisasi dan pembinaan karakter para anggota dari masa ke masa.', 'timeline' => [
        ['year' => '2018', 'title' => 'Awal pembentukan komunitas', 'text' => 'Sejumlah mahasiswa mulai membentuk kelompok latihan pencak silat berbasis nilai persaudaraan di lingkungan kampus.'],
        ['year' => '2020', 'title' => 'Penguatan kegiatan latihan', 'text' => 'Latihan rutin, pembinaan teknik, dan kegiatan silaturahmi mulai disusun lebih terarah untuk anggota.'],
        ['year' => '2023', 'title' => 'Regenerasi kepengurusan', 'text' => 'Kepengurusan memperluas dokumentasi kegiatan serta membuka ruang kaderisasi bagi mahasiswa baru.'],
        ['year' => 'Sekarang', 'title' => 'Pembinaan dan prestasi', 'text' => 'UKM terus menjadi wadah latihan, pengembangan karakter, dan partisipasi mahasiswa dalam kegiatan kampus maupun kejuaraan.'],
    ]],
    'training' => ['eyebrow' => 'Kegiatan', 'title' => 'Latihan Rutin UKM PSHT', 'description' => 'Jadwal dan agenda latihan berikut adalah gambaran umum dari kegiatan pembinaan UKM.', 'schedule' => [
        ['day' => 'Selasa', 'time' => '19.22 WIB', 'focus' => 'Dasar teknik dan fisik', 'text' => 'Pemanasan, penguatan fisik dasar, serta pendalaman gerak dasar pencak silat untuk anggota baru maupun lama.'],
        ['day' => 'Kamis', 'time' => '19.22 WIB', 'focus' => 'Jurus dan sparring terbimbing', 'text' => 'Pendalaman jurus, latihan pasangan, dan sparring ringan dengan pendampingan pelatih untuk menjaga keselamatan latihan.'],
    ], 'highlights' => [
        ['title' => 'Pendampingan pelatih', 'text' => 'Setiap sesi latihan didampingi pelatih dan senior untuk memastikan teknik yang benar dan aman.'],
        ['title' => 'Pembinaan fisik dan teknik', 'text' => 'Latihan dirancang bertahap, mulai dari kebugaran dasar hingga penguasaan jurus dan teknik pertarungan.'],
        ['title' => 'Nilai persaudaraan', 'text' => 'Selain teknik, latihan juga menanamkan nilai budi pekerti, kedisiplinan, dan persaudaraan antar anggota.'],
    ]],
    'leaders' => [
        ['name' => 'Nama Ketua Saat Ini', 'period' => '2025-2026', 'note' => 'Penguatan kaderisasi dan kegiatan kampus'],
        ['name' => 'Nama Ketua Periode Lalu', 'period' => '2024-2025', 'note' => 'Aktivasi latihan rutin dan agenda silaturahmi'],
        ['name' => 'Nama Ketua Pendahulu', 'period' => '2023-2024', 'note' => 'Pendataan anggota dan peningkatan prestasi'],
        ['name' => 'Nama Ketua Pendahulu', 'period' => '2022-2023', 'note' => 'Regenerasi pengurus dan dokumentasi UKM'],
    ],
    'achievements' => [
        ['event' => 'Kejuaraan Pencak Silat Mahasiswa', 'year' => '2025', 'result' => 'Juara 1 Tanding Kelas Putra'],
        ['event' => 'Pekan Olahraga Mahasiswa Daerah', 'year' => '2024', 'result' => 'Medali Perak Kategori Seni Tunggal'],
        ['event' => 'Festival UKM Bela Diri UPN', 'year' => '2024', 'result' => 'Penampilan Terbaik Demonstrasi Jurus'],
    ],
];

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $contentRows = $db->query('SELECT content_key, content_value FROM site_content')->fetchAll();
    $content = [];
    foreach ($contentRows as $row) {
        $decoded = json_decode((string) $row['content_value'], true);
        if (is_array($decoded)) {
            $content[$row['content_key']] = $decoded;
        }
    }

    $gallery = $db->query('SELECT id, title, description AS date, image_url AS image FROM gallery_items ORDER BY sort_order, id')->fetchAll();
    $payload = [
        'hero' => $content['hero'] ?? $defaultContent['hero'],
        'welcome' => $content['welcome'] ?? $defaultContent['welcome'],
        'profile' => $content['profile'] ?? $defaultContent['profile'],
        'profileCards' => $content['profileCards'] ?? $defaultContent['profileCards'],
        'history' => $content['history'] ?? $defaultContent['history'],
        'training' => $content['training'] ?? $defaultContent['training'],
        'leaders' => $content['leaders'] ?? $defaultContent['leaders'],
        'achievements' => $content['achievements'] ?? $defaultContent['achievements'],
        'gallery' => $gallery ?: $defaultContent['gallery'] ?? [],
    ];

    respond($payload);
}

if ($_SERVER['REQUEST_METHOD'] !== 'PUT') {
    respond(['message' => 'Metode tidak diizinkan.'], 405);
}

require_admin();
$data = request_data();
$requiredKeys = ['hero', 'welcome', 'profile', 'profileCards', 'history', 'training', 'leaders', 'achievements'];
foreach ($requiredKeys as $key) {
    if (!array_key_exists($key, $data)) {
        respond(['message' => 'Struktur konten tidak valid.'], 422);
    }
}

if (!is_array($data['hero'] ?? null) || !is_array($data['welcome'] ?? null) || !is_array($data['profile'] ?? null) || !is_array($data['history'] ?? null) || !is_array($data['training'] ?? null) || !is_array($data['profileCards'] ?? null) || !is_array($data['leaders'] ?? null) || !is_array($data['achievements'] ?? null) || !is_array($data['gallery'] ?? null)) {
    respond(['message' => 'Struktur konten tidak valid.'], 422);
}

$db->beginTransaction();
try {
    $contentStatement = $db->prepare(
        'INSERT INTO site_content (content_key, content_value) VALUES (?, ?) ON DUPLICATE KEY UPDATE content_value = VALUES(content_value)'
    );

    foreach ($requiredKeys as $key) {
        $contentStatement->execute([$key, json_encode($data[$key], JSON_UNESCAPED_UNICODE)]);
    }

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
