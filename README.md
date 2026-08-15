# Profil UKM PSHT UPN "Veteran" Jawa Timur

Landing page resmi untuk memperkenalkan Unit Kegiatan Mahasiswa (UKM) Persaudaraan Setia Hati Terate (PSHT) di UPN "Veteran" Jawa Timur. Situs ini memuat sejarah organisasi, jadwal latihan rutin, daftar ketua, prestasi, galeri kegiatan, hingga informasi kontak untuk pendaftaran anggota baru — lengkap dengan panel admin untuk mengelola seluruh konten tanpa perlu mengubah kode.

## Fitur

- **Beranda** — tampilan awal (hero section) dengan pengenalan singkat UKM
- **Profil UKM** — ringkasan kartu informasi yang mengarah ke halaman detail sejarah dan latihan rutin
- **Sejarah** — narasi berdirinya UKM, nilai persaudaraan, dan lini masa perjalanan organisasi
- **Latihan Rutin** — jadwal, fokus latihan, dan hal-hal unggulan dari sesi pembinaan
- **Ketua** — daftar ketua UKM dari periode ke periode
- **Prestasi** — daftar pencapaian dan penghargaan yang pernah diraih
- **Galeri** — dokumentasi kegiatan dalam bentuk slider dan lightbox (latihan rutin, pengesahan anggota, kejuaraan, silaturahmi alumni)
- **Kontak** — tautan cepat ke WhatsApp pengurus dan Instagram resmi
- **Panel Admin** — halaman login (`#admin`) dan dashboard untuk mengelola seluruh konten situs (teks, jadwal, ketua, prestasi, galeri) serta mengunggah foto, tersimpan langsung ke database

## Teknologi

**Frontend**

- [React](https://react.dev/) 19
- [Vite](https://vite.dev/) sebagai build tool
- [Tailwind CSS](https://tailwindcss.com/) untuk styling
- [ESLint](https://eslint.org/) untuk linting kode

**Backend**

- PHP (native, tanpa framework) sebagai REST API sederhana di folder `api/`
- MySQL/MariaDB sebagai basis data (direkomendasikan menjalankan lewat XAMPP)
- Autentikasi admin berbasis sesi PHP (`password_hash`/`password_verify`)

## Menjalankan Proyek Secara Lokal

Proyek ini terdiri dari dua bagian yang perlu dijalankan bersamaan: **frontend React** dan **backend PHP + MySQL**. Panduan lengkap backend juga tersedia di [`database/XAMPP-SETUP.md`](database/XAMPP-SETUP.md).

### 1. Frontend

Pastikan [Node.js](https://nodejs.org/) sudah terpasang, lalu jalankan:

```bash
# clone repositori
git clone https://github.com/angga118/profil-UKM-PSHT-UPN-VETERAN.git
cd profil-UKM-PSHT-UPN-VETERAN

# instal dependensi
npm install

# jalankan mode pengembangan
npm run dev
```

Situs akan berjalan di `http://localhost:5173` (port dapat berbeda tergantung ketersediaan).

### 2. Backend (API + Database)

Backend memakai PHP native dan MySQL, cara termudah adalah lewat [XAMPP](https://www.apachefriends.org/):

1. Jalankan **Apache** dan **MySQL** dari XAMPP Control Panel.
2. Buka `http://localhost/phpmyadmin`, lalu **Import** file [`database/profil_ukm_psht.sql`](database/profil_ukm_psht.sql). Database yang terbentuk bernama `profil_ukm_psht`.
3. Salin folder proyek ini ke `C:\xampp\htdocs\ukm-psht`.
4. Buat akun admin pertama dengan mengirim POST JSON satu kali ke `http://localhost/ukm-psht/api/setup_admin.php`:

   ```json
   { "username": "admin", "password": "ganti-password-aman" }
   ```

5. Konfigurasi koneksi database ada di `api/config.php` (default: MySQL `root` tanpa password). Jika berbeda, atur environment variable `PSHT_DB_HOST`, `PSHT_DB_NAME`, `PSHT_DB_USER`, dan `PSHT_DB_PASSWORD` pada Apache.
6. Pastikan folder `api/uploads` dapat ditulis oleh Apache agar unggah foto berjalan.

Setelah backend aktif, buka `http://localhost:5173/#admin` untuk login ke panel admin.

### Script yang Tersedia

| Perintah          | Keterangan                                  |
| ------------------ | -------------------------------------------- |
| `npm run dev`     | Menjalankan server pengembangan (dengan HMR) |
| `npm run build`   | Membuat build produksi ke folder `dist`     |
| `npm run preview` | Melihat pratinjau hasil build produksi       |
| `npm run lint`    | Menjalankan pengecekan ESLint                |

## Struktur Proyek

```
├── api/                  # Backend PHP (REST API sederhana)
│   ├── auth.php            # Login/logout admin
│   ├── bootstrap.php       # Konfigurasi CORS, sesi, koneksi DB
│   ├── config.php          # Kredensial database
│   ├── content.php         # CRUD konten situs (hero, sejarah, ketua, dll.)
│   ├── setup_admin.php     # Pembuatan akun admin pertama
│   ├── upload.php          # Unggah foto galeri/konten
│   └── uploads/             # Hasil unggahan foto
├── database/
│   ├── XAMPP-SETUP.md       # Panduan setup database via XAMPP
│   └── profil_ukm_psht.sql  # Skema dan seed database
├── public/               # Aset statis (favicon, ikon, gambar OG)
├── src/
│   ├── assets/              # Gambar dan logo
│   ├── components/          # Komponen UI (Header, Hero, Gallery, dll.)
│   ├── data/                 # Data statis/fallback situs
│   ├── hooks/                 # Custom hooks (routing hash, konten, scroll, dll.)
│   ├── page/                   # Halaman (Sejarah, Latihan Rutin, Admin, Login Admin)
│   ├── App.jsx                  # Komponen utama halaman
│   ├── App.css                   # Styling komponen utama
│   ├── index.css                  # Styling global
│   └── main.jsx                    # Entry point aplikasi React
├── index.html
├── package.json
└── vite.config.js
```

## Kontak

- **WhatsApp**: hubungi pengurus UKM melalui tautan yang tersedia di situs
- **Instagram**: [@psht_upn](https://www.instagram.com/psht_upn)

## Kontribusi

Kontribusi berupa perbaikan bug, penambahan fitur, atau pembaruan konten sangat terbuka. Silakan buat *fork*, lakukan perubahan pada *branch* baru, lalu ajukan *pull request*.

## Lisensi

Proyek ini dibuat untuk keperluan internal UKM PSHT UPN "Veteran" Jawa Timur.
