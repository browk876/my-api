import express from 'express';
import fetch from 'node-fetch';
import axios from 'axios';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const port = process.env.PORT || 5500;

// Serve static files including client.js
app.use(express.static(path.join(__dirname, 'public')));

app.get('/*', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.listen(port, () => {
    console.log(`CatLiesAPI app listening on port ${port}`);
});