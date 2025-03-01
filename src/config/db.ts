import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();

dotenv.config(); //responsible to load environment variables from .env

const connectDB = async () => {
  try {
    console.log("Connecting to mongoDB ...");
    // check if MONGO_URI is present otherwise throw an error
    const mongoURI = process.env.MONGO_URI;

    if (!mongoURI) {
      throw new Error(
        "MONGO_URI is missing or undefined in the .env file .Please verify your .env file to ensure the correct configuration"
      );
    }
    // connect mongoDB using mongoose
    // initial connection
    await mongoose.connect(mongoURI);
    console.log("MongoDB connected succesfully ");

    // handle error after initial connection
    mongoose.connection.on("error", (err) => {
      console.log("Error after initial connection", err.message);
    });

    // handle disconnection
    mongoose.connection.on("disconnection", () => {
      console.error("MongoDb discounted. Attempting to reconnect .... ");
    });
  } catch (error) {
    // catch any connection failure and exist the process
    if (error instanceof Error) {
      console.error("Error connecting to MongoDB", error.message);
    } else {
      console.error("An unexpected error occurred", error);
    }

    // exist the process if the database  connection fails
    process.exit(1);
  }
};

export default connectDB;
