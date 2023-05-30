const express = require("express");
const userRoutes = require("./routes/userRoutes");
require('dotenv').config();
const mongoose = require('mongoose');
const app = express();
const PORT = 5000;
const bodyparser = require('body-parser');
const MONGO_URI = "mongodb+srv://jay0x5:gD0VkqYWlM09CeHF@cluster0.6qywtog.mongodb.net/?retryWrites=true&w=majority";
const cors = require("cors");
const corsOptions = {
  origin: '*',
  credentials: true, // access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
// Logger
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
app.use(bodyparser.json());
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));

mongoose.set('strictQuery', true);
// Routes
app.use('/', userRoutes);

// App Start
app.listen(PORT, '0.0.0.0', () => {
  console.log("Listening on Port: " + PORT);
});

// Connect to MongoDB
mongoose.connect(MONGO_URI).then(() => {
  console.log("Connection Established...");
}).catch((err) => {
  console.log(err);
});