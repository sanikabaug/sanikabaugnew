import mongoose from "mongoose";

const connection = {};

async function connect() {
    if (connection.isConneccted) {
        return;
    }
    if (mongoose.connection.length > 0) {
        connection.isConneccted = mongoose.connections[0].readyState;
        if (connection.isConneccted === 1) {
            return;
        }
        await mongoose.disconnect();
    }
    const db = await mongoose.connect(process.env.MONGO_URL);
    connection.isConneccted = db.connections[0].readyState;
    console.log("DB is connected");
}

    async function disconnect() {
        if (connection.isConneccted) {
            if (process.env.NODE_ENV === 'production') {
                await mongoose.disconnect();
                connection.isConneccted = false;
                // console.log("DB is disconnect");
            }
        }
    }

const db = { connect, disconnect };
export default db;