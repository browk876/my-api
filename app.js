// Import the express library and assign it to a variable
import express from 'express';
import fetch from 'node-fetch';
import axios from 'axios';
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create an instance of an express application 
const app = express()

// Set the port the application will be running on
const port = process.env.PORT || 5500;

app.use(express.static(path.join(__dirname, 'public')));


app.get('/*', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  })
  
  // Set the application to listen on a port
  app.listen(port, () => {
      console.log(`Wskb app listening on port ${port}`);
  });

  async function fetchRandomCat() {
    const catImageContainer = document.getElementById('catImageContainer');
    const catLieElement = document.getElementById('catLie');
    catImageContainer.innerHTML = ''; 
    catLieElement.textContent = ''; 
  
    try {
      const response = await fetch('https://api.thecatapi.com/v1/images/search');
      const data = await response.json();
  
      if (response.ok) {
        const imageUrl = data[0].url;
        const catImage = document.createElement('img');
        catImage.src = imageUrl;
        catImage.alt = 'Random Cat';
        catImageContainer.appendChild(catImage);
  
        const catLies = [
            "This cat once won a chess competition!",
            "It can speak three languages, including Spanish and Aramaic .",
            "This cat is a secret agent on a mission.",
            "It's the CEO of Microsoft.",
            "Once starred in Grey's Anatomy.",
            "This cat is wanted by the FBI",
            "Wrote a dissertation on the Israel-Palestine conflict",
            "Allergic to bees and shellfish",
            "Is a member of the Sinaloa Cartel",
            "This cat won a silver medal in the 2004 Olympic long jump"
        ];
  
        const randomLie = catLies[Math.floor(Math.random() * catLies.length)];
        catLieElement.textContent = randomLie;
      } else {
        console.error(`Failed to fetch cat image. Status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error fetching cat image:', error.message);
    }
  }