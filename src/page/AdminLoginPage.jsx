import { useState } from 'react'

function AdminLoginPage({ onLogin, onBack }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setMessage('')
    setSubmitting(true)

    try {
      await onLogin({ username, password })
    } catch (error) {
      setMessage(error.message || 'Login gagal. Silakan coba lagi.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="admin-login-page">
      <section className="admin-login-card" aria-labelledby="admin-login-title">
        <a href="#beranda" className="admin-login-back" onClick={onBack}>← Kembali ke website</a>
        <p className="admin-login-kicker">UKM PSHT</p>
        <h1 id="admin-login-title">Login Admin</h1>
        <p className="admin-login-description">Masuk untuk mengelola konten website UKM PSHT.</p>

        <form className="admin-login-form" onSubmit={handleSubmit}>
          <label>
            Username
            <input
              type="text"
              autoComplete="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              required
              autoFocus
            />
          </label>
          <label>
            Password
            <input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </label>
          {message && <p className="admin-login-error" role="alert">{message}</p>}
          <button type="submit" className="admin-login-submit" disabled={submitting}>
            {submitting ? 'Memproses...' : 'Masuk ke dashboard'}
          </button>
        </form>
      </section>
    </main>
  )
}

export default AdminLoginPage
