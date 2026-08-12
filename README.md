# Profil UKM PSHT UPN "Veteran" Jawa Timur

Landing page resmi untuk memperkenalkan Unit Kegiatan Mahasiswa (UKM) Persaudaraan Setia Hati Terate (PSHT) di UPN "Veteran" Jawa Timur. Situs ini memuat sejarah organisasi, daftar ketua, prestasi, galeri kegiatan, hingga informasi kontak untuk pendaftaran anggota baru.

## Fitur

- **Beranda** — tampilan awal (hero section) dengan pengenalan singkat UKM
- **Sejarah** — narasi berdirinya UKM, nilai persaudaraan, dan filosofi latihan
- **Ketua** — daftar ketua UKM dari periode ke periode
- **Prestasi** — daftar pencapaian dan penghargaan yang pernah diraih
- **Galeri** — dokumentasi kegiatan (latihan rutin, pengesahan anggota, kejuaraan, silaturahmi alumni)
- **Kontak** — tautan cepat ke WhatsApp pengurus dan Instagram resmi

## Teknologi

Proyek ini dibangun menggunakan:

- [React](https://react.dev/) 19
- [Vite](https://vite.dev/) sebagai build tool
- [Tailwind CSS](https://tailwindcss.com/) untuk styling
- [ESLint](https://eslint.org/) untuk linting kode

## Menjalankan Proyek Secara Lokal

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

### Script yang Tersedia

| Perintah          | Keterangan                                  |
| ------------------ | -------------------------------------------- |
| `npm run dev`     | Menjalankan server pengembangan (dengan HMR) |
| `npm run build`   | Membuat build produksi ke folder `dist`     |
| `npm run preview` | Melihat pratinjau hasil build produksi       |
| `npm run lint`    | Menjalankan pengecekan ESLint                |

## Struktur Proyek

```
├── public/            # Aset statis (favicon, ikon)
├── src/
│   ├── assets/         # Gambar dan logo
│   ├── App.jsx         # Komponen utama halaman
│   ├── App.css          # Styling komponen utama
│   ├── index.css        # Styling global
│   └── main.jsx          # Entry point aplikasi React
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
