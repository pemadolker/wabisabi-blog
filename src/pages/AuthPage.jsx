import React, { useState } from 'react'

export default function AuthPage({ onSignInGoogle, onSignInEmail, onSignUpEmail }) {
  const [mode, setMode]       = useState('login') // 'login' | 'signup'
  const [email, setEmail]     = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]     = useState('')
  const [loading, setLoading] = useState(false)

  const handle = async (fn) => {
    setError(''); setLoading(true)
    const { error } = await fn()
    if (error) setError(error.message)
    setLoading(false)
  }

  const inputStyle = {
    width: '100%',
    background: 'rgba(255,255,255,0.8)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-sm)',
    padding: '0.85rem 1.1rem',
    color: 'var(--ink)',
    fontFamily: 'var(--font-body)',
    fontSize: '0.95rem',
    outline: 'none',
    marginBottom: '0.9rem',
    transition: 'border var(--transition)',
  }

  return (
    <main className="page">
      <div style={{
        minHeight: '100vh',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '6rem 1.5rem 3rem',
      }}>
        <div style={{
          width: '100%', maxWidth: 420,
          background: 'rgba(255,255,255,0.75)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius)',
          padding: '2.5rem 2rem',
          backdropFilter: 'blur(12px)',
          boxShadow: 'var(--shadow)',
        }}>
          {/* Logo */}
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ fontFamily: 'var(--font-prose)', fontSize: '2.5rem', color: 'var(--sakura-deep)', marginBottom: '0.3rem' }}>ペマ</div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 700, color: 'var(--ink)', marginBottom: '0.3rem' }}>
              {mode === 'login' ? 'Welcome back' : 'Join Wabisabi Notes'}
            </h1>
            <p style={{ color: 'var(--ink-faint)', fontSize: '0.85rem' }}>
              {mode === 'login' ? 'Sign in to your account' : 'Create your free account'}
            </p>
          </div>

          {/* Google button */}
          <button
            onClick={() => handle(onSignInGoogle)}
            disabled={loading}
            style={{
              width: '100%', padding: '0.85rem',
              background: 'white', border: '1px solid var(--border)',
              borderRadius: 'var(--radius-sm)', cursor: 'pointer',
              fontFamily: 'var(--font-body)', fontSize: '0.9rem',
              color: 'var(--ink)', fontWeight: 500,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.7rem',
              marginBottom: '1.2rem', transition: 'var(--transition)',
              boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
            }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.12)'}
            onMouseLeave={e => e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.08)'}
          >
            <svg width="18" height="18" viewBox="0 0 18 18">
              <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"/>
              <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z"/>
              <path fill="#FBBC05" d="M3.964 10.707A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.039l3.007-2.332z"/>
              <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.961L3.964 6.293C4.672 4.166 6.656 3.58 9 3.58z"/>
            </svg>
            Continue with Google
          </button>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.2rem' }}>
            <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
            <span style={{ color: 'var(--ink-faint)', fontSize: '0.75rem', letterSpacing: '0.08em' }}>OR</span>
            <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
          </div>

          {/* Email form */}
          <input
            type="email" placeholder="Email address"
            value={email} onChange={e => setEmail(e.target.value)}
            style={inputStyle}
            onFocus={e => e.target.style.border = '1px solid var(--sakura-deep)'}
            onBlur={e => e.target.style.border = '1px solid var(--border)'}
          />
          <input
            type="password" placeholder="Password"
            value={password} onChange={e => setPassword(e.target.value)}
            style={{ ...inputStyle, marginBottom: error ? '0.5rem' : '1.2rem' }}
            onFocus={e => e.target.style.border = '1px solid var(--sakura-deep)'}
            onBlur={e => e.target.style.border = '1px solid var(--border)'}
            onKeyDown={e => e.key === 'Enter' && handle(() =>
              mode === 'login' ? onSignInEmail(email, password) : onSignUpEmail(email, password)
            )}
          />

          {error && (
            <p style={{ color: '#c0392b', fontSize: '0.8rem', marginBottom: '0.8rem', lineHeight: 1.5 }}>
              ⚠️ {error}
            </p>
          )}

          {mode === 'signup' && (
            <p style={{ color: 'var(--ink-faint)', fontSize: '0.78rem', marginBottom: '0.9rem', lineHeight: 1.6 }}>
              📧 After signing up, check your email to confirm your account before logging in.
            </p>
          )}

          <button
            onClick={() => handle(() =>
              mode === 'login' ? onSignInEmail(email, password) : onSignUpEmail(email, password)
            )}
            disabled={loading || !email || !password}
            className="btn-publish"
            style={{ width: '100%', padding: '0.9rem', fontSize: '0.9rem' }}
          >
            {loading ? '🌸 Please wait...' : mode === 'login' ? 'Sign in' : 'Create account'}
          </button>

          {/* Toggle */}
          <p style={{ textAlign: 'center', marginTop: '1.3rem', fontSize: '0.85rem', color: 'var(--ink-faint)', marginBottom: 0 }}>
            {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
            <button
              onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setError('') }}
              style={{ background: 'none', border: 'none', color: 'var(--sakura-deep)', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem', fontFamily: 'var(--font-body)' }}
            >
              {mode === 'login' ? 'Sign up free' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </main>
  )
}
