import heroGroupImg from '../assets/hero-group.jpg'
import kejuaraanImg from '../assets/kejuaraan.jpeg'
import pengesahanImg from '../assets/pengesahan.jpeg'

export const navItems = [
  { label: 'Beranda', href: '#beranda' },
  { label: 'Sejarah', href: '#sejarah' },
  { label: 'Ketua', href: '#ketua' },
  { label: 'Prestasi', href: '#prestasi' },
  { label: 'Galeri', href: '#galeri' },
  { label: 'Kontak', href: '#kontak' },
]

export const profileCards = [
  {
    title: 'Sejarah UKM',
    eyebrow: 'Profil',
    text: 'Narasi berdirinya UKM, nilai persaudaraan, dan perjalanan PSHT di lingkungan UPN "Veteran" Jawa Timur.',
    points: ['Tahun berdiri', 'Tokoh perintis', 'Filosofi latihan'],
    href: '#sejarah',
    detailRoute: '#sejarah-detail',
    image: '',
  },
  {
    title: 'Latihan Rutin',
    eyebrow: 'Kegiatan',
    text: 'Informasi jadwal latihan, lokasi berkumpul, dan agenda pembinaan anggota aktif.',
    points: ['Selasa dan Kamis', 'Pendampingan pelatih', 'Pembinaan fisik dan teknik'],
    href: '#kontak',
    detailRoute: '#latihan-rutin-detail',
    image: '',
  },
]

export const leaders = [
  { name: 'Nama Ketua Saat Ini', period: '2025-2026', note: 'Penguatan kaderisasi dan kegiatan kampus', image: '' },
  { name: 'Nama Ketua Periode Lalu', period: '2024-2025', note: 'Aktivasi latihan rutin dan agenda silaturahmi', image: '' },
  { name: 'Nama Ketua Pendahulu', period: '2023-2024', note: 'Pendataan anggota dan peningkatan prestasi', image: '' },
  { name: 'Nama Ketua Pendahulu', period: '2022-2023', note: 'Regenerasi pengurus dan dokumentasi UKM', image: '' },
]

export const achievements = [
  {
    event: 'Kejuaraan Pencak Silat Mahasiswa',
    year: '2025',
    result: 'Juara 1 Tanding Kelas Putra',
    image: '',
  },
  {
    event: 'Pekan Olahraga Mahasiswa Daerah',
    year: '2024',
    result: 'Medali Perak Kategori Seni Tunggal',
    image: '',
  },
  {
    event: 'Festival UKM Bela Diri UPN',
    year: '2024',
    result: 'Penampilan Terbaik Demonstrasi Jurus',
    image: '',
  },
]

export const gallery = [
  { title: 'Foto kabinet', date: 'Dokumentasi kepengurusan', image: heroGroupImg },
  { title: 'Pengesahan warga baru 2026', date: 'Kegiatan organisasi · 2026', image: pengesahanImg },
  { title: 'Kejuaraan Airlangga Cup 2026', date: 'Kejuaraan · 2026', image: kejuaraanImg },
]

export const contactPopups = {
  whatsapp: {
    title: 'WhatsApp Pengurus',
    text: 'Hubungi pengurus UKM PSHT untuk bertanya jadwal latihan, pendaftaran, atau agenda anggota baru.',
    action: 'Buka WhatsApp',
    href: 'https://wa.me/6281555861168',
    icon: 'whatsapp',
  },
  instagram: {
    title: 'Instagram Resmi',
    text: 'Lihat dokumentasi kegiatan, informasi latihan, dan kabar terbaru dari UKM PSHT UPN.',
    action: 'Buka Instagram',
    href: 'https://www.instagram.com/psht_upn?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
    icon: 'instagram',
  },
}

export const trainingSchedule = [
  {
    day: 'Selasa',
    time: '19.22 WIB',
    focus: 'Dasar teknik dan fisik',
    text: 'Pemanasan, penguatan fisik dasar, serta pendalaman gerak dasar pencak silat untuk anggota baru maupun lama.',
  },
  {
    day: 'Kamis',
    time: '19.22 WIB',
    focus: 'Jurus dan sparring terbimbing',
    text: 'Pendalaman jurus, latihan pasangan, dan sparring ringan dengan pendampingan pelatih untuk menjaga keselamatan latihan.',
  },
]

export const trainingHighlights = [
  {
    title: 'Pendampingan pelatih',
    text: 'Setiap sesi latihan didampingi pelatih dan senior untuk memastikan teknik yang benar dan aman.',
  },
  {
    title: 'Pembinaan fisik dan teknik',
    text: 'Latihan dirancang bertahap, mulai dari kebugaran dasar hingga penguasaan jurus dan teknik pertarungan.',
  },
  {
    title: 'Nilai persaudaraan',
    text: 'Selain teknik, latihan juga menanamkan nilai budi pekerti, kedisiplinan, dan persaudaraan antar anggota.',
  },
]

export const historyTimeline = [
  {
    year: '2018',
    title: 'Awal pembentukan komunitas',
    text: 'Sejumlah mahasiswa mulai membentuk kelompok latihan pencak silat berbasis nilai persaudaraan di lingkungan kampus.',
  },
  {
    year: '2020',
    title: 'Penguatan kegiatan latihan',
    text: 'Latihan rutin, pembinaan teknik, dan kegiatan silaturahmi mulai disusun lebih terarah untuk anggota.',
  },
  {
    year: '2023',
    title: 'Regenerasi kepengurusan',
    text: 'Kepengurusan memperluas dokumentasi kegiatan serta membuka ruang kaderisasi bagi mahasiswa baru.',
  },
  {
    year: 'Sekarang',
    title: 'Pembinaan dan prestasi',
    text: 'UKM terus menjadi wadah latihan, pengembangan karakter, dan partisipasi mahasiswa dalam kegiatan kampus maupun kejuaraan.',
  },
]

export const editableContentDefaults = {
  hero: {
    eyebrow: 'Persaudaraan Setia Hati Terate',
    title: 'UKM PSHT UPN "Veteran" Jawa Timur',
    description: 'Tangguh Dalam Aksi, Unggul Dalam Prestasi',
  },
  welcome: {
    title: 'Selamat Datang',
    text: 'di landing page resmi UKM PSHT UPN "Veteran" Jawa Timur',
  },
  profile: {
    eyebrow: 'Profil UKM',
    title: 'Informasi Utama',
    description: 'Bagian ini merangkum sejarah, kegiatan, kepengurusan, prestasi, dan kontak UKM dalam format ringkas seperti katalog informasi.',
  },
  profileCards,
  history: {
    eyebrow: 'Contoh konten',
    title: 'Sejarah UKM PSHT',
    description: 'Halaman ini adalah dummy. Ganti tahun dan narasinya setelah data organisasi telah dikonfirmasi.',
    timeline: historyTimeline,
  },
  training: {
    eyebrow: 'Kegiatan',
    title: 'Latihan Rutin UKM PSHT',
    description: 'Jadwal dan agenda latihan berikut adalah contoh gambaran umum. Sesuaikan dengan jadwal resmi terbaru dari pengurus UKM.',
    schedule: trainingSchedule,
    highlights: trainingHighlights,
  },
  leaders,
  achievements,
  gallery,
}
