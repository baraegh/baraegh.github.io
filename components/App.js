// App.js
const App = () => (
  <>
    <Header />
    <main>
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Contact />
    </main>
    <Footer />
  </>
);

const root = document.getElementById('root');
ReactDOM.render(<App />, root);