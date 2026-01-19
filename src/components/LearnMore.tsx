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
    <section className="my-8 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Learn more about BRICS Brasil</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {links.map((link, index) => (
          <a key={index} href={link.url} className="text-blue-600 hover:underline">
            {link.title}
          </a>
        ))}
      </div>
      <p className="mt-4 text-sm text-gray-600">PARTICIPANTS</p>
    </section>
  );
};

export default LearnMore;