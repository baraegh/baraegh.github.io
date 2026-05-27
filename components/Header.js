
const Header = () => {
  const [config, setConfig] = React.useState(null);
  const headerRef = React.useRef(null);
  const [menuOpen, setMenuOpen] = React.useState(false);

  // Fetch config on mount
  React.useEffect(() => {
    fetch('./data/config.json')
      .then(r => r.json())
      .then(setConfig)
      .catch(() => setConfig(null));
  }, []);

  // Sync header height into CSS variable so hero offsets correctly when nav wraps
  React.useEffect(() => {
    const setHeaderHeight = () => {
      const el = headerRef.current;
      if (!el) return;
      const height = el.offsetHeight;
      document.documentElement.style.setProperty('--header-height', `${height}px`);
    };

    setHeaderHeight();
    window.addEventListener('resize', setHeaderHeight);
    const ro = new ResizeObserver(setHeaderHeight);
    if (headerRef.current) ro.observe(headerRef.current);

    return () => {
      window.removeEventListener('resize', setHeaderHeight);
      if (ro && headerRef.current) ro.unobserve(headerRef.current);
    };
  }, []);

  React.useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  if (!config) return null;

  return (
    <>
      <header ref={headerRef} style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1100,
        background: 'rgba(10, 10, 10, 0.95)', backdropFilter: 'blur(10px)',
        borderBottom: '1px solid var(--border)', transition: 'all 0.3s ease', padding: '1.25rem 0'
      }}>
        <div className="container" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative'}}>
          <div style={{fontFamily: "'JetBrains Mono', monospace", fontSize: '1rem', color: 'var(--accent-primary)', fontWeight: '600'}}>
            {config.logo}
          </div>

          {/* Mobile toggle button (shown via CSS) */}
          <div className="header-mobile-toggle-wrap" style={{position: 'absolute', top: '50%', right: 0, transform: 'translateY(-50%)', zIndex: 1150}}>
            <button
              className="header-mobile-toggle"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              onClick={() => setMenuOpen(v => !v)}
              style={{ display: menuOpen ? 'none' : undefined }}
            >
              <span style={{display: 'inline-block', width: 20, height: 2, background: 'currentColor', boxShadow: '0 6px currentColor, 0 -6px currentColor'}} />
            </button>
          </div>

          {/* Main nav (desktop) */}
          <nav className="header-desktop-nav" style={{
            display: 'flex',
            gap: '1.5rem',
            alignItems: 'center'
          }}>
            {config.navItems.map((item, i) => (
              <a key={item} href={`#${item.toLowerCase()}`}
                style={{color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '500', transition: 'color 0.3s ease', animationDelay: `${i * 0.1}s`}}
                onMouseEnter={e => e.target.style.color = 'var(--accent-primary)'}
                onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}
              >{item}</a>
            ))}
          </nav>

          {/* Mobile nav dropdown */}
          <div className={`header-mobile-backdrop ${menuOpen ? 'is-open' : ''}`} onClick={() => setMenuOpen(false)} aria-hidden="true" />

          <div className={`header-mobile-nav ${menuOpen ? 'is-open' : ''}`} aria-hidden={!menuOpen}>
            <div className="header-mobile-nav-top">
              <span style={{fontFamily: "'JetBrains Mono', monospace", color: 'var(--accent-primary)', fontSize: '0.85rem', letterSpacing: '0.2em'}}>MENU</span>
              <button
                className="header-mobile-toggle header-mobile-toggle-close"
                aria-label="Close menu"
                onClick={() => setMenuOpen(false)}
                style={{display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 40, height: 40, background: 'transparent', border: 'none', cursor: 'pointer'}}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path d="M6 6 L18 18 M6 18 L18 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
              </button>
            </div>

            <nav className="header-mobile-links">
              {config.navItems.map((item, i) => (
                <a
                  key={item + '-m'}
                  href={`#${item.toLowerCase()}`}
                  style={{animationDelay: `${i * 0.08}s`}}
                  onClick={() => setMenuOpen(false)}
                >
                  <span className="header-mobile-link-index">0{i + 1}.</span>
                  <span>{item}</span>
                </a>
              ))}
            </nav>
          </div>
        </div>
      </header>
      {/* Responsive styles */}
      <style>{`
        .header-mobile-toggle-wrap {
          display: none;
        }

        .header-mobile-toggle {
          display: none;
        }

        .header-mobile-nav, .header-mobile-backdrop { display: none; }

        @media (max-width: 900px) {
          .header-mobile-toggle-wrap {
            display: flex;
            position: absolute;
            top: 50%;
            right: 0;
            transform: translateY(-50%);
            z-index: 1150;
          }

          .header-desktop-nav {
            display: none !important;
          }

          .header-mobile-toggle {
            display: inline-flex !important;
            align-items: center;
            justify-content: center;
            gap: 0.25rem;
            background: transparent;
            border: none;
            cursor: pointer;
            color: var(--text-primary);
            padding: 0.35rem 0.5rem;
            border-radius: 8px;
          }

          .header-mobile-toggle span { display: block; }

          .header-mobile-backdrop {
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.45);
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.35s ease;
          }

          .header-mobile-backdrop.is-open {
            opacity: 1;
            pointer-events: auto;
          }

          .header-mobile-nav {
            position: fixed;
            top: 0;
            right: 0;
            width: 100vw;
            height: 100dvh;
            padding: 1.25rem 1.5rem 2rem;
            background: linear-gradient(180deg, rgba(10, 10, 10, 0.98), rgba(10, 10, 10, 0.96));
            border-left: 1px solid var(--border);
            transform: translateX(100%);
            transition: transform 0.42s cubic-bezier(.2,.9,.2,1);
            display: flex;
            flex-direction: column;
            z-index: 1200;
          }

          .header-mobile-nav.is-open {
            transform: translateX(0);
          }

          .header-mobile-nav-top {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 3rem;
          }

          .header-mobile-toggle-close {
            display: inline-flex !important;
          }

          .header-mobile-links {
            display: grid;
            gap: 0.6rem;
          }

          .header-mobile-links a {
            display: flex;
            align-items: baseline;
            gap: 1rem;
            padding: 1rem 0;
            color: var(--text-primary);
            text-decoration: none;
            font-size: clamp(1.75rem, 7vw, 2.5rem);
            font-weight: 700;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
            opacity: 0;
            transform: translateX(14px);
            animation: slideInRight 0.5s ease forwards;
          }

          .header-mobile-links a:last-child {
            border-bottom: none;
          }

          .header-mobile-link-index {
            color: var(--accent-primary);
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.8rem;
            letter-spacing: 0.2em;
            min-width: 3.25rem;
            flex-shrink: 0;
          }
        }
      `}</style>
    </>
  );
};