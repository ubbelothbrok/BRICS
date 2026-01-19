import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MemberCountries from './components/MemberCountries';
import Footer from './components/Footer';
import News from './components/News';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <MemberCountries />
        <News />
      </main>
      <Footer />
    </div>
  );
}

export default App;
