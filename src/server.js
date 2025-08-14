import express from 'express';

const app = express()

const hostname = 'localhost';
const port = 5000;

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>');
})

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});