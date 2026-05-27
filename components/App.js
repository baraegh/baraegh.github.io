// App.js
const App = () => {
  const transitionRef = React.useRef(null);

  React.useEffect(() => {
    const stack = transitionRef.current;

    if (!stack) {
      return undefined;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let mutationObserver = null;
    let ticking = false;
    let cleanupListeners = null;

    const applyScrollStyles = hero => {
      const about = stack.querySelector('#about');

      if (!hero || !about) {
        return;
      }

      const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 1;
      const stackTop = stack.getBoundingClientRect().top + window.scrollY;
      const progress = Math.min(Math.max((window.scrollY - stackTop) / viewportHeight, 0), 1);
      const inverseProgress = 1 - progress;

      hero.style.setProperty('--hero-image-scale', (1 - progress * 0.05).toFixed(4));
      hero.style.setProperty('--hero-image-blur', `${(progress * 4).toFixed(2)}px`);
      hero.style.setProperty('--hero-image-lift', `${(-progress * 18).toFixed(2)}px`);
      hero.style.setProperty('--hero-content-drift', `${(progress * 14).toFixed(2)}px`);
      about.style.setProperty('--about-lift', `${(inverseProgress * 20).toFixed(2)}px`);
      about.style.setProperty('--about-edge-glow', `${(0.28 + progress * 0.22).toFixed(3)}`);
    };

    const attach = () => {
      const hero = stack.querySelector('#hero-stage');
      const about = stack.querySelector('#about');

      if (!hero || !about) {
        return false;
      }

      const onScroll = () => {
        if (ticking) {
          return;
        }

        ticking = true;

        requestAnimationFrame(() => {
          applyScrollStyles(hero);
          ticking = false;
        });
      };

      if (prefersReducedMotion) {
        hero.style.setProperty('--hero-image-scale', '1');
        hero.style.setProperty('--hero-image-blur', '0px');
        hero.style.setProperty('--hero-image-lift', '0px');
        hero.style.setProperty('--hero-content-drift', '0px');
        about.style.setProperty('--about-lift', '0px');
        about.style.setProperty('--about-edge-glow', '0.28');
        return true;
      }

      applyScrollStyles(hero);
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll);

      cleanupListeners = () => {
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onScroll);
      };

      return true;
    };

    if (!attach()) {
      mutationObserver = new MutationObserver(() => {
        if (attach() && mutationObserver) {
          mutationObserver.disconnect();
          mutationObserver = null;
        }
      });

      mutationObserver.observe(stack, {
        childList: true,
        subtree: true
      });
    }

    return () => {
      if (mutationObserver) {
        mutationObserver.disconnect();
      }

      if (cleanupListeners) {
        cleanupListeners();
      }
    };
  }, []);

  return (
    <>
      <Header />
      <main>
        <div className="hero-about-stack" ref={transitionRef}>
          <Hero />
          <About />
        </div>
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
};

const root = document.getElementById('root');
ReactDOM.render(<App />, root);