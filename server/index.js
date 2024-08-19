const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const multer = require("multer");

const fileController = require('./src/fileController');

const app = express();
app.use(express.json());
app.use(cors());

const upload = multer({ storage: multer.memoryStorage(), 
    limits: { fieldSize: 25 * 1024 * 1024 }
});
// Define routes
app.use('/download/:id', fileController.downloadDocument);
app.use('/view-documents/:id', fileController.viewDocument);
app.use('/converted', upload.single("docxFile"), fileController.convertedFile);

const PORT = process.env.PORT || 5000;

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.get('/', (req, res) => {
    res.send('Server is running');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
