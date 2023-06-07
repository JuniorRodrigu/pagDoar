
const bodyParser = require('body-parser');
const twilio = require('twilio');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());
const accountSid = 'ACca6ad5ddc85bc3e89dbf60d1cdac693a';
const authToken = 'ce0dad0c282c8e875701e261a5b0f202';
const client = new twilio(accountSid, authToken);

app.post('/send-sms', async (req, res) => {
  const { numero } = req.body;

  try {
    const message = await client.messages.create({
      body: 'teste',
      from: '+13203773783',
      to: numero,
    });

    res.status(200).send(message.sid);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
