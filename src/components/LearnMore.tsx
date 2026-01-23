const LearnMore = () => {
  const links = [
    { title: 'Brazilian Presidency', url: '#' },
    { title: 'BRICS Previous Summits', url: '#' },
    { title: 'Areas of Cooperation', url: '#' },
    { title: 'New Development Bank', url: '#' },
    { title: 'Frequently Asked Questions', url: '#' },
    { title: 'BRICS Data', url: '#' },
  ];

  return (
    <section className="my-8 bg-[var(--color-card-bg)] p-6 rounded shadow transition-colors duration-300">
      <h2 className="text-2xl font-bold mb-4 text-[var(--color-text)] transition-colors duration-300">Learn more about BRICS Brasil</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {links.map((link, index) => (
          <a key={index} href={link.url} className="text-brics-blue hover:underline hover:text-brics-blue/80 transition-colors">
            {link.title}
          </a>
        ))}
      </div>
      <p className="mt-4 text-sm text-[var(--color-text)] opacity-70 transition-opacity duration-300">PARTICIPANTS</p>
    </section>
  );
};

export default LearnMore;