import { connect } from "http2";
import { config } from "./config";
import mongoose, { mongo } from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("Conceded  to DataBase successfully");
    });

      mongoose.connection.on("error", (err) => {
        console.log("Error in connecting to DataBase", err);
     
    });

    await mongoose.connect(config.dataBaseUrl as string);

    
  } catch (err) {
    console.error("failed to connect to DataBase", err);

    process.exit(1);
  }
};

export default connectDB;
