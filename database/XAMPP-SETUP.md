# Setup XAMPP dan phpMyAdmin

1. Jalankan **Apache** dan **MySQL** dari XAMPP Control Panel.
2. Buka `http://localhost/phpmyadmin`, lalu pilih **Import**.
3. Pilih file `database/profil_ukm_psht.sql` dan tekan **Import**. Database yang dibuat adalah `profil_ukm_psht`.
4. Salin folder proyek ini ke `C:\xampp\htdocs\ukm-psht`.
5. Buka `http://localhost/ukm-psht/api/setup_admin.php` melalui aplikasi API client dan lakukan POST JSON berikut satu kali:

```json
{ "username": "admin", "password": "ganti-password-aman" }
```

Untuk lingkungan XAMPP standar, konfigurasi pada `api/config.php` sudah memakai MySQL `root` tanpa password. Jika konfigurasi MySQL Anda berbeda, set environment variable `PSHT_DB_HOST`, `PSHT_DB_NAME`, `PSHT_DB_USER`, dan `PSHT_DB_PASSWORD` pada Apache.

Folder `api/uploads` harus dapat ditulis Apache agar unggah foto dapat berjalan.
