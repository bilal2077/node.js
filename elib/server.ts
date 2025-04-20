import { connect } from "http2";
import app from "./src/app";
import { config } from "./src/config/config";
import connectDB from "./src/config/db";
import { access } from "fs";

// import statement removed as it was incomplete

const startServer = async() => {
    await connectDB();
    const port = config.port || 3000;

    app.listen(port, () => {
        console.log(`Listening on port: ${port}`);
        
    });
};

startServer();