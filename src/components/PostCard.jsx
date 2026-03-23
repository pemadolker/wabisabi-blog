import React from 'react'

const EMOJIS = ['🌸','📝','💻','🌿','☁️','✨','📚','🍵','🔬','🧩']
const COLORS = [
  'linear-gradient(135deg, #fdf0f3, #f2c4ce)',
  'linear-gradient(135deg, #f0fdf4, #bbf7d0)',
  'linear-gradient(135deg, #fefce8, #fde68a)',
  'linear-gradient(135deg, #f0f9ff, #bae6fd)',
  'linear-gradient(135deg, #fdf4ff, #e9d5ff)',
]

export default function PostCard({ post, index = 0, onClick, onAuthorClick }) {
  const emoji = post.emoji || EMOJIS[index % EMOJIS.length]
  const color = post.color || COLORS[index % COLORS.length]

  return (
    <div className="card fade-up" style={{ animationDelay: `${index * 0.07}s` }} onClick={() => onClick(post)}>
      <div className="card-image" style={{ background: color }}>{emoji}</div>
      <div className="card-body">
        <div className="card-tags">
          {(post.tags || []).map(t => <span key={t} className="tag">{t}</span>)}
        </div>
        <h3 className="card-title">{post.title}</h3>
        <p className="card-excerpt">{post.excerpt}</p>
      </div>
      <div className="card-footer">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.1rem' }}>
          <span className="card-date">{post.date}</span>
          {post.authorName && (
            <button
              onClick={e => { e.stopPropagation(); onAuthorClick?.(post.userId) }}
              style={{
                background: 'none', border: 'none', padding: 0,
                fontSize: '0.72rem', color: 'var(--sakura-deep)',
                cursor: onAuthorClick ? 'pointer' : 'default',
                fontFamily: 'var(--font-body)', textAlign: 'left',
                letterSpacing: '0.02em',
              }}
            >{post.authorEmoji} {post.authorName}</button>
          )}
        </div>
        <div className="card-arrow">→</div>
      </div>
    </div>
  )
}
