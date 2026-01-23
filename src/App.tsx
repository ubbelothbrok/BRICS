import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

import AllEvents from './pages/AllEvents';


import Zones from './pages/Zones';
import Vision from './pages/Vision';
import Schedule from './pages/Schedule';
import Team from './pages/Team';

import EventDetails from './pages/EventDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/events" element={<AllEvents />} />
        <Route path="/events/:id" element={<EventDetails />} />
        <Route path="/zones" element={<Zones />} />
        <Route path="/vision" element={<Vision />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/team" element={<Team />} />
      </Routes>
    </Router>
  );
}

export default App;
