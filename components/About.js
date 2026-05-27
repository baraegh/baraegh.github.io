// About.js
const About = () => {
  const [about, setAbout] = React.useState(null);
  const headingRef = React.useRef(null);
  const [headingVisible, setHeadingVisible] = React.useState(false);

  React.useEffect(() => {
    fetch('./data/about.json')
      .then(r => r.json())
      .then(setAbout)
      .catch(() => setAbout(null));
  }, []);

  React.useEffect(() => {
    const heading = headingRef.current;

    if (!heading) {
      return undefined;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setHeadingVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setHeadingVisible(true);
        observer.disconnect();
      }
    }, {
      threshold: 0.55,
      rootMargin: '0px 0px -10% 0px'
    });

    observer.observe(heading);

    return () => observer.disconnect();
  }, []);

  if (!about) return null;

  return (
    <section id="about" className="about-section motion-section" style={{padding: '8rem 0'}}>
      <div className="container">
        <h2 style={{fontSize: '2.5rem', fontWeight: '700', marginBottom: '3rem', display: 'flex', alignItems: 'center', gap: '1rem'}} className="motion-underline">
          <span style={{color: 'var(--accent-primary)', fontFamily: "'JetBrains Mono', monospace", fontSize: '1.5rem'}}>02.</span>
          About Me
          <div style={{flex: 1, height: '1px', background: 'var(--border)', maxWidth: '300px'}} />
        </h2>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'start'}}>
          <div>
            {about.paragraphs.map((p, i) => (
              <p key={i} style={{color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '1.5rem', lineHeight: '1.8'}}>{p}</p>
            ))}
          </div>
          <div>
            <h3 style={{fontSize: '1.3rem', fontWeight: '600', marginBottom: '2rem', color: 'var(--accent-primary)'}}>Tech Stack</h3>
            <div style={{display: 'grid', gap: '2rem'}}>
              {Object.entries(about.skills).map(([category, techs], i) => (
                <div key={category} style={{animationDelay: `${i * 0.1}s`}} className="fade-in-up motion-card">
                  <div style={{fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.8rem', fontFamily: "'JetBrains Mono', monospace", fontWeight: '500'}}>{category}</div>
                  <div style={{display: 'flex', flexWrap: 'wrap', gap: '0.5rem'}}>
                    {techs.map(tech => (
                      <span key={tech} style={{padding: '0.4rem 1rem', background: 'var(--bg-card)', border: '1px solid var(--border)', fontSize: '0.85rem', color: 'var(--text-secondary)', fontFamily: "'JetBrains Mono', monospace", transition: 'all 0.3s ease', cursor: 'default'}}
                        className="motion-chip"
                        onMouseEnter={e => {e.target.style.borderColor = 'var(--accent-primary)'; e.target.style.color = 'var(--accent-primary)';}}
                        onMouseLeave={e => {e.target.style.borderColor = 'var(--border)'; e.target.style.color = 'var(--text-secondary)';}}
                      >{tech}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};