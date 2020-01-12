const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

// DB setup
mongoose.connect('mongodb://localhost/students-directory', {
  useNewUrlParser: true
});

// Middlewares
app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({ type: '*/*' }));
router(app);

app.listen(port, () => console.log(`Listening on port ${port}`));
