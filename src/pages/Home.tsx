import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Zones from '../components/Zones';
import Footer from '../components/Footer';
import Targets2026 from '../components/Targets2026';
import Testimonials from '../components/Testimonials';
import DirectorNote from '../components/DirectorNote';
import Events from '../components/Events';
import Demos from '../components/Demos';
import EventHighlights from '../components/EventHighlights';

export default function Home() {

    return (
        <div className="min-h-screen bg-[var(--color-bg)] transition-colors duration-300">
            <Navbar />
            <main>
                <Hero />
                <DirectorNote />
                <Zones />
                <EventHighlights />
                <Events />
                <Demos />
                <Targets2026 />
                <Testimonials />
            </main>

            <Footer />
        </div>
    );
}
