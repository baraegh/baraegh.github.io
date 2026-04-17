
const Header = () => {
  const [config, setConfig] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  // Fetch config on mount
  React.useEffect(() => {
    fetch('./data/config.json')
      .then(r => r.json())
      .then(setConfig)
      .catch(() => setConfig(null));
  }, []);

  // Lock scroll when sidebar is open
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [open]);

  if (!config) return null;

  return (
    <>
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        background: 'rgba(10, 10, 10, 0.95)', backdropFilter: 'blur(10px)',
        borderBottom: '1px solid var(--border)', transition: 'all 0.3s ease', padding: '1.5rem 0'
      }}>
        <div className="container" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <div style={{fontFamily: "'JetBrains Mono', monospace", fontSize: '1rem', color: 'var(--accent-primary)', fontWeight: '600'}}>
            {config.logo}
          </div>
          {/* Hamburger for mobile */}
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen(!open)}
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              outline: 'none',
              cursor: 'pointer',
              zIndex: 1201
            }}
            className="header-hamburger"
          >
            <span style={{
              display: 'block',
              width: 28,
              height: 3,
              background: 'var(--accent-primary)',
              margin: '6px 0',
              borderRadius: 2,
              transition: '0.3s'
            }} />
            <span style={{
              display: 'block',
              width: 28,
              height: 3,
              background: 'var(--accent-primary)',
              margin: '6px 0',
              borderRadius: 2,
              transition: '0.3s'
            }} />
            <span style={{
              display: 'block',
              width: 28,
              height: 3,
              background: 'var(--accent-primary)',
              margin: '6px 0',
              borderRadius: 2,
              transition: '0.3s'
            }} />
          </button>
          {/* Desktop nav */}
          <nav className="header-desktop-nav" style={{
            display: 'flex',
            gap: '2rem'
          }}>
            {config.navItems.map((item, i) => (
              <a key={item} href={`#${item.toLowerCase()}`}
                style={{color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '500', transition: 'color 0.3s ease', animationDelay: `${i * 0.1}s`}}
                className="fade-in-up"
                onMouseEnter={e => e.target.style.color = 'var(--accent-primary)'}
                onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}
              >{item}</a>
            ))}
          </nav>
        </div>
      </header>
      {/* Sidebar for mobile */}
      <div
        className="header-sidebar"
        style={{
          position: 'fixed',
          top: 0,
          right: open ? 0 : '-100vw',
          width: '70vw',
          maxWidth: 320,
          height: '100vh',
          background: 'var(--bg-secondary)',
          boxShadow: open ? '-2px 0 24px 0 rgba(0,0,0,0.25)' : 'none',
          zIndex: 1200,
          transition: 'right 0.5s cubic-bezier(.77,0,.18,1)',
          willChange: 'right',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          padding: '2.5rem 2rem 2rem 2rem'
        }}
        aria-hidden={!open}
      >
        <button
          aria-label="Close menu"
          onClick={() => setOpen(false)}
          style={{
            alignSelf: 'flex-end',
            background: 'none',
            border: 'none',
            fontSize: 32,
            color: 'var(--accent-primary)',
            marginBottom: '2rem',
            cursor: 'pointer'
          }}
        >&times;</button>
        <nav style={{display: 'flex', flexDirection: 'column', gap: '2rem'}}>
          {config.navItems.map(item => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              style={{
                color: 'var(--text-primary)',
                textDecoration: 'none',
                fontSize: '1.2rem',
                fontWeight: '600',
                fontFamily: "'JetBrains Mono', monospace",
                letterSpacing: '0.02em'
              }}
              onClick={() => setOpen(false)}
            >
              {item}
            </a>
          ))}
        </nav>
      </div>
      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.35)',
            zIndex: 1199
          }}
          aria-hidden="true"
        />
      )}
      {/* Responsive styles */}
      <style>{`
        @media (max-width: 900px) {
          .header-desktop-nav {
            display: none !important;
          }
          .header-hamburger {
            display: block !important;
          }
        }
        @media (min-width: 901px) {
          .header-sidebar {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
};