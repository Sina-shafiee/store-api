require('dotenv').config();

const express = require('express');

// error handler
const errorHandler = require('./middleware/error-handler');
// custom not found response
const notFound = require('./middleware/not-found');

const app = express();

app.get('/', (req, res) => {
  res
    .status(200)
    .send(
      "<h2>welcome to store api</h2> <a href='/api/v1/products'>products route</a>"
    );
});

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();
