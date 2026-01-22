import { useState, useEffect } from 'react';

const slides = [
  {
    image: "/hero_corousel/1.jpg",
    title: "Unveiling the Horizons of Tomorrow",
    subtitle: "Pragyaan 2026 stands as a beacon of technological advancement, inviting participants to explore immersive realities and the future of digital interaction."
  },
  {
    image: "/hero_corousel/2.jpg",
    title: "Cultivating Innovation and Skill Development",
    subtitle: "Through comprehensive workshops and hands-on modules, we empower the next generation of thinkers to experiment, create, and master the art of engineering."
  },
  {
    image: "/hero_corousel/3.jpg",
    title: "A Convergence of Minds and Ideas",
    subtitle: "Bringing together students, educators, and industry experts in a dynamic ecosystem that encourages curiosity, dialogue, and the shared pursuit of knowledge."
  }
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section className="relative w-full h-screen min-h-[700px] overflow-hidden bg-black">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
        >
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover object-center brightness-50"
              style={{ transform: index === 2 ? 'scaleX(-1)' : 'none' }}
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
          </div>

          {/* Content */}
          <div className="relative z-20 max-w-[1400px] mx-auto px-6 lg:px-12 w-full h-full flex items-center pt-20">
            <div className="max-w-4xl">
              <h1 className={`text-5xl md:text-[5rem] font-bold text-white leading-[1.1] mb-6 tracking-tight drop-shadow-sm transition-all duration-1000 delay-300 transform ${index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                {slide.title}
              </h1>
              <p className={`text-2xl text-gray-200 mb-8 max-w-2xl transition-all duration-1000 delay-500 transform ${index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                {slide.subtitle}
              </p>

              <div className={`transition-all duration-1000 delay-700 transform ${index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <button className="px-8 py-3.5 border-2 border-white text-white rounded-full font-bold text-lg hover:bg-white hover:text-black transition-all duration-300 cursor-pointer">
                  See Schedule
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Indicators */}
      <div className="absolute bottom-10 left-0 right-0 z-30 flex justify-center gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${currentSlide === index ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/80'
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}