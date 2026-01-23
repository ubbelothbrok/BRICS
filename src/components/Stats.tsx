const Stats = () => {
  const stats = [
    { number: '11', label: 'Member Countries', icon: '🌍' },
    { number: '40%', label: 'World Population', icon: '👥' },
    { number: '25%', label: 'Global GDP', icon: '💰' },
    { number: '15%', label: 'World Trade', icon: '📈' },
  ];

  return (
    <section className="my-8 bg-[var(--color-bg)] py-8 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-6 text-[var(--color-text)] transition-colors duration-300">BRICS Impact</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-bold text-brics-blue mb-1 transition-colors duration-300">{stat.number}</div>
              <div className="text-sm text-[var(--color-text)] opacity-70 transition-colors duration-300">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;