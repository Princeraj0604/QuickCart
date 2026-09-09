import mongoose from "mongoose";

let cached = global.mongoose
if (!cached) {
    cached = global.mongoose = { conn: null, promise: null }
}

async function connectDB() {
    if (cached.conn) {
        return cached.conn
    }
    if(!cached.promise) {
        const opts = {
            bufferCommands: false,
        }

        // cached.promise = mongoose.connect(`${process.env.MONGODB_URI}/products`, opts).then((mongoose) => {
        //     return mongoose
        // })

        // cached.promise = mongoose.connect(process.env.MONGODB_URI, opts).then((mongoose) => {
        //     return mongoose
        // })

        const uri = process.env.MONGODB_URI;
        if(!uri) {
            throw new Error('MONGODB_URI is not defined');
        }
        cached.promise = mongoose.connect(uri, opts).then((mongoose) => mongoose);
    }

    cached.conn = await cached.promise
    return cached.conn
}

export default connectDB