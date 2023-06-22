const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 3006;

app.use(cors());

app.get('/search-emails', async (req, res) => {
  try {
    const searchTerm = req.query.searchTerm || '';

    const options = {
      method: 'GET',
      url: 'https://email-address-search.p.rapidapi.com/',
      params: {
        type: 'EMAIL',
        q: searchTerm,
        pagenum: '1'
      },
      headers: {
        'content-type': 'application/json',
        'Content-Security-Policy': "script-src 'self' 'https://ssl.google-analytics.com';",
        'X-RapidAPI-Key': '6c4153b579msh3b88fb9e42fb3dap1c3822jsn700d8fa34f4a',
        'X-RapidAPI-Host': 'email-address-search.p.rapidapi.com'
      }
    };

    const response = await axios.request(options);
    const data = response.data;

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
