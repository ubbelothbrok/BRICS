const mongoose = require('mongoose');
const News = require('./models/News');

require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/brics', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log('Connected to MongoDB');

  const sampleNews = [
    {
      title: 'SHERPAS Brasil Hands Over BRICS Presidency to India',
      summary: 'Brazil passes the presidency to India in a ceremonial handover event.',
      content: 'Full content here.',
      link: '#',
      image: 'https://brics.br/wp-content/uploads/2024/12/brics-presidency-handover.jpg'
    },
    {
      title: 'BRICS Policy Center Debates Brasil–China Relations',
      summary: 'Experts discuss finance, AI, and green transition at the policy center.',
      content: 'Full content here.',
      link: '#',
      image: 'https://brics.br/wp-content/uploads/2024/12/brics-policy-center.jpg'
    },
    {
      title: 'BRICS United by Global Standards',
      summary: 'Harmonizing trade and environmental rules at the BRICS meeting.',
      content: 'Full content here.',
      link: '#',
      image: 'https://brics.br/wp-content/uploads/2024/12/brics-global-standards.jpg'
    },
  ];

  await News.insertMany(sampleNews);
  console.log('Sample news added');
  process.exit();
})
.catch(err => console.log(err));