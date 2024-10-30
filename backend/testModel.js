import mongoose from "mongoose";

const testSchema = new mongoose.Schema({
  title: String,
  content: String,
});

const Test = mongoose.model("Test", testSchema);
