import mongoose from 'mongoose';
const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) throw new Error('MONGO_URI not set');

let cached = global._mongo;
if (!cached) cached = global._mongo = { conn: null, promise: null };

export async function connectDB() {
  if (cached.conn) return cached.conn;
    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGO_URI).then(m => m.connection);
          }
            cached.conn = await cached.promise;
              return cached.conn;
              }