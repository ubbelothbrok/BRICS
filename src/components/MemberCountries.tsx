export default function MemberCountries() {
  const members = [
    { name: 'Brazil', code: 'br', role: 'Presidency 2025' },
    { name: 'Russia', code: 'ru', role: 'Member' },
    { name: 'India', code: 'in', role: 'Member' },
    { name: 'China', code: 'cn', role: 'Member' },
    { name: 'South Africa', code: 'za', role: 'Member' },
    { name: 'Egypt', code: 'eg', role: 'New Member' },
    { name: 'Ethiopia', code: 'et', role: 'New Member' },
    { name: 'Iran', code: 'ir', role: 'New Member' },
    { name: 'UAE', code: 'ae', role: 'New Member' },
  ];

  return (
    <section id="participants" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-[var(--color-brics-blue)] font-semibold tracking-wide uppercase text-sm">Our Global Community</span>
          <h2 className="mt-2 text-4xl font-bold text-[var(--color-brics-dark)]">Member Countries</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[var(--color-brics-green)] to-[var(--color-brics-yellow)] mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {members.map((member) => (
            <div key={member.name} className="group relative bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-6 flex flex-col items-center border border-gray-100 hover:border-[var(--color-brics-green)]">
              <div className="w-16 h-16 rounded-full overflow-hidden shadow-sm mb-4 border border-gray-100 group-hover:scale-110 transition-transform duration-300">
                <img
                  src={`https://flagcdn.com/${member.code}.svg`}
                  alt={`${member.name} flag`}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-bold text-[var(--color-brics-dark)] mb-1">{member.name}</h3>
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${member.role.includes('Presidency') ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                {member.role}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}