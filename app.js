const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;


app.get('/random-animal', async (req, res) => {
    try {
        const animalImage = await getRandomAnimalImage();
        res.json({ image: animalImage });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


async function getRandomAnimalImage() {
    const loremPicsumUrl = 'https://picsum.photos/200/300/?random';
    const response = await axios.get(loremPicsumUrl);
    return response.request.res.responseUrl; 
}