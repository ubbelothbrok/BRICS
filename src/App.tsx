import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Zones from './components/Zones';
import Footer from './components/Footer';
import Targets2026 from './components/Targets2026';
import Testimonials from './components/Testimonials';
import Loading from './components/Loading';
import DirectorNote from './components/DirectorNote';
import Events from './components/Events';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <DirectorNote />
        <Zones />
        <Events />
        <Targets2026 />
        <Testimonials />
      </main>

      <Footer />
    </div>
  );
}

export default App;
