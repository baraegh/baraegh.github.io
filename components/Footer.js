// Footer.js
const Footer = () => {
  const [config, setConfig] = React.useState(null);

  React.useEffect(() => {
    fetch('./data/config.json')
      .then(r => r.json())
      .then(setConfig)
      .catch(() => setConfig(null));
  }, []);

  if (!config) return null;

  return (
    <footer
      style={{
        padding: '4rem 0 3rem',
        background: 'linear-gradient(180deg, var(--bg-primary) 0%, var(--bg-secondary) 100%)',
        borderTop: '1px solid var(--border)'
      }}
      className="motion-section"
    >
      <div className="container">
        <div style={{display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', alignItems: 'start'}}>
          <div>
            <div style={{fontFamily: "'JetBrains Mono', monospace", color: 'var(--accent-primary)', fontSize: '0.95rem', marginBottom: '0.9rem', fontWeight: '600'}} className="motion-underline">
              {config.logo}
            </div>
            <p style={{color: 'var(--text-secondary)', maxWidth: '28rem', lineHeight: '1.8'}}>
              Backend engineer focused on systems that stay fast, reliable, and easy to grow.
            </p>
          </div>

          <div>
            <div style={{fontFamily: "'JetBrains Mono', monospace", color: 'var(--text-muted)', fontSize: '0.8rem', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '1rem'}}>
              Contact
            </div>
            <div style={{display: 'grid', gap: '0.7rem'}}>
              <a href={`mailto:${config.personal.email}`} style={{color: 'var(--text-secondary)', textDecoration: 'none', fontFamily: "'JetBrains Mono', monospace", transition: 'color 0.3s ease'}} className="motion-link" onMouseEnter={e => e.target.style.color = 'var(--accent-primary)'} onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}>{config.personal.email}</a>
              <a href={config.socialLinks.github} target="_blank" rel="noopener noreferrer" style={{color: 'var(--text-secondary)', textDecoration: 'none', fontFamily: "'JetBrains Mono', monospace", transition: 'color 0.3s ease'}} className="motion-link" onMouseEnter={e => e.target.style.color = 'var(--accent-primary)'} onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}>GitHub</a>
              <a href={config.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" style={{color: 'var(--text-secondary)', textDecoration: 'none', fontFamily: "'JetBrains Mono', monospace", transition: 'color 0.3s ease'}} className="motion-link" onMouseEnter={e => e.target.style.color = 'var(--accent-primary)'} onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}>LinkedIn</a>
            </div>
          </div>

          <div>
            <div style={{fontFamily: "'JetBrains Mono', monospace", color: 'var(--text-muted)', fontSize: '0.8rem', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '1rem'}}>
              Location
            </div>
            <div style={{display: 'grid', gap: '0.7rem', color: 'var(--text-secondary)'}}>
              <div>{config.personal.location}</div>
              <div>{config.personal.phone}</div>
            </div>
          </div>
        </div>

        <div style={{height: '1px', background: 'var(--border)', margin: '2.25rem 0 1.25rem'}} />

        <div style={{display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'space-between', alignItems: 'center'}}>
          <div style={{fontFamily: "'JetBrains Mono', monospace", fontSize: '0.85rem', color: 'var(--text-muted)'}}>
            Built with React · Designed by {config.site.author}
          </div>
          <div style={{fontFamily: "'JetBrains Mono', monospace", fontSize: '0.8rem', color: 'var(--text-muted)'}}>
            2026 · All rights reserved
          </div>
        </div>
      </div>
    </footer>
  );
};