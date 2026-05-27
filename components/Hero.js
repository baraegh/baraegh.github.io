// Hero.js
const Hero = () => {
  const [config, setConfig] = React.useState(null);

  const binaryStreams = React.useMemo(() => {
    const palette = ['rgba(42, 255, 96, 0.92)', 'rgba(255, 255, 255, 0.84)'];
    const streams = [];

    const randomBinary = (minLen = 1, maxLen = 4) => {
      const len = Math.floor(Math.random() * (maxLen - minLen + 1)) + minLen;
      let s = '';
      for (let i = 0; i < len; i += 1) s += (Math.random() < 0.5 ? '0' : '1');
      return s;
    };

    const addStream = (leftMin, leftMax, topMin, topMax, count, sizeMin, sizeMax, opacityMin, opacityMax, delayMin, delayMax, densityBias = 0.5) => {
      for (let index = 0; index < count; index += 1) {
        const isWhite = Math.random() > densityBias;
        streams.push({
          top: `${(topMin + Math.random() * (topMax - topMin)).toFixed(2)}%`,
          left: `${(leftMin + Math.random() * (leftMax - leftMin)).toFixed(2)}%`,
          size: `clamp(${sizeMin}rem, ${Math.max(1.05, sizeMin * 1.2).toFixed(2)}vw, ${sizeMax}rem)`,
          opacity: +(opacityMin + Math.random() * (opacityMax - opacityMin)).toFixed(2),
          delay: `${(delayMin + Math.random() * (delayMax - delayMin)).toFixed(2)}s`,
          value: randomBinary(1, 4),
          color: isWhite ? palette[1] : palette[0],
          duration: `${(4.6 + Math.random() * 4.2).toFixed(2)}s`
        });
      }
    };

    addStream(0, 10, 0, 100, 28, 0.95, 1.45, 0.22, 0.82, 0, 2.2, 0.28);
    addStream(10, 30, 0, 100, 20, 0.9, 1.35, 0.12, 0.46, 0, 2.5, 0.45);
    addStream(70, 100, 0, 100, 28, 0.95, 1.45, 0.22, 0.82, 0, 2.2, 0.28);
    addStream(30, 70, 0, 36, 16, 0.85, 1.2, 0.08, 0.28, 0, 2.8, 0.55);
    addStream(30, 70, 36, 100, 18, 0.85, 1.2, 0.08, 0.28, 0, 2.8, 0.55);

    return streams;
  }, []);

  React.useEffect(() => {
    fetch('./data/config.json')
      .then(r => r.json())
      .then(setConfig)
      .catch(() => setConfig(null));
  }, []);

  // Track iPad-sized viewports and apply a larger hero image size in the component
  const [isIpad, setIsIpad] = React.useState(() => {
    if (typeof window === 'undefined') return false;
    const w = window.innerWidth || document.documentElement.clientWidth;
    return w >= 768 && w <= 1024;
  });

  React.useEffect(() => {
    const onResize = () => {
      const w = window.innerWidth || document.documentElement.clientWidth;
      setIsIpad(w >= 768 && w <= 1024);
    };

    window.addEventListener('resize', onResize);
    // run once
    onResize();
    return () => window.removeEventListener('resize', onResize);
  }, []);

  if (!config) return null;

  return (
    <section id="hero-stage" className="motion-section hero-split hero-editorial hero-stage">
      <div className="hero-backdrop" aria-hidden="true"></div>
      <div className="hero-binary-layer" aria-hidden="true">
        {binaryStreams.map((stream, index) => (
          <span
            key={`${stream.value}-${index}`}
            className="hero-binary-glyph"
            style={{
              top: stream.top,
              left: stream.left,
              fontSize: stream.size,
              opacity: stream.opacity,
              animationDelay: stream.delay,
              animationDuration: stream.duration,
              color: stream.color
            }}
          >
            {stream.value}
          </span>
        ))}
      </div>
      <div className="container hero-inner" style={{ position: 'relative', zIndex: 1 }}>
        <div className="hero-top-left">
          <div className="hero-intro">Hey 👋, I'm a {config.personal.title}</div>
          <h1 className="hero-bigname">{config.personal.firstName} {config.personal.lastName}</h1>
        </div>

        <div className="hero-top-right">
          <div className="scroll-label fade-in-up" aria-label="Scroll indicator">
            <span>SCROLL</span>
          </div>
        </div>

        <div className="hero-center-layer">
          <div
            className="hero-image-frame"
            style={isIpad ? { width: '640px', maxWidth: 'calc(100% - 48px)' } : undefined}
          >
            <img
              src="/me.png"
              alt={`Portrait of ${config.personal.firstName} ${config.personal.lastName}`}
            />
          </div>
        </div>

        <div className="hero-bottom-left">
          <p className="hero-bio">{config.personal.tagline}</p>
          <div className="hero-actions">
            <a href="#contact" className="hero-action-primary">Get in touch</a>
            <a href={config.socialLinks.github} target="_blank" rel="noopener noreferrer" className="hero-action-secondary">GitHub</a>
          </div>
        </div>

      </div>
    </section>
  );
};