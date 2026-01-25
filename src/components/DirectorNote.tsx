export default function DirectorNote() {
    return (
        <section className="py-20 bg-[var(--color-bg)] transition-colors duration-300">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
                <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">

                    {/* Image Section */}
                    <div className="w-full md:w-1/2 relative group">
                        <div className="absolute inset-0 bg-brics-blue rounded-2xl transform translate-x-3 translate-y-3 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-300"></div>
                        <img
                            src="director.png"
                            alt="Director IIT Jammu"
                            className="relative w-full rounded-2xl shadow-xl object-cover aspect-[4/3] z-10"
                        />
                    </div>

                    {/* Content Section */}
                    <div className="w-full md:w-1/2">
                        <h4 className="text-brics-blue font-bold tracking-widest uppercase mb-2">Welcome</h4>
                        <h2 className="text-4xl font-bold text-[var(--color-text)] mb-6 transition-colors duration-300">From the Director's Desk</h2>

                        <div className="space-y-6 text-[var(--color-text)] opacity-80 leading-relaxed text-lg transition-colors duration-300">
                            <p>
                                "It gives me immense pleasure to welcome you all to <span className="text-brics-blue font-bold">Pragyaan 2026</span>. At IIT Jammu, we believe that innovation flourishes when young minds are given the freedom to explore, question, and create.
                                This Open Day is not just an event; it is a bridge connecting the aspirations of school students with the limitless possibilities of science and technology. We are opening our doors to foster a culture of curiosity and collaboration across the region."
                            </p>
                        </div>

                        <div className="mt-8 pt-8 border-t border-[var(--color-text)]/10 transition-colors duration-300">
                            <p className="text-xl font-bold text-[var(--color-text)] transition-colors duration-300">Prof. Manoj Singh Gaur</p>
                            <p className="text-brics-blue font-medium">Director, IIT Jammu</p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
