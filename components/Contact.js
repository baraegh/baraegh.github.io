// Contact.js
const Contact = () => {
  const [contact, setContact] = React.useState(null);

  React.useEffect(() => {
    fetch('./data/contact.json')
      .then(r => r.json())
      .then(setContact)
      .catch(() => setContact(null));
  }, []);

  if (!contact) return null;

  return (
    <section id="contact" style={{padding: '8rem 0', background: 'var(--bg-primary)', minHeight: '80vh', display: 'flex', alignItems: 'center'}}>
      <div className="container" style={{textAlign: 'center', maxWidth: '600px', margin: '0 auto'}}>
        <div style={{fontFamily: "'JetBrains Mono', monospace", color: 'var(--accent-primary)', fontSize: '1rem', marginBottom: '1rem', fontWeight: '500'}}>
          04. What's Next?
        </div>
        <h2 style={{fontSize: '3rem', fontWeight: '700', marginBottom: '2rem', color: 'var(--text-primary)'}}>
          Get In Touch
        </h2>
        <p style={{color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '3rem'}}>
          I'm currently looking for new opportunities in backend engineering and full-stack development. Whether you have a question or just want to say hi, I'll try my best to get back to you!
        </p>
        <div style={{display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center'}}>
          <a href={`mailto:${contact.contact.email}`} style={{padding: '1.2rem 2.5rem', background: 'transparent', border: '2px solid var(--accent-primary)', color: 'var(--accent-primary)', textDecoration: 'none', fontSize: '1.1rem', fontWeight: '500', transition: 'all 0.3s ease', fontFamily: "'JetBrains Mono', monospace", display: 'inline-block'}}
            onMouseEnter={e => {e.target.style.background = 'var(--accent-primary)'; e.target.style.color = 'var(--bg-primary)'; e.target.style.transform = 'translateY(-5px)';}}
            onMouseLeave={e => {e.target.style.background = 'transparent'; e.target.style.color = 'var(--accent-primary)'; e.target.style.transform = 'translateY(0)';}}
          >Say Hello</a>
          <div style={{display: 'flex', gap: '2rem', marginTop: '1rem'}}>
            <a href={contact.contact.github} target="_blank" rel="noopener noreferrer" style={{color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.95rem', fontFamily: "'JetBrains Mono', monospace", transition: 'color 0.3s ease'}} onMouseEnter={e => e.target.style.color = 'var(--accent-primary)'} onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}>GitHub</a>
            <a href={contact.contact.linkedin} target="_blank" rel="noopener noreferrer" style={{color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.95rem', fontFamily: "'JetBrains Mono', monospace", transition: 'color 0.3s ease'}} onMouseEnter={e => e.target.style.color = 'var(--accent-primary)'} onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}>LinkedIn</a>
          </div>
        </div>
      </div>
    </section>
  );
};