// Import libraries using 'import' syntax
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
const app = express();

// Configure CORS
const corsOptions = {
  origin: "http://localhost:5174",
  credentials: true,
};

app.use(bodyParser.json());
app.use(cors(corsOptions));

// MongoDB Connection
mongoose
  .connect("mongodb://localhost:27017/your_database_name")
  .then(() => console.log("Connected to MongoDB"));

// Temporary Schema
const dummySchema = new mongoose.Schema({}, { strict: false });
const Dummy = mongoose.model("Dummy", dummySchema);

// Get Data with Search and Pagination
app.get("/api/data", async (req, res) => {
  const { page = 1, limit = 10, search = "" } = req.query;

  // Calculate skip for pagination
  const skip = (page - 1) * limit;

  // Search filter
  const searchQuery = {
    title: { $regex: search, $options: "i" },
  };

  try {
    const results = await Dummy.find(searchQuery)
      .limit(parseInt(limit))
      .skip(skip);
    const total = await Dummy.countDocuments(searchQuery);

    res.json({
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      data: results,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the Server
const PORT = 3000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
