// About.js
const About = () => {
  const [about, setAbout] = React.useState(null);

  React.useEffect(() => {
    fetch('./data/about.json')
      .then(r => r.json())
      .then(setAbout)
      .catch(() => setAbout(null));
  }, []);

  if (!about) return null;

  return (
    <section id="about" style={{padding: '8rem 0', background: 'var(--bg-secondary)'}}>
      <div className="container">
        <h2 style={{fontSize: '2.5rem', fontWeight: '700', marginBottom: '3rem', display: 'flex', alignItems: 'center', gap: '1rem'}}>
          <span style={{color: 'var(--accent-primary)', fontFamily: "'JetBrains Mono', monospace", fontSize: '1.5rem'}}>01.</span>
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
                <div key={category} style={{animationDelay: `${i * 0.1}s`}} className="fade-in-up">
                  <div style={{fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.8rem', fontFamily: "'JetBrains Mono', monospace", fontWeight: '500'}}>{category}</div>
                  <div style={{display: 'flex', flexWrap: 'wrap', gap: '0.5rem'}}>
                    {techs.map(tech => (
                      <span key={tech} style={{padding: '0.4rem 1rem', background: 'var(--bg-card)', border: '1px solid var(--border)', fontSize: '0.85rem', color: 'var(--text-secondary)', fontFamily: "'JetBrains Mono', monospace", transition: 'all 0.3s ease', cursor: 'default'}}
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