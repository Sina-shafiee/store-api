require('dotenv').config();

const express = require('express');
const connectDB = require('./db/connect');

// custom error handlers
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
    await connectDB(process.env.MONGO_URL);
    app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();
