const Stats = () => {
  const stats = [
    { number: '11', label: 'Member Countries', icon: '🌍' },
    { number: '40%', label: 'World Population', icon: '👥' },
    { number: '25%', label: 'Global GDP', icon: '💰' },
    { number: '15%', label: 'World Trade', icon: '📈' },
  ];

  return (
    <section className="my-8 bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-6">BRICS Impact</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-bold text-blue-900 mb-1">{stat.number}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;