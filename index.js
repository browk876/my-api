import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fetch from 'node-fetch';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const port = process.env.PORT || 5500;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(express.static(path.join(__dirname, 'public')));


app.get('/api/cat', async (req, res) => {
  try {
    const catApiResponse = await fetch('https://api.thecatapi.com/v1/images/search');
    const catData = await catApiResponse.json();

    if (catApiResponse.ok) {
      const imageUrl = catData[0].url;

      const catLies = [
        "This cat once won a chess competition!",
        "It can speak three languages, including Spanish and Aramaic.",
        "This cat is a secret agent on a mission.",
        "It's the CEO of Microsoft.",
        "Once starred in Grey's Anatomy.",
        "This cat is wanted by the FBI.",
        "Wrote a dissertation on the Israel-Palestine conflict.",
        "Allergic to bees and shellfish.",
        "Is a member of the Sinaloa Cartel.",
        "This cat won a silver medal in the 2004 Olympic long jump."
      ];

      const randomLie = catLies[Math.floor(Math.random() * catLies.length)];

      res.json({
        imageUrl,
        catLie: randomLie
      });
    } else {
      console.error(`Failed to fetch cat image. Status: ${catApiResponse.status}`);
      res.status(catApiResponse.status).json({ error: 'Failed to fetch cat image' });
    }
  } catch (error) {
    console.error('Error fetching cat image:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`Your web server is running on port ${port}`);
});