// Experience.js
const Experience = () => {
  const [exp, setExp] = React.useState(null);

  React.useEffect(() => {
    fetch('./data/experience.json')
      .then(r => r.json())
      .then(setExp)
      .catch(() => setExp(null));
  }, []);

  if (!exp) return null;

  return (
    <section id="experience" style={{padding: '8rem 0', background: 'var(--bg-primary)'}}>
      <div className="container">
        <h2 style={{fontSize: '2.5rem', fontWeight: '700', marginBottom: '3rem', display: 'flex', alignItems: 'center', gap: '1rem'}}>
          <span style={{color: 'var(--accent-primary)', fontFamily: "'JetBrains Mono', monospace", fontSize: '1.5rem'}}>02.</span>
          Experience
          <div style={{flex: 1, height: '1px', background: 'var(--border)', maxWidth: '300px'}} />
        </h2>
        <div style={{display: 'grid', gap: '3rem'}}>
          {exp.jobs.map((job, i) => (
            <div key={i} style={{background: 'var(--bg-card)', border: '1px solid var(--border)', padding: '2rem', transition: 'all 0.3s ease', animationDelay: `${i * 0.1}s`}} className="fade-in-up"
              onMouseEnter={e => {e.currentTarget.style.borderColor = 'var(--accent-primary)'; e.currentTarget.style.transform = 'translateX(10px)';}}
              onMouseLeave={e => {e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateX(0)';}}>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem'}}>
                <div>
                  <h3 style={{fontSize: '1.5rem', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '0.5rem'}}>{job.title}</h3>
                  <div style={{fontSize: '1.1rem', color: 'var(--accent-primary)', fontWeight: '500'}}>{job.company}</div>
                </div>
                <div style={{fontFamily: "'JetBrains Mono', monospace", fontSize: '0.9rem', color: 'var(--text-muted)'}}>{job.period}</div>
              </div>
              <ul style={{listStyle: 'none', padding: 0, marginBottom: '1.5rem'}}>
                {job.description.map((item, j) => (
                  <li key={j} style={{color: 'var(--text-secondary)', marginBottom: '0.8rem', paddingLeft: '1.5rem', position: 'relative', lineHeight: '1.6'}}>
                    <span style={{position: 'absolute', left: 0, color: 'var(--accent-primary)'}}>▹</span>{item}
                  </li>
                ))}
              </ul>
              <div style={{display: 'flex', flexWrap: 'wrap', gap: '0.5rem'}}>
                {job.tech.map(tech => (
                  <span key={tech} style={{padding: '0.3rem 0.8rem', background: 'var(--code-bg)', border: '1px solid var(--border)', fontSize: '0.75rem', color: 'var(--accent-primary)', fontFamily: "'JetBrains Mono', monospace"}}>{tech}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};