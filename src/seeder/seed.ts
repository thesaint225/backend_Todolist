import * as fs from "fs";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import { TodoSchema } from "../validation/todoValidation";
import { TodoUpdateSchema } from "../validation/TodoUpdateSchema";
import Todo from "../models/todoApp";
import { unknown, z } from "zod";
import path from "path";

// load env

const result = dotenv.config();

if (result.error) {
  console.error("❌ Failed to load .env file:", result.error.message);
  process.exit(1);
}
// Ensure MONGO_URI is defined
const mongoUri: string | undefined = process.env.MONGO_URI;
if (!mongoUri) {
  console.error("❌ MONGO_URI is not defined in the .env file.");
  process.exit(1);
}
mongoose
  .connect(mongoUri)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => {
    console.error(`❌ MongoDB connection failed: ${err.message}`);
    process.exit(1);
  });

//   read the json file
const todoFilePath = path.join(__dirname, "../data", "todo.json");
if (!fs.existsSync(todoFilePath)) {
  console.error(`❌ File not found: ${todoFilePath}`);
  process.exit(1);
}

let todos = unknown[]