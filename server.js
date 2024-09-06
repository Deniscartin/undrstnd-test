const express = require('express');
const axios = require('axios');
const cors = require('cors');


const app = express();
app.use(express.json());
app.use(cors());

app.post('/api/chat', async (req, res) => {
  const { modelId, messages, stream = false } = req.body;

  try {
    const response = await axios.post(
      `https://dev.undrstnd-labs.com/api/models/${modelId}/predict`,
      {
        stream,
        system: 'undrstnd',
        messages,
      },
      {
        headers: {
          'x-api-key': 'udsk_tdIQoNq1IZTMlAZNyDWXWGdyb3FYfzmwvyppUB5LB',
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
