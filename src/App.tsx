import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Registration from './pages/Registration';
import Login from './pages/Login';
import AllEvents from './pages/AllEvents';
import AdminEvents from './pages/AdminEvents';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/events" element={<AllEvents />} />
        <Route path="/admin/events" element={<AdminEvents />} />
      </Routes>
    </Router>
  );
}

export default App;
