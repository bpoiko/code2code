require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

app.post('/generate', async (req, res) => {
    console.log('⚡ /generate hit:', req.body); // debugging trying to make sure im actually generating something
  const { language, difficulty = 'easy' } = req.body;

  const prompt = `Generate a ${difficulty}-level coding challenge in ${language}. Only give the problem description.`;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ]
      })
    });

    const data = await response.json();
    console.log(' 🐐  OpenAI response:', data);

    if (data.choices && data.choices.length > 0) {
      res.json({ question: data.choices[0].message.content });
    } else {
      res.status(500).json({ error: 'No response from OpenAI.' });
    }
} catch (err) {
  console.error(' 😔 OpenAI error:', err.response?.data || err.message || err);
  res.status(500).json({ error: 'OpenAI generation failed.' });
}
});

app.listen(3001, () => {
  console.log('Woohoo Backend running at http://localhost:3001');
});
