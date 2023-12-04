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

app.get('/random-animal', async (req, res) => {
    try {
        const animalImage = await getRandomAnimalImage();
        res.json({ image: animalImage });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
// Set the application to listen on a port
app.listen(port, () => {
    console.log(`Wskb app listening on port ${port}`);
});

async function getRandomAnimalImage() {
    const loremPicsumUrl = 'https://picsum.photos/200/300/?random';
    const response = await axios.get(loremPicsumUrl);
    return response.request.res.responseUrl; 
}
