export default function Hero() {
  return (
    <section className="relative w-full h-screen min-h-[700px] flex items-center overflow-hidden">

      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1483729558449-99ef09a8c325?q=80&w=2670&auto=format&fit=crop"
          alt="Rio de Janeiro Sunset"
          className="w-full h-full object-cover object-center brightness-75"
        />
        {/* Gradient Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>
      </div>

      {/* Geometric Shapes Overlay Removed */}

      <div className="relative z-20 max-w-[1400px] mx-auto px-6 lg:px-12 w-full pt-20">
        <div className="max-w-4xl">
          <h1 className="text-5xl md:text-[4rem] font-bold text-white leading-[1.1] mb-8 tracking-tight drop-shadow-sm">
            Strengthening Global South Cooperation for More Inclusive and Sustainable Governance
          </h1>

          <div>
            <button className="px-8 py-3.5 border border-white text-white rounded-full font-medium text-lg hover:bg-white hover:text-black transition-all duration-300">
              Know more about the BRICS
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}