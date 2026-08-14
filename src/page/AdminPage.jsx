import { useState } from 'react'

const emptyGalleryItem = { title: '', date: '', image: '' }
const emptyLeader = { name: '', period: '', note: '' }
const emptyAchievement = { event: '', year: '', result: '' }
const emptyTimeline = { year: '', title: '', text: '' }
const emptySchedule = { day: '', time: '', focus: '', text: '' }
const emptyHighlight = { title: '', text: '' }

function AdminPage({ content, onBack, onSave, onReset }) {
  const [draft, setDraft] = useState(content)
  const [notice, setNotice] = useState('')

  const updateSection = (section, field, value) => {
    setDraft((current) => ({ ...current, [section]: { ...current[section], [field]: value } }))
  }

  const updateGalleryItem = (index, field, value) => {
    setDraft((current) => ({
      ...current,
      gallery: current.gallery.map((item, itemIndex) => itemIndex === index ? { ...item, [field]: value } : item),
    }))
  }

  const updateListItem = (section, index, field, value) => {
    setDraft((current) => ({
      ...current,
      [section]: current[section].map((item, itemIndex) => itemIndex === index ? { ...item, [field]: value } : item),
    }))
  }

  const addListItem = (section, item) => {
    setDraft((current) => ({ ...current, [section]: [...current[section], item] }))
  }

  const removeListItem = (section, index) => {
    setDraft((current) => ({ ...current, [section]: current[section].filter((_, itemIndex) => itemIndex !== index) }))
  }

  const updateDetailItem = (section, list, index, field, value) => {
    setDraft((current) => ({
      ...current,
      [section]: {
        ...current[section],
        [list]: current[section][list].map((item, itemIndex) => itemIndex === index ? { ...item, [field]: value } : item),
      },
    }))
  }

  const addDetailItem = (section, list, item) => {
    setDraft((current) => ({ ...current, [section]: { ...current[section], [list]: [...current[section][list], item] } }))
  }

  const removeDetailItem = (section, list, index) => {
    setDraft((current) => ({ ...current, [section]: { ...current[section], [list]: current[section][list].filter((_, itemIndex) => itemIndex !== index) } }))
  }

  const handleImageChange = (event, index) => {
    const [file] = event.target.files
    if (!file) return
    if (file.size > 1_500_000) {
      setNotice('Foto maksimal 1,5 MB agar penyimpanan browser tetap aman.')
      event.target.value = ''
      return
    }

    const reader = new FileReader()
    reader.onload = () => updateGalleryItem(index, 'image', reader.result)
    reader.readAsDataURL(file)
  }

  const handleSave = (event) => {
    event.preventDefault()
    if (draft.gallery.some((item) => !item.title.trim() || !item.image)) {
      setNotice('Setiap foto galeri harus memiliki judul dan file gambar.')
      return
    }
    if (draft.leaders.some((item) => !item.name.trim() || !item.period.trim()) || draft.achievements.some((item) => !item.event.trim() || !item.year.trim() || !item.result.trim())) {
      setNotice('Lengkapi nama dan periode ketua, serta seluruh data prestasi.')
      return
    }
    onSave(draft)
    setNotice('Perubahan berhasil disimpan dan langsung tampil di website.')
  }

  const removeGalleryItem = (index) => {
    if (draft.gallery.length === 1) {
      setNotice('Sisakan minimal satu foto pada galeri.')
      return
    }
    setDraft((current) => ({ ...current, gallery: current.gallery.filter((_, itemIndex) => itemIndex !== index) }))
  }

  return (
    <main className="admin-page">
      <header className="admin-header">
        <div>
          <p>Pengelolaan konten</p>
          <h1>Dashboard Admin</h1>
          <span>Perbarui narasi dan dokumentasi kegiatan tanpa mengubah kode website.</span>
        </div>
        <a href="#beranda" className="admin-back" onClick={onBack}>← Lihat website</a>
      </header>

      <form className="admin-form" onSubmit={handleSave}>
        <section className="admin-card">
          <h2>Narasi beranda</h2>
          <label>Label kecil<input value={draft.hero.eyebrow} onChange={(event) => updateSection('hero', 'eyebrow', event.target.value)} /></label>
          <label>Judul utama<textarea rows="2" value={draft.hero.title} onChange={(event) => updateSection('hero', 'title', event.target.value)} /></label>
          <label>Narasi utama<textarea rows="3" value={draft.hero.description} onChange={(event) => updateSection('hero', 'description', event.target.value)} /></label>
        </section>

        <section className="admin-card">
          <h2>Sambutan</h2>
          <label>Judul<input value={draft.welcome.title} onChange={(event) => updateSection('welcome', 'title', event.target.value)} /></label>
          <label>Narasi<textarea rows="3" value={draft.welcome.text} onChange={(event) => updateSection('welcome', 'text', event.target.value)} /></label>
        </section>

        <section className="admin-card">
          <div className="admin-section-heading">
            <div><h2>Profil UKM</h2><span>Ubah informasi untuk Sejarah UKM dan Latihan Rutin.</span></div>
          </div>
          <div className="admin-gallery-list">
            {draft.profileCards.map((card, index) => (
              <article className="admin-card-editor" key={card.href}>
                <h3>{card.title}</h3>
                <label>Label<input value={card.eyebrow} onChange={(event) => updateListItem('profileCards', index, 'eyebrow', event.target.value)} /></label>
                <label>Judul<input value={card.title} onChange={(event) => updateListItem('profileCards', index, 'title', event.target.value)} /></label>
                <label>Deskripsi<textarea rows="3" value={card.text} onChange={(event) => updateListItem('profileCards', index, 'text', event.target.value)} /></label>
                <label>Poin informasi <small>Pisahkan setiap poin dengan koma.</small><input value={card.points.join(', ')} onChange={(event) => updateListItem('profileCards', index, 'points', event.target.value.split(',').map((point) => point.trim()).filter(Boolean))} /></label>
              </article>
            ))}
          </div>
        </section>

        <section className="admin-card">
          <div className="admin-section-heading"><div><h2>Isi halaman Sejarah UKM</h2><span>Ubah judul, narasi, dan perjalanan organisasi yang tampil saat “Lihat detail” dipilih.</span></div></div>
          <label>Label<input value={draft.history.eyebrow} onChange={(event) => updateSection('history', 'eyebrow', event.target.value)} /></label>
          <label>Judul halaman<input value={draft.history.title} onChange={(event) => updateSection('history', 'title', event.target.value)} /></label>
          <label>Narasi pembuka<textarea rows="3" value={draft.history.description} onChange={(event) => updateSection('history', 'description', event.target.value)} /></label>
          <div className="admin-section-heading"><h3>Perjalanan organisasi</h3><button type="button" className="admin-secondary" onClick={() => addDetailItem('history', 'timeline', emptyTimeline)}>+ Tambah perjalanan</button></div>
          {draft.history.timeline.map((item, index) => <article className="admin-list-item" key={`${item.year}-${index}`}><label>Tahun<input value={item.year} onChange={(event) => updateDetailItem('history', 'timeline', index, 'year', event.target.value)} /></label><label>Judul<input value={item.title} onChange={(event) => updateDetailItem('history', 'timeline', index, 'title', event.target.value)} /></label><label>Narasi<input value={item.text} onChange={(event) => updateDetailItem('history', 'timeline', index, 'text', event.target.value)} /></label><button type="button" className="admin-remove" onClick={() => removeDetailItem('history', 'timeline', index)}>Hapus</button></article>)}
        </section>

        <section className="admin-card">
          <div className="admin-section-heading"><div><h2>Isi halaman Latihan Rutin</h2><span>Ubah isi halaman detail jadwal dan fokus pembinaan.</span></div></div>
          <label>Label<input value={draft.training.eyebrow} onChange={(event) => updateSection('training', 'eyebrow', event.target.value)} /></label>
          <label>Judul halaman<input value={draft.training.title} onChange={(event) => updateSection('training', 'title', event.target.value)} /></label>
          <label>Narasi pembuka<textarea rows="3" value={draft.training.description} onChange={(event) => updateSection('training', 'description', event.target.value)} /></label>
          <div className="admin-section-heading"><h3>Jadwal latihan</h3><button type="button" className="admin-secondary" onClick={() => addDetailItem('training', 'schedule', emptySchedule)}>+ Tambah jadwal</button></div>
          {draft.training.schedule.map((item, index) => <article className="admin-list-item" key={`${item.day}-${index}`}><label>Hari<input value={item.day} onChange={(event) => updateDetailItem('training', 'schedule', index, 'day', event.target.value)} /></label><label>Jam & fokus<input value={`${item.time} | ${item.focus}`} onChange={(event) => { const [time = '', focus = ''] = event.target.value.split('|'); updateDetailItem('training', 'schedule', index, 'time', time.trim()); updateDetailItem('training', 'schedule', index, 'focus', focus.trim()) }} /></label><label>Narasi<input value={item.text} onChange={(event) => updateDetailItem('training', 'schedule', index, 'text', event.target.value)} /></label><button type="button" className="admin-remove" onClick={() => removeDetailItem('training', 'schedule', index)}>Hapus</button></article>)}
          <div className="admin-section-heading"><h3>Fokus pembinaan</h3><button type="button" className="admin-secondary" onClick={() => addDetailItem('training', 'highlights', emptyHighlight)}>+ Tambah fokus</button></div>
          {draft.training.highlights.map((item, index) => <article className="admin-list-item" key={`${item.title}-${index}`}><label>Judul<input value={item.title} onChange={(event) => updateDetailItem('training', 'highlights', index, 'title', event.target.value)} /></label><label>Narasi<input value={item.text} onChange={(event) => updateDetailItem('training', 'highlights', index, 'text', event.target.value)} /></label><button type="button" className="admin-remove" onClick={() => removeDetailItem('training', 'highlights', index)}>Hapus</button></article>)}
        </section>

        <section className="admin-card">
          <div className="admin-section-heading">
            <div><h2>Daftar ketua UKM</h2><span>Urutkan dari periode terbaru.</span></div>
            <button type="button" className="admin-secondary" onClick={() => addListItem('leaders', emptyLeader)}>+ Tambah ketua</button>
          </div>
          <div className="admin-gallery-list">
            {draft.leaders.map((leader, index) => (
              <article className="admin-list-item" key={`${leader.name}-${index}`}>
                <label>Nama ketua<input value={leader.name} onChange={(event) => updateListItem('leaders', index, 'name', event.target.value)} /></label>
                <label>Periode<input value={leader.period} onChange={(event) => updateListItem('leaders', index, 'period', event.target.value)} /></label>
                <label>Keterangan<input value={leader.note} onChange={(event) => updateListItem('leaders', index, 'note', event.target.value)} /></label>
                <button type="button" className="admin-remove" onClick={() => removeListItem('leaders', index)}>Hapus ketua</button>
              </article>
            ))}
          </div>
        </section>

        <section className="admin-card">
          <div className="admin-section-heading">
            <div><h2>Prestasi anggota dan UKM</h2><span>Tambahkan rekam jejak lomba dan pencapaian terbaru.</span></div>
            <button type="button" className="admin-secondary" onClick={() => addListItem('achievements', emptyAchievement)}>+ Tambah prestasi</button>
          </div>
          <div className="admin-gallery-list">
            {draft.achievements.map((achievement, index) => (
              <article className="admin-list-item" key={`${achievement.event}-${index}`}>
                <label>Nama kejuaraan/prestasi<input value={achievement.event} onChange={(event) => updateListItem('achievements', index, 'event', event.target.value)} /></label>
                <label>Tahun<input value={achievement.year} onChange={(event) => updateListItem('achievements', index, 'year', event.target.value)} /></label>
                <label>Hasil/prestasi<input value={achievement.result} onChange={(event) => updateListItem('achievements', index, 'result', event.target.value)} /></label>
                <button type="button" className="admin-remove" onClick={() => removeListItem('achievements', index)}>Hapus prestasi</button>
              </article>
            ))}
          </div>
        </section>

        <section className="admin-card admin-gallery-card">
          <div className="admin-section-heading">
            <div><h2>Galeri foto</h2><span>Unggah foto JPG, PNG, atau WebP maksimal 1,5 MB.</span></div>
            <button type="button" className="admin-secondary" onClick={() => setDraft((current) => ({ ...current, gallery: [...current.gallery, emptyGalleryItem] }))}>+ Tambah foto</button>
          </div>

          <div className="admin-gallery-list">
            {draft.gallery.map((item, index) => (
              <article className="admin-gallery-item" key={`${index}-${item.image?.slice(0, 24)}`}>
                <div className="admin-image-preview">{item.image ? <img src={item.image} alt="Pratinjau galeri" /> : <span>Belum ada foto</span>}</div>
                <div className="admin-fields">
                  <label>Judul foto<input value={item.title} onChange={(event) => updateGalleryItem(index, 'title', event.target.value)} /></label>
                  <label>Keterangan/tanggal<input value={item.date} onChange={(event) => updateGalleryItem(index, 'date', event.target.value)} /></label>
                  <label>File foto<input type="file" accept="image/png,image/jpeg,image/webp" onChange={(event) => handleImageChange(event, index)} /></label>
                  <button type="button" className="admin-remove" onClick={() => removeGalleryItem(index)}>Hapus foto</button>
                </div>
              </article>
            ))}
          </div>
        </section>

        {notice && <p className="admin-notice" role="status">{notice}</p>}
        <div className="admin-actions">
          <button type="button" className="admin-secondary" onClick={() => { setDraft(onReset()); setNotice('Konten dikembalikan ke versi awal.') }}>Reset ke konten awal</button>
          <button type="submit" className="admin-save">Simpan perubahan</button>
        </div>
      </form>
    </main>
  )
}

export default AdminPage
