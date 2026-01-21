const Navigation = () => {
  return (
    <nav className="bg-gray-800 text-white py-2">
      <div className="container mx-auto px-4">
        <ul className="flex flex-wrap justify-center space-x-6 text-sm">
          <li><a href="#about" className="hover:text-blue-300 transition-colors duration-200">About the BRICS</a></li>
          <li><a href="#presidency" className="hover:text-blue-300 transition-colors duration-200">Brazilian Presidency</a></li>
          <li><a href="#summits" className="hover:text-blue-300 transition-colors duration-200">Previous Summits</a></li>
          <li><a href="#cooperation" className="hover:text-blue-300 transition-colors duration-200">Areas of Cooperation</a></li>
          <li><a href="#bank" className="hover:text-blue-300 transition-colors duration-200">New Development Bank</a></li>
          <li><a href="#faq" className="hover:text-blue-300 transition-colors duration-200">FAQ</a></li>
          <li><a href="#data" className="hover:text-blue-300 transition-colors duration-200">BRICS Data</a></li>
          <li><a href="#participants" className="hover:text-blue-300 transition-colors duration-200">Participants</a></li>
          <li><a href="#events" className="hover:text-blue-300 transition-colors duration-200">Events</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;