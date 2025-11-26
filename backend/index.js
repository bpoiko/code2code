// index.js
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch'; // trying other way

dotenv.config()


const app = express();
app.use(cors());
app.use(express.json());

app.post('/generate', async (req, res) => {
  console.log('/generate hit:', req.body);
  const { language, difficulty = 'easy' } = req.body;

  const prompt = `Generate a ${difficulty}-level coding challenge in ${language}. Only give the problem description, with brief test cases`;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.KEY}`,

      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 320,
      }),
    });

    const data = await response.json();
    console.log('OpenAI response:', data);

    if (data.choices && data.choices.length > 0) {
      res.json({ question: data.choices[0].message.content });
    } else {
      res.status(500).json({ error: 'No response from OpenAI.' });
    }
  } catch (err) {
    console.error('😔 OpenAI error:', err.response?.data || err.message || err);
    res.status(500).json({ error: 'OpenAI generation failed.' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
