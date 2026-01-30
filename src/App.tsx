import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AllEvents from './pages/AllEvents';
import Zones from './pages/Zones';
import Vision from './pages/Vision';
import Schedule from './pages/Schedule';
import Team from './pages/Team';
import EventDetails from './pages/EventDetails';
import Loading from './components/Loading';
import Login from './pages/Login';
import Registration from './pages/Registration';
import ForgotPassword from './pages/ForgotPassword';
import Manthan from './pages/Manthan';
import ScrollToTop from './components/ScrollToTop';
import { ThemeProvider } from './context/ThemeContext';

import ManthanInfrastructure from './pages/ManthanInfrastructure';
import ManthanInnovation from './pages/ManthanInnovation';
import SubmitAbstract from './pages/SubmitAbstract.tsx';
import BharatDome from './pages/BharatDome';
import NavRobotec from './pages/NavRobotec';
import LivePolling from './pages/LivePolling';
import CustomCursor from './components/CustomCursor';
import AdminAbstracts from './pages/AdminAbstracts';

import { Toaster } from 'react-hot-toast';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <ThemeProvider>
      <CustomCursor />
      <Toaster position="bottom-center" reverseOrder={false} />
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/events" element={<AllEvents />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/zones" element={<Zones />} />
          <Route path="/vision" element={<Vision />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/team" element={<Team />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/manthan" element={<Manthan />} />
          <Route path="/manthan/infrastructure" element={<ManthanInfrastructure />} />
          <Route path="/manthan/innovation" element={<ManthanInnovation />} />
          <Route path="/manthan/submit-abstract" element={<SubmitAbstract />} />
          <Route path="/manthan/live-polling" element={<LivePolling />} />
          <Route path="/demos/bharat-dome" element={<BharatDome />} />
          <Route path="/demos/navrobotec" element={<NavRobotec />} />
          <Route path="/admin-abstracts" element={<AdminAbstracts />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
