import { useState, useEffect } from 'react';

const slides = [
  {
    image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=2670&auto=format&fit=crop",
    title: "Pragyaan 2026: An Open Day",
    subtitle: "Join us on 14th-15th Feb, 2026 at IIT Jammu for a celebration of Science & Technology."
  },
  {
    image: "https://images.unsplash.com/photo-1564951434112-64d74cc2a2d7?q=80&w=2670&auto=format&fit=crop",
    title: "Igniting Young Minds",
    subtitle: "Targeting 5000+ students from 85+ schools across J&K to foster innovation."
  },
  {
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2670&auto=format&fit=crop",
    title: "Innovation Meets Tradition",
    subtitle: "A convergence of STEM, Arts, and Culture to inspire the next generation."
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