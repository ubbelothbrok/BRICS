const Header = () => {
  return (
    <header className="bg-blue-900 text-white py-4 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <img src="https://brics.br/wp-content/themes/brics/images/brics-pattern.png" alt="" className="w-full h-full object-cover" />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img src="https://brics.br/wp-content/themes/brics/images/logo-brics.png" alt="BRICS Logo" className="w-12 h-12" />
            <h1 className="text-xl font-bold leading-tight">
              Strengthening Global South Cooperation for More Inclusive and Sustainable Governance
            </h1>
          </div>
          <a href="https://brics.br/pt-br" className="text-white hover:text-blue-200 transition-colors duration-200 text-sm">
            Português
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;