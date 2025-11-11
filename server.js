import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import Listing from "./models/listings.js";

const app = express();
const __dirname = path.resolve();

// Middlewares
app.use(express.json());
app.use(cors());

// Serve frontend
app.use(express.static(path.join(__dirname, "frontend")));

// MongoDB connection
mongoose
  .connect("mongodb://127.0.0.1:27017/DBMS_CP")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ DB Error:", err));

// Home route → serve frontend
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

// Get all listings
app.get("/listings", async (req, res) => {
  try {
    const listings = await Listing.find();
    res.json(listings);
  } catch (err) {
    res.status(500).json({ error: "Error fetching listings" });
  }
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
