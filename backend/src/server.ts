import express from 'express';
const app = express();
const port = 5005;

app.get('/', (req, res) => {
  res.send('🩷');
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
