import { useState, useEffect } from 'react'

const emptyGalleryItem = { title: '', date: '', image: '' }
const emptyProfileCard = { title: '', eyebrow: '', text: '', points: ['', '', ''], href: '#', detailRoute: '#sejarah-detail', image: '' }
const emptyLeader = { name: '', period: '', note: '', image: '' }
const emptyAchievement = { event: '', year: '', result: '', image: '' }
const emptyTimeline = { year: '', title: '', text: '' }
const emptySchedule = { day: '', time: '', focus: '', text: '' }
const emptyHighlight = { title: '', text: '' }

function AdminPage({ content, onBack, onSave, onReset, onLogout, adminName }) {
  const safeContent = {
    ...content,
    profile: content?.profile ?? { eyebrow: '', title: '', description: '' },
    profileCards: Array.isArray(content?.profileCards) ? content.profileCards : [],
    history: content?.history ?? { eyebrow: '', title: '', description: '', timeline: [] },
    training: content?.training ?? { eyebrow: '', title: '', description: '', schedule: [], highlights: [] },
    gallery: Array.isArray(content?.gallery) ? content.gallery : [],
    leaders: Array.isArray(content?.leaders) ? content.leaders : [],
    achievements: Array.isArray(content?.achievements) ? content.achievements : [],
  }

  const [draft, setDraft] = useState(safeContent)
  const [notice, setNotice] = useState('')

  const adminSections = [
    { id: 'admin-profile', label: 'Profil' },
    { id: 'admin-profile-cards', label: 'Card Profil' },
    { id: 'admin-history', label: 'Sejarah' },
    { id: 'admin-training', label: 'Latihan' },
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

  const updateProfileCard = (index, field, value) => {
    setDraft((current) => ({
      ...current,
      profileCards: current.profileCards.map((card, cardIndex) => cardIndex === index ? { ...card, [field]: value } : card),
    }))
  }

  const updateProfileCardPoint = (cardIndex, pointIndex, value) => {
    setDraft((current) => ({
      ...current,
      profileCards: current.profileCards.map((card, index) => {
        if (index !== cardIndex) return card
        return {
          ...card,
          points: card.points.map((point, pointIndexValue) => pointIndexValue === pointIndex ? value : point),
        }
      }),
    }))
  }

  const updateHistoryItem = (index, field, value) => {
    setDraft((current) => ({
      ...current,
      history: {
        ...current.history,
        timeline: current.history.timeline.map((item, itemIndex) => itemIndex === index ? { ...item, [field]: value } : item),
      },
    }))
  }

  const updateScheduleItem = (index, field, value) => {
    setDraft((current) => ({
      ...current,
      training: {
        ...current.training,
        schedule: current.training.schedule.map((item, itemIndex) => itemIndex === index ? { ...item, [field]: value } : item),
      },
    }))
  }

  const updateHighlightItem = (index, field, value) => {
    setDraft((current) => ({
      ...current,
      training: {
        ...current.training,
        highlights: current.training.highlights.map((item, itemIndex) => itemIndex === index ? { ...item, [field]: value } : item),
      },
    }))
  }

  const addProfileCardPoint = (cardIndex) => {
    setDraft((current) => ({
      ...current,
      profileCards: current.profileCards.map((card, index) => index === cardIndex ? { ...card, points: [...card.points, ''] } : card),
    }))
  }

  const removeProfileCardPoint = (cardIndex, pointIndex) => {
    setDraft((current) => ({
      ...current,
      profileCards: current.profileCards.map((card, index) => {
        if (index !== cardIndex) return card
        const nextPoints = card.points.filter((_, itemIndex) => itemIndex !== pointIndex)
        return {
          ...card,
          points: nextPoints.length > 0 ? nextPoints : [''],
        }
      }),
    }))
  }

  const addHistoryItem = () => {
    setDraft((current) => ({
      ...current,
      history: { ...current.history, timeline: [...current.history.timeline, { ...emptyTimeline }] },
    }))
  }

  const removeHistoryItem = (index) => {
    setDraft((current) => ({
      ...current,
      history: {
        ...current.history,
        timeline: current.history.timeline.filter((_, itemIndex) => itemIndex !== index),
      },
    }))
  }

  const addScheduleItem = () => {
    setDraft((current) => ({
      ...current,
      training: { ...current.training, schedule: [...current.training.schedule, { ...emptySchedule }] },
    }))
  }

  const removeScheduleItem = (index) => {
    setDraft((current) => ({
      ...current,
      training: {
        ...current.training,
        schedule: current.training.schedule.filter((_, itemIndex) => itemIndex !== index),
      },
    }))
  }

  const addHighlightItem = () => {
    setDraft((current) => ({
      ...current,
      training: { ...current.training, highlights: [...current.training.highlights, { ...emptyHighlight }] },
    }))
  }

  const removeHighlightItem = (index) => {
    setDraft((current) => ({
      ...current,
      training: {
        ...current.training,
        highlights: current.training.highlights.filter((_, itemIndex) => itemIndex !== index),
      },
    }))
  }

  const uploadImageFile = async (file) => {
    const formData = new FormData()
    formData.append('image', file)

    const response = await fetch('/api/upload.php', {
      method: 'POST',
      credentials: 'same-origin',
      body: formData,
    })

    const data = await response.json().catch(() => ({}))
    if (!response.ok) {
      throw new Error(data.message || 'Upload foto gagal.')
    }

    return data.image
  }

  const handleImageChange = async (event, index) => {
    const [file] = event.target.files
    if (!file) return
    if (file.size > 1_500_000) {
      setNotice('Foto maksimal 1,5 MB agar penyimpanan browser tetap aman.')
      event.target.value = ''
      return
    }

    try {
      const imageUrl = await uploadImageFile(file)
      updateGalleryItem(index, 'image', imageUrl)
      setNotice('Foto galeri berhasil diunggah.')
    } catch (error) {
      setNotice(error.message)
    } finally {
      event.target.value = ''
    }
  }

  const handleLeaderImageChange = async (event, index) => {
    const [file] = event.target.files
    if (!file) return
    if (file.size > 1_500_000) {
      setNotice('Foto maksimal 1,5 MB agar penyimpanan browser tetap aman.')
      event.target.value = ''
      return
    }

    try {
      const imageUrl = await uploadImageFile(file)
      updateListItem('leaders', index, 'image', imageUrl)
      setNotice('Foto ketua berhasil diunggah.')
    } catch (error) {
      setNotice(error.message)
    } finally {
      event.target.value = ''
    }
  }

  const handleProfileCardImageChange = async (event, index) => {
    const [file] = event.target.files
    if (!file) return
    if (file.size > 1_500_000) {
      setNotice('Foto maksimal 1,5 MB agar penyimpanan browser tetap aman.')
      event.target.value = ''
      return
    }

    try {
      const imageUrl = await uploadImageFile(file)
      updateProfileCard(index, 'image', imageUrl)
      setNotice('Foto card profil berhasil diunggah.')
    } catch (error) {
      setNotice(error.message)
    } finally {
      event.target.value = ''
    }
  }

  const handleAchievementImageChange = async (event, index) => {
    const [file] = event.target.files
    if (!file) return
    if (file.size > 1_500_000) {
      setNotice('Foto maksimal 1,5 MB agar penyimpanan browser tetap aman.')
      event.target.value = ''
      return
    }

    try {
      const imageUrl = await uploadImageFile(file)
      updateListItem('achievements', index, 'image', imageUrl)
      setNotice('Foto prestasi berhasil diunggah.')
    } catch (error) {
      setNotice(error.message)
    } finally {
      event.target.value = ''
    }
  }

  const handleSave = async (event) => {
    event.preventDefault()
    const profile = draft.profile ?? { eyebrow: '', title: '', description: '' }
    const profileCards = Array.isArray(draft.profileCards) ? draft.profileCards : []
    const gallery = Array.isArray(draft.gallery) ? draft.gallery : []
    const leaders = Array.isArray(draft.leaders) ? draft.leaders : []
    const achievements = Array.isArray(draft.achievements) ? draft.achievements : []

    if (!String(profile.eyebrow ?? '').trim() || !String(profile.title ?? '').trim() || !String(profile.description ?? '').trim()) {
      setNotice('Judul dan deskripsi profil UKM wajib diisi.')
      return
    }
    if (profileCards.some((card) => !String(card?.title ?? '').trim() || !String(card?.text ?? '').trim())) {
      setNotice('Setiap card profil harus memiliki judul dan deskripsi.')
      return
    }
    if (gallery.some((item) => !String(item?.title ?? '').trim() || !item?.image)) {
      setNotice('Setiap foto galeri harus memiliki judul dan file gambar.')
      return
    }
    if (leaders.some((item) => !String(item?.name ?? '').trim() || !String(item?.period ?? '').trim()) || achievements.some((item) => !String(item?.event ?? '').trim() || !String(item?.year ?? '').trim() || !String(item?.result ?? '').trim())) {
      setNotice('Lengkapi nama dan periode ketua, serta seluruh data prestasi.')
      return
    }
    if ((draft.profileCards || []).some((c) => !String(c.title || '').trim() || !String(c.eyebrow || '').trim())) {
      setNotice('Lengkapi judul dan eyebrow untuk setiap kartu profil.')
      return
    }

    // First save history & training to file via the new endpoint so they don't go into DB.
    // Use the project subfolder only when the app is actually served from /ukm-psht;
    // Vite dev runs at the root and relies on the proxy for /api.
    const sectionsApiBase = /^\/ukm-psht(?:\/|$)/.test(window.location.pathname) ? '/ukm-psht' : ''
    try {
      const resp = await fetch(`${sectionsApiBase}/api/update_sections.php`, {
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

        <section id="admin-profile" className="admin-card">
          <div className="admin-section-heading">
            <div><h2>Profil UKM</h2><span>Ubah judul, subtitle, dan deskripsi profil utama di landing page.</span></div>
          </div>
          <div className="admin-fields">
            <label>Eyebrow<input value={draft.profile?.eyebrow ?? ''} onChange={(event) => updateSection('profile', 'eyebrow', event.target.value)} /></label>
            <label>Judul profil<input value={draft.profile?.title ?? ''} onChange={(event) => updateSection('profile', 'title', event.target.value)} /></label>
            <label>Deskripsi profil<textarea value={draft.profile?.description ?? ''} onChange={(event) => updateSection('profile', 'description', event.target.value)} rows={4} /></label>
          </div>
        </section>

        <section id="admin-profile-cards" className="admin-card">
          <div className="admin-section-heading">
            <div><h2>Card profil</h2><span>Atur teks, poin utama, dan link tiap card informasi UKM.</span></div>
            <button type="button" className="admin-secondary" onClick={() => addListItem('profileCards', { ...emptyProfileCard, points: ['', '', ''] })}>+ Tambah card</button>
          </div>

          <div className="admin-gallery-list">
            {(Array.isArray(draft.profileCards) ? draft.profileCards : []).map((card, index) => (
              <article className="admin-list-item admin-list-item-stack" key={`profile-card-${index}`}>
                <div className="admin-image-preview admin-image-preview-small">{card.image ? <img src={card.image} alt="Pratinjau card profil" /> : <span>Belum ada foto card</span>}</div>
                <div className="admin-fields">
                  <label>Label card<input value={card.eyebrow} onChange={(event) => updateProfileCard(index, 'eyebrow', event.target.value)} /></label>
                  <label>Judul card<input value={card.title} onChange={(event) => updateProfileCard(index, 'title', event.target.value)} /></label>
                  <label>Deskripsi card<textarea value={card.text} onChange={(event) => updateProfileCard(index, 'text', event.target.value)} rows={4} /></label>
                  <div className="admin-list-points">
                    <span>Poin utama</span>
                    {card.points.map((point, pointIndex) => (
                      <div className="admin-point-row" key={`profile-card-point-${index}-${pointIndex}`}>
                        <input value={point} onChange={(event) => updateProfileCardPoint(index, pointIndex, event.target.value)} />
                        <button type="button" className="admin-remove" onClick={() => removeProfileCardPoint(index, pointIndex)}>Hapus</button>
                      </div>
                    ))}
                    <button type="button" className="admin-secondary" onClick={() => addProfileCardPoint(index)}>+ Tambah poin</button>
                  </div>
                  <label>File foto card<input type="file" accept="image/png,image/jpeg,image/webp" onChange={(event) => handleProfileCardImageChange(event, index)} /></label>
                  <label>Link navigasi (href)<input value={card.href ?? '#'} onChange={(event) => updateProfileCard(index, 'href', event.target.value)} /></label>
                  <label>Detail route<input value={card.detailRoute ?? '#'} onChange={(event) => updateProfileCard(index, 'detailRoute', event.target.value)} /></label>
                  <button type="button" className="admin-remove" onClick={() => removeListItem('profileCards', index)}>Hapus card</button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="admin-history" className="admin-card">
          <div className="admin-section-heading">
            <div><h2>Detail sejarah UKM</h2><span>Ubah judul, deskripsi, dan garis waktu halaman sejarah.</span></div>
            <button type="button" className="admin-secondary" onClick={addHistoryItem}>+ Tambah tahun</button>
          </div>

          <div className="admin-fields">
            <label>Eyebrow<input value={draft.history?.eyebrow ?? ''} onChange={(event) => updateSection('history', 'eyebrow', event.target.value)} /></label>
            <label>Judul sejarah<input value={draft.history?.title ?? ''} onChange={(event) => updateSection('history', 'title', event.target.value)} /></label>
            <label>Deskripsi sejarah<textarea value={draft.history?.description ?? ''} onChange={(event) => updateSection('history', 'description', event.target.value)} rows={4} /></label>
          </div>

          <div className="admin-gallery-list">
            {(Array.isArray(draft.history?.timeline) ? draft.history.timeline : []).map((item, index) => (
              <article className="admin-list-item admin-list-item-stack" key={`history-item-${index}`}>
                <div className="admin-fields">
                  <label>Tahun<input value={item.year} onChange={(event) => updateHistoryItem(index, 'year', event.target.value)} /></label>
                  <label>Judul<input value={item.title} onChange={(event) => updateHistoryItem(index, 'title', event.target.value)} /></label>
                  <label>Deskripsi<textarea value={item.text} onChange={(event) => updateHistoryItem(index, 'text', event.target.value)} rows={3} /></label>
                  <button type="button" className="admin-remove" onClick={() => removeHistoryItem(index)}>Hapus tahun</button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="admin-training" className="admin-card">
          <div className="admin-section-heading">
            <div><h2>Detail latihan rutin</h2><span>Atur judul, jadwal, dan fokus pembinaan halaman latihan.</span></div>
            <button type="button" className="admin-secondary" onClick={addScheduleItem}>+ Tambah jadwal</button>
          </div>

          <div className="admin-fields">
            <label>Eyebrow<input value={draft.training?.eyebrow ?? ''} onChange={(event) => updateSection('training', 'eyebrow', event.target.value)} /></label>
            <label>Judul latihan<input value={draft.training?.title ?? ''} onChange={(event) => updateSection('training', 'title', event.target.value)} /></label>
            <label>Deskripsi latihan<textarea value={draft.training?.description ?? ''} onChange={(event) => updateSection('training', 'description', event.target.value)} rows={4} /></label>
          </div>

          <div className="admin-gallery-list">
            <h3>Jadwal latihan</h3>
            {(Array.isArray(draft.training?.schedule) ? draft.training.schedule : []).map((item, index) => (
              <article className="admin-list-item admin-list-item-stack" key={`schedule-item-${index}`}>
                <div className="admin-fields">
                  <label>Hari<input value={item.day} onChange={(event) => updateScheduleItem(index, 'day', event.target.value)} /></label>
                  <label>Waktu<input value={item.time} onChange={(event) => updateScheduleItem(index, 'time', event.target.value)} /></label>
                  <label>Fokus<input value={item.focus} onChange={(event) => updateScheduleItem(index, 'focus', event.target.value)} /></label>
                  <label>Deskripsi<textarea value={item.text} onChange={(event) => updateScheduleItem(index, 'text', event.target.value)} rows={3} /></label>
                  <button type="button" className="admin-remove" onClick={() => removeScheduleItem(index)}>Hapus jadwal</button>
                </div>
              </article>
            ))}
          </div>

          <div className="admin-gallery-list">
            <h3>Fokus pembinaan</h3>
            {(Array.isArray(draft.training?.highlights) ? draft.training.highlights : []).map((item, index) => (
              <article className="admin-list-item admin-list-item-stack" key={`highlight-item-${index}`}>
                <div className="admin-fields">
                  <label>Judul<input value={item.title} onChange={(event) => updateHighlightItem(index, 'title', event.target.value)} /></label>
                  <label>Deskripsi<textarea value={item.text} onChange={(event) => updateHighlightItem(index, 'text', event.target.value)} rows={3} /></label>
                  <button type="button" className="admin-remove" onClick={() => removeHighlightItem(index)}>Hapus fokus</button>
                </div>
              </article>
            ))}
            <button type="button" className="admin-secondary" onClick={addHighlightItem}>+ Tambah fokus</button>
          </div>
        </section>

        <section id="admin-leaders" className="admin-card">
          <div className="admin-section-heading">
            <div><h2>Daftar ketua UKM</h2><span>Urutkan dari periode terbaru.</span></div>
            <button type="button" className="admin-secondary" onClick={() => addListItem('leaders', emptyLeader)}>+ Tambah ketua</button>
          </div>
          <div className="admin-gallery-list">
            {(Array.isArray(draft.leaders) ? draft.leaders : []).map((leader, index) => (
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
            {(Array.isArray(draft.achievements) ? draft.achievements : []).map((achievement, index) => (
              <article className="admin-list-item admin-list-item-stack" key={`achievement-${index}`}>
                <div className="admin-image-preview admin-image-preview-small">{achievement.image ? <img src={achievement.image} alt="Pratinjau prestasi" /> : <span>Belum ada foto prestasi</span>}</div>
                <label>Nama kejuaraan/prestasi<input value={achievement.event} onChange={(event) => updateListItem('achievements', index, 'event', event.target.value)} /></label>
                <label>Tahun<input value={achievement.year} onChange={(event) => updateListItem('achievements', index, 'year', event.target.value)} /></label>
                <label>Hasil/prestasi<input value={achievement.result} onChange={(event) => updateListItem('achievements', index, 'result', event.target.value)} /></label>
                <label>File foto prestasi<input type="file" accept="image/png,image/jpeg,image/webp" onChange={(event) => handleAchievementImageChange(event, index)} /></label>
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
            {(Array.isArray(draft.gallery) ? draft.gallery : []).map((item, index) => (
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