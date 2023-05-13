import mongoose from 'mongoose';
import type { MongoClientOptions } from 'mongodb';


const cle: string = process.env.NEXT_PUBLIC_MONGODB_URI || '';

if(!cle){
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}



/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */

// @ts-ignore
let cached = global.mongooseConnected;

if(!cached) {
    // @ts-ignore
    cached = global.mongooseConnected = { conn: null, promise: null };
}

dbConnect().then(() => {
    console.log('db connected');
}).catch((error) => {
    console.log('Error connecting to MongoDB.');
    console.log(error);
})

async function dbConnect(){
    if(cached.conn) {return cached.conn};
    if(!cached.promise) {
        const opts = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
        mongoose.set("strictQuery", false);
        // @ts-ignore
        cached.promise = await mongoose.connect(cle as string, opts).then(mongoose => {
            mongoose.set('strictQuery', true);
            return mongoose;
        })
    }
    cached.conn = await cached.promise;
    return cached.conn;
}

export default dbConnect;