const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')

const app = express();
const PORT = process.env.PORT || 5000; // Choose your desired port

// MongoDB Atlas URL
const uri = process.env.MONGODB_URI;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define the product schema
const productSchema = new mongoose.Schema({
  id: String,
  name: String,
  bio: String,
  likes: Array,
  dislikes: Array,
  image: String,
});

const Entity = mongoose.model('Entities', productSchema);

// Allow CORS connection to localhost::dev & localshot::preview
const allowedOrigins = ['https://chriscent-qr-d80swxvri-kishonshrill.vercel.app', 'https://chriscent-qr-code.vercel.app/qr-scanner'];
const corsOptions = {
  origin: function (origin, callback) {
    // Check if the origin is in the allowed origins list
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ["POST", "GET"],
  credentials: true
};
app.use(cors(corsOptions));

// Define a route to fetch products
app.get('/api/entities', async (req, res) => {
  try {
    const entities = await Entity.find();
    res.json(entities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});