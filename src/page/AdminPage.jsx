import { useState, useEffect } from 'react'

const emptyGalleryItem = { title: '', date: '', image: '' }
const emptyLeader = { name: '', period: '', note: '', image: '' }
const emptyAchievement = { event: '', year: '', result: '' }
const emptyTimeline = { year: '', title: '', text: '' }
const emptySchedule = { day: '', time: '', focus: '', text: '' }
const emptyHighlight = { title: '', text: '' }

function AdminPage({ content, onBack, onSave, onReset, onLogout, adminName }) {
  const [draft, setDraft] = useState(content)
  const [notice, setNotice] = useState('')

  const adminSections = [
    { id: 'admin-leaders', label: 'Ketua' },
    { id: 'admin-achievements', label: 'Prestasi' },
    { id: 'admin-gallery', label: 'Galeri' },
  ]

  const [activeSection, setActiveSection] = useState(adminSections[0].id)

  const scrollToAdmin = (sectionId) => {
    const target = document.getElementById(sectionId)
    if (!target) return
    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setActiveSection(sectionId)
  }

  useEffect(() => {
    const observerOptions = { root: null, rootMargin: '0px 0px -40% 0px', threshold: 0 }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }, observerOptions)

    adminSections.forEach((s) => {
      const el = document.getElementById(s.id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

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

  const handleLeaderImageChange = (event, index) => {
    const [file] = event.target.files
    if (!file) return
    if (file.size > 1_500_000) {
      setNotice('Foto maksimal 1,5 MB agar penyimpanan browser tetap aman.')
      event.target.value = ''
      return
    }

    const reader = new FileReader()
    reader.onload = () => updateListItem('leaders', index, 'image', reader.result)
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
    // Scroll to top so the admin sees the confirmation / top of the page immediately
    window.requestAnimationFrame(() => window.scrollTo({ top: 0, left: 0, behavior: 'auto' }))
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
      <nav className="admin-topbar" aria-label="Admin topbar">
        <div className="admin-topbar-inner">
          <div className="admin-topbar-brand">
            <p>Pengelolaan konten</p>
          </div>

          <ul className="admin-topbar-nav" role="tablist">
            {adminSections.map((s) => (
              <li key={s.id}><button role="tab" aria-selected={activeSection === s.id} type="button" className={activeSection === s.id ? 'active' : ''} onClick={() => scrollToAdmin(s.id)}>{s.label}</button></li>
            ))}
          </ul>
        </div>
      </nav>

      <header className="admin-header">
        <div>
          <p>Pengelolaan konten</p>
          <h1>Dashboard Admin</h1>
        </div>
        <div className="admin-header-actions">
          <button type="button" className="admin-secondary admin-logout" onClick={onLogout}>Logout</button>
          <a href="#beranda" className="admin-back" onClick={onBack}>← Lihat website</a>
        </div>
      </header>

      <form className="admin-form" onSubmit={handleSave}>

        <section id="admin-leaders" className="admin-card">
          <div className="admin-section-heading">
            <div><h2>Daftar ketua UKM</h2><span>Urutkan dari periode terbaru.</span></div>
            <button type="button" className="admin-secondary" onClick={() => addListItem('leaders', emptyLeader)}>+ Tambah ketua</button>
          </div>
          <div className="admin-gallery-list">
            {draft.leaders.map((leader, index) => (
              <article className="admin-list-item" key={`leader-${index}`}>
                <div className="admin-image-preview">{leader.image ? <img src={leader.image} alt="Pratinjau foto ketua" /> : <div aria-hidden="true" style={{ background: '#ffffff', width: 120, height: 80 }} />}</div>
                <div className="admin-fields">
                  <label>Nama ketua<input value={leader.name} onChange={(event) => updateListItem('leaders', index, 'name', event.target.value)} /></label>
                  <label>Periode<input value={leader.period} onChange={(event) => updateListItem('leaders', index, 'period', event.target.value)} /></label>
                  <label>Keterangan<input value={leader.note} onChange={(event) => updateListItem('leaders', index, 'note', event.target.value)} /></label>
                  <label>File foto<input type="file" accept="image/png,image/jpeg,image/webp" onChange={(event) => handleLeaderImageChange(event, index)} /></label>
                  <button type="button" className="admin-remove" onClick={() => removeListItem('leaders', index)}>Hapus ketua</button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="admin-achievements" className="admin-card">
          <div className="admin-section-heading">
            <div><h2>Prestasi anggota dan UKM</h2><span>Tambahkan rekam jejak lomba dan pencapaian terbaru.</span></div>
            <button type="button" className="admin-secondary" onClick={() => addListItem('achievements', emptyAchievement)}>+ Tambah prestasi</button>
          </div>
          <div className="admin-gallery-list">
            {draft.achievements.map((achievement, index) => (
              <article className="admin-list-item" key={`achievement-${index}`}>
                <label>Nama kejuaraan/prestasi<input value={achievement.event} onChange={(event) => updateListItem('achievements', index, 'event', event.target.value)} /></label>
                <label>Tahun<input value={achievement.year} onChange={(event) => updateListItem('achievements', index, 'year', event.target.value)} /></label>
                <label>Hasil/prestasi<input value={achievement.result} onChange={(event) => updateListItem('achievements', index, 'result', event.target.value)} /></label>
                <button type="button" className="admin-remove" onClick={() => removeListItem('achievements', index)}>Hapus prestasi</button>
              </article>
            ))}
          </div>
        </section>

        <section id="admin-gallery" className="admin-card admin-gallery-card">
          <div className="admin-section-heading">
            <div><h2>Galeri foto</h2><span>Unggah foto JPG, PNG, atau WebP maksimal 1,5 MB.</span></div>
            <button type="button" className="admin-secondary" onClick={() => setDraft((current) => ({ ...current, gallery: [...current.gallery, emptyGalleryItem] }))}>+ Tambah foto</button>
          </div>

          <div className="admin-gallery-list">
            {draft.gallery.map((item, index) => (
              <article className="admin-gallery-item" key={`gallery-item-${index}`}>
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
