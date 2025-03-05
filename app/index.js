const express = require('express');
const mongoose = require('mongoose');
const movieRoutes = require('./routes/movies');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());

mongoose.connect('mongodb://mongodb:27017/mflix', { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB', err));

app.use(express.json());
app.use('/api/movies', movieRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, '0.0.0.0', () => {
  console.log(`App listening at http://localhost:${port}`);
});
