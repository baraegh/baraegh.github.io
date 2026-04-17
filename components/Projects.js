// Projects.js
const Projects = () => {
  const [projectsData, setProjectsData] = React.useState(null);
  const [config, setConfig] = React.useState(null);
  // Track showMore state for each card
  const [showMoreArr, setShowMoreArr] = React.useState([]);

  React.useEffect(() => {
    fetch('./data/projects.json')
      .then(r => r.json())
      .then(data => {
        setProjectsData(data);
        setShowMoreArr(Array(data.projects.length).fill(false));
      })
      .catch(() => setProjectsData(null));
    fetch('./data/config.json')
      .then(r => r.json())
      .then(setConfig)
      .catch(() => setConfig(null));
  }, []);

  if (!projectsData || !config) return null;

  return (
    <section id="projects" style={{padding: '8rem 0', background: 'var(--bg-secondary)'}}>
      <div className="container">
        <h2 style={{fontSize: '2.5rem', fontWeight: '700', marginBottom: '3rem', display: 'flex', alignItems: 'center', gap: '1rem'}}>
          <span style={{color: 'var(--accent-primary)', fontFamily: "'JetBrains Mono', monospace", fontSize: '1.5rem'}}>03.</span>
          Projects
          <div style={{flex: 1, height: '1px', background: 'var(--border)', maxWidth: '300px'}} />
        </h2>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem'}}>
          {projectsData.projects.map((project, i) => {
            const descLimit = 200;
            const highlightsLimit = 3;
            const isLong = project.description.length > descLimit || project.highlights.length > highlightsLimit;
            const desc = showMoreArr[i] ? project.description : project.description.slice(0, descLimit) + (project.description.length > descLimit ? '...' : '');
            const highlights = showMoreArr[i] ? project.highlights : project.highlights.slice(0, highlightsLimit);
            return (
              <div key={i} style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                padding: '1.2rem 1.2rem 1rem 1.2rem',
                display: 'flex',
                flexDirection: 'column',
                minHeight: '220px',
                transition: 'all 0.3s ease',
                animationDelay: `${i * 0.1}s`
              }} className="fade-in-up"
                onMouseEnter={e => {e.currentTarget.style.borderColor = 'var(--accent-secondary)'; e.currentTarget.style.transform = 'translateY(-10px)';}}
                onMouseLeave={e => {e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)';}}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem'}}>
                  <div style={{fontSize: '2rem', color: 'var(--accent-secondary)'}}>📁</div>
                  <a href={project.github} target="_blank" rel="noopener noreferrer" style={{color: 'var(--text-secondary)', fontSize: '1.3rem', transition: 'color 0.3s ease'}} onMouseEnter={e => e.target.style.color = 'var(--accent-primary)'} onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}>↗</a>
                </div>
                <h3 style={{fontSize: '1.5rem', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '1rem'}}>{project.title}</h3>
                <p style={{color: 'var(--text-secondary)', marginBottom: '1rem', lineHeight: '1.6'}}>{desc}</p>
                <ul style={{listStyle: 'none', padding: 0, marginBottom: '1.5rem'}}>
                  {highlights.map((item, j) => (
                    <li key={j} style={{color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem', paddingLeft: '1.2rem', position: 'relative'}}>
                      <span style={{position: 'absolute', left: 0, color: 'var(--accent-secondary)', fontSize: '0.7rem'}}>▹</span>{item}
                    </li>
                  ))}
                </ul>
                {isLong && (
                  <button onClick={() => setShowMoreArr(arr => arr.map((v, idx) => idx === i ? !v : v))} style={{alignSelf: 'flex-start', marginBottom: '1rem', background: 'none', border: 'none', color: 'var(--accent-primary)', cursor: 'pointer', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.95rem', padding: 0}}>
                    {showMoreArr[i] ? 'Show less' : 'Show more'}
                  </button>
                )}
                <div style={{display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: 'auto'}}>
                  {project.tech.map(tech => (
                    <span key={tech} style={{fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: "'JetBrains Mono', monospace"}}>{tech}</span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        <div style={{textAlign: 'center', marginTop: '4rem'}}>
          <a href={config.socialLinks.github} target="_blank" rel="noopener noreferrer" style={{padding: '1rem 2rem', background: 'transparent', border: '2px solid var(--accent-secondary)', color: 'var(--accent-secondary)', textDecoration: 'none', fontSize: '1rem', fontWeight: '500', transition: 'all 0.3s ease', fontFamily: "'JetBrains Mono', monospace", display: 'inline-block'}}
            onMouseEnter={e => {e.target.style.background = 'var(--accent-secondary)'; e.target.style.color = 'var(--bg-primary)';}}
            onMouseLeave={e => {e.target.style.background = 'transparent'; e.target.style.color = 'var(--accent-secondary)';}}
          >View More on GitHub</a>
        </div>
      </div>
    </section>
  );
};