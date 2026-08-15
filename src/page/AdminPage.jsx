import { useState, useEffect } from 'react'

const emptyGalleryItem = { title: '', date: '', image: '' }
const emptyLeader = { name: '', period: '', note: '', image: '' }
const emptyAchievement = { event: '', year: '', result: '' }
const emptyTimeline = { year: '', title: '', text: '' }
const emptySchedule = { day: '', time: '', focus: '', text: '' }
const emptyHighlight = { title: '', text: '' }
const emptyProfileCard = { eyebrow: '', title: '', text: '', points: [], href: '', detailRoute: '' }

function AdminPage({ content, onBack, onSave, onReset, onLogout, adminName }) {
  const [draft, setDraft] = useState(content)
  const [notice, setNotice] = useState('')

  const adminSections = [
    { id: 'admin-history', label: 'Sejarah' },
    { id: 'admin-training', label: 'Latihan Rutin' },
    { id: 'admin-profilecards', label: 'Kartu Profil' },
    { id: 'admin-leaders', label: 'Ketua' },
    { id: 'admin-achievements', label: 'Prestasi' },
    { id: 'admin-gallery', label: 'Galeri' },
  ]

  const [activeSection, setActiveSection] = useState(adminSections[0].id)

  const scrollToAdmin = (sectionId) => {
    const target = document.getElementById(sectionId)
    if (!target) return
    // read CSS variable for topbar height (fallback to 72)
    const computed = getComputedStyle(document.documentElement).getPropertyValue('--admin-topbar-height') || '72px'
    const topbarHeight = parseInt(computed, 10) || 72
    const offset = topbarHeight + 12
    const top = Math.max(0, target.getBoundingClientRect().top + window.scrollY - offset)
    window.scrollTo({ top, behavior: 'smooth' })
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

  // Ensure draft includes history & training so editors don't crash if content defaults were missing
  useEffect(() => {
    setDraft((current) => ({
      ...current,
      history: current.history || { eyebrow: 'Sejarah', title: '', description: '', timeline: [] },
      training: current.training || { eyebrow: 'Kegiatan', title: '', description: '', schedule: [], highlights: [] },
      profileCards: current.profileCards || [emptyProfileCard],
    }))
  }, [content])

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

  const handleSave = async (event) => {
    event.preventDefault()
    if (draft.gallery.some((item) => !item.title.trim() || !item.image)) {
      setNotice('Setiap foto galeri harus memiliki judul dan file gambar.')
      return
    }
    if (draft.leaders.some((item) => !item.name.trim() || !item.period.trim()) || draft.achievements.some((item) => !item.event.trim() || !item.year.trim() || !item.result.trim())) {
      setNotice('Lengkapi nama dan periode ketua, serta seluruh data prestasi.')
      return
    }
    if ((draft.profileCards || []).some((c) => !String(c.title || '').trim() || !String(c.eyebrow || '').trim())) {
      setNotice('Lengkapi judul dan eyebrow untuk setiap kartu profil.')
      return
    }

    // First save history & training to file via the new endpoint so they don't go into DB
    try {
      const resp = await fetch('/ukm-psht/api/update_sections.php', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ history: draft.history, training: draft.training }),
        credentials: 'same-origin',
      })
      const json = await resp.json().catch(() => ({}))
      if (!resp.ok) {
        setNotice('Gagal menyimpan Sejarah/Latihan: ' + (json.message || resp.statusText))
        return
      }
    } catch (err) {
      setNotice('Gagal menyimpan Sejarah/Latihan: ' + (err.message || String(err)))
      return
    }

    // Then save the rest of the site content (content.php will skip history/training when writing to DB)
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

        <section id="admin-history" className="admin-card">
          <div className="admin-section-heading">
            <div><h2>Sejarah</h2><span>Edit narasi dan timeline sejarah UKM.</span></div>
          </div>

          <div className="admin-fields">
            <label>Eyebrow<input value={draft.history?.eyebrow || ''} onChange={(e) => updateSection('history', 'eyebrow', e.target.value)} /></label>
            <label>Judul<input value={draft.history?.title || ''} onChange={(e) => updateSection('history', 'title', e.target.value)} /></label>
            <label>Deskripsi<textarea value={draft.history?.description || ''} onChange={(e) => updateSection('history', 'description', e.target.value)} /></label>
          </div>

          <div className="admin-section-sublist">
            <h3>Timeline</h3>
            {(draft.history?.timeline || []).map((t, idx) => (
              <article className="admin-list-item" key={`history-t-${idx}`}>
                <label>Tahun<input value={t.year} onChange={(ev) => updateDetailItem('history', 'timeline', idx, 'year', ev.target.value)} /></label>
                <label>Judul<input value={t.title} onChange={(ev) => updateDetailItem('history', 'timeline', idx, 'title', ev.target.value)} /></label>
                <label>Deskripsi<textarea value={t.text} onChange={(ev) => updateDetailItem('history', 'timeline', idx, 'text', ev.target.value)} /></label>
                <button type="button" className="admin-remove" onClick={() => removeDetailItem('history', 'timeline', idx)}>Hapus</button>
              </article>
            ))}
            <button type="button" className="admin-secondary" onClick={() => addDetailItem('history', 'timeline', emptyTimeline)}>+ Tambah timeline</button>
          </div>

        </section>

        <section id="admin-training" className="admin-card">
          <div className="admin-section-heading">
            <div><h2>Latihan Rutin</h2><span>Edit jadwal latihan dan highlight.</span></div>
          </div>

          <div className="admin-fields">
            <label>Eyebrow<input value={draft.training?.eyebrow || ''} onChange={(e) => updateSection('training', 'eyebrow', e.target.value)} /></label>
            <label>Judul<input value={draft.training?.title || ''} onChange={(e) => updateSection('training', 'title', e.target.value)} /></label>
            <label>Deskripsi<textarea value={draft.training?.description || ''} onChange={(e) => updateSection('training', 'description', e.target.value)} /></label>
          </div>

          <div className="admin-section-sublist">
            <h3>Jadwal</h3>
            {(draft.training?.schedule || []).map((s, idx) => (
              <article className="admin-list-item" key={`training-s-${idx}`}>
                <label>Hari<input value={s.day} onChange={(ev) => updateDetailItem('training', 'schedule', idx, 'day', ev.target.value)} /></label>
                <label>Waktu<input value={s.time} onChange={(ev) => updateDetailItem('training', 'schedule', idx, 'time', ev.target.value)} /></label>
                <label>Fokus<input value={s.focus} onChange={(ev) => updateDetailItem('training', 'schedule', idx, 'focus', ev.target.value)} /></label>
                <label>Deskripsi<textarea value={s.text} onChange={(ev) => updateDetailItem('training', 'schedule', idx, 'text', ev.target.value)} /></label>
                <button type="button" className="admin-remove" onClick={() => removeDetailItem('training', 'schedule', idx)}>Hapus</button>
              </article>
            ))}
            <button type="button" className="admin-secondary" onClick={() => addDetailItem('training', 'schedule', emptySchedule)}>+ Tambah jadwal</button>
          </div>

          <div className="admin-section-sublist">
            <h3>Highlight</h3>
            {(draft.training?.highlights || []).map((h, idx) => (
              <article className="admin-list-item" key={`training-h-${idx}`}>
                <label>Judul<input value={h.title} onChange={(ev) => updateDetailItem('training', 'highlights', idx, 'title', ev.target.value)} /></label>
                <label>Deskripsi<textarea value={h.text} onChange={(ev) => updateDetailItem('training', 'highlights', idx, 'text', ev.target.value)} /></label>
                <button type="button" className="admin-remove" onClick={() => removeDetailItem('training', 'highlights', idx)}>Hapus</button>
              </article>
            ))}
            <button type="button" className="admin-secondary" onClick={() => addDetailItem('training', 'highlights', emptyHighlight)}>+ Tambah highlight</button>
          </div>

        </section>

        <section id="admin-profilecards" className="admin-card">
          <div className="admin-section-heading">
            <div><h2>Kartu Profil</h2><span>Edit kartu yang tampil pada halaman profil (mis. Sejarah, Latihan).</span></div>
            <button type="button" className="admin-secondary" onClick={() => addListItem('profileCards', emptyProfileCard)}>+ Tambah kartu</button>
          </div>

          <div className="admin-gallery-list">
            {(draft.profileCards || []).map((card, idx) => (
              <article className="admin-list-item" key={`profilecard-${idx}`}>
                <label>Eyebrow<input value={card.eyebrow || ''} onChange={(ev) => updateListItem('profileCards', idx, 'eyebrow', ev.target.value)} /></label>
                <label>Judul<input value={card.title || ''} onChange={(ev) => updateListItem('profileCards', idx, 'title', ev.target.value)} /></label>
                <label>Deskripsi<textarea value={card.text || ''} onChange={(ev) => updateListItem('profileCards', idx, 'text', ev.target.value)} /></label>

                <div className="admin-section-sublist">
                  <h4>Points / Bullets</h4>
                  {(card.points || []).map((p, pidx) => (
                    <div key={`pc-${idx}-p-${pidx}`} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                      <input value={p} onChange={(ev) => {
                        const next = (card.points || []).map((pt, i) => i === pidx ? ev.target.value : pt)
                        updateListItem('profileCards', idx, 'points', next)
                      }} />
                      <button type="button" className="admin-remove" onClick={() => {
                        const next = (card.points || []).filter((_, i) => i !== pidx)
                        updateListItem('profileCards', idx, 'points', next)
                      }}>Hapus</button>
                    </div>
                  ))}
                  <button type="button" className="admin-secondary" onClick={() => updateListItem('profileCards', idx, 'points', [...(card.points || []), ''])}>+ Tambah point</button>
                </div>

                <label>Href (anchor atau route)<input value={card.href || ''} onChange={(ev) => updateListItem('profileCards', idx, 'href', ev.target.value)} /></label>
                <label>Detail route<input value={card.detailRoute || ''} onChange={(ev) => updateListItem('profileCards', idx, 'detailRoute', ev.target.value)} /></label>

                <button type="button" className="admin-remove" onClick={() => removeListItem('profileCards', idx)}>Hapus kartu</button>
              </article>
            ))}
          </div>
        </section>

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
