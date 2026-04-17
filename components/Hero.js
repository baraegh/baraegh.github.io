// Hero.js
const Hero = () => {
  const [config, setConfig] = React.useState(null);

  React.useEffect(() => {
    fetch('./data/config.json')
      .then(r => r.json())
      .then(setConfig)
      .catch(() => setConfig(null));
  }, []);

  if (!config) return null;

  return (
    <section
      style={{
        minHeight: '100dvh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: '7rem'
      }}
    >
      {/* Decorative gradients */}
      <div style={{
        position: 'absolute',
        top: '20%',
        right: '10%',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(0, 255, 136, 0.1) 0%, transparent 70%)',
        filter: 'blur(60px)',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '10%',
        left: '5%',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(0, 136, 255, 0.08) 0%, transparent 70%)',
        filter: 'blur(60px)',
        pointerEvents: 'none'
      }} />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '3rem',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}
        >
          {/* Profile image as square with animated green border */}
          <div
            style={{
              flexShrink: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <div
              style={{
                position: 'relative',
                borderRadius: '16px',
                padding: '12px',
                marginBottom: '1.5rem',
                background: 'radial-gradient(circle, rgba(0,255,136,0.18) 0%, transparent 70%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 'min(80vw, 270px)',
                height: 'min(80vw, 270px)',
                animation: 'profile-glow 2.5s infinite alternate',
                border: '4px solid var(--accent-primary)',
                boxSizing: 'border-box',
                maxWidth: '100%',
                marginTop: '0',
              }}
            >
              <img
                src="/profile.png"
                alt="Portrait of Elbarae El-Ghannouchi"
                style={{
                  width: 'min(70vw, 230px)',
                  height: 'min(70vw, 230px)',
                  borderRadius: '12px',
                  objectFit: 'cover',
                  border: 'none',
                  background: 'var(--bg-card)',
                  boxShadow: '0 6px 32px 0 rgba(0,255,136,0.12), 0 1.5px 8px 0 rgba(0,136,255,0.10)',
                  filter: 'grayscale(10%)',
                  transition: 'transform 0.4s cubic-bezier(.4,2,.3,1)',
                  maxWidth: '100%'
                }}
                className="fade-in-up"
              />
              <style>{`
                @keyframes profile-glow {
                  0% {
                    box-shadow: 0 0 0 8px rgba(0,255,136,0.08);
                  }
                  100% {
                    box-shadow: 0 0 0 24px rgba(0,255,136,0.18);
                  }
                }
                @media (max-width: 900px) {
                  .container > div {
                    flex-direction: column !important;
                    align-items: center !important;
                    gap: 2rem !important;
                  }
                }
                @media (max-width: 600px) {
                  .container > div > div[style*='width: min(80vw, 270px)'] {
                    width: 80vw !important;
                    height: 80vw !important;
                    padding: 8px !important;
                  }
                  .container > div img {
                    width: 60vw !important;
                    height: 60vw !important;
                  }
                }
              `}</style>
            </div>
          </div>
          {/* Hero text */}
          <div style={{ maxWidth: '800px', flex: 1, minWidth: 280 }}>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                color: 'var(--accent-primary)',
                fontSize: '1rem',
                marginBottom: '1rem',
                fontWeight: '500'
              }}
              className="fade-in-up"
            >
              Hi, my name is
            </div>
            <h1
              style={{
                fontSize: 'clamp(2.2rem, 6vw, 3.5rem)',
                fontWeight: '700',
                marginBottom: '1rem',
                lineHeight: '1.1',
                background: 'linear-gradient(135deg, var(--text-primary) 0%, var(--text-secondary) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                animationDelay: '0.1s',
                wordBreak: 'break-word',
                hyphens: 'auto',
                textAlign: 'center',
              }}
              className="fade-in-up"
            >
              {config.personal.firstName} {config.personal.lastName}
            </h1>
            <h2
              style={{
                fontSize: 'clamp(2rem, 5vw, 3rem)',
                fontWeight: '600',
                color: 'var(--text-secondary)',
                marginBottom: '2rem',
                animationDelay: '0.2s'
              }}
              className="fade-in-up"
            >
              {config.personal.title}
            </h2>
            <p
              style={{
                fontSize: '1.1rem',
                color: 'var(--text-secondary)',
                maxWidth: '600px',
                lineHeight: '1.8',
                marginBottom: '3rem',
                animationDelay: '0.3s'
              }}
              className="fade-in-up"
            >
              {config.personal.tagline}
            </p>
            <div
              style={{
                display: 'flex',
                gap: '1.5rem',
                flexWrap: 'wrap',
                animationDelay: '0.4s'
              }}
              className="fade-in-up"
            >
              <a
                href="#contact"
                style={{
                  padding: '1rem 2rem',
                  background: 'transparent',
                  border: '2px solid var(--accent-primary)',
                  color: 'var(--accent-primary)',
                  textDecoration: 'none',
                  fontSize: '1rem',
                  fontWeight: '500',
                  transition: 'all 0.3s ease',
                  fontFamily: "'JetBrains Mono', monospace",
                  display: 'inline-block'
                }}
                onMouseEnter={e => {
                  e.target.style.background = 'var(--accent-primary)';
                  e.target.style.color = 'var(--bg-primary)';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={e => {
                  e.target.style.background = 'transparent';
                  e.target.style.color = 'var(--accent-primary)';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                Get in touch
              </a>
              <a
                href={config.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: '1rem 2rem',
                  background: 'var(--bg-card)',
                  border: '2px solid var(--border)',
                  color: 'var(--text-primary)',
                  textDecoration: 'none',
                  fontSize: '1rem',
                  fontWeight: '500',
                  transition: 'all 0.3s ease',
                  fontFamily: "'JetBrains Mono', monospace",
                  display: 'inline-block'
                }}
                onMouseEnter={e => {
                  e.target.style.borderColor = 'var(--accent-secondary)';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={e => {
                  e.target.style.borderColor = 'var(--border)';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                View GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};