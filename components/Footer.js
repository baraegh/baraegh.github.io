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
    <footer style={{padding: '3rem 0', background: 'var(--bg-secondary)', borderTop: '1px solid var(--border)'}}>
      <div className="container" style={{textAlign: 'center'}}>
        <div style={{fontFamily: "'JetBrains Mono', monospace", fontSize: '0.9rem', color: 'var(--text-muted)'}}>
          Built with React · Designed by {config.site.author}
        </div>
        <div style={{fontFamily: "'JetBrains Mono', monospace", fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.5rem'}}>
          {config.personal.location} · {config.personal.phone}
        </div>
      </div>
    </footer>
  );
};