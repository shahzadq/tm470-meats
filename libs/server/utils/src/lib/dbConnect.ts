// Copied from https://github.com/vercel/next.js/blob/canary/examples/with-mongodb-mongoose/lib/dbConnect.js
// Modified for Typescript
// Modified to remove caching in dev - not needed

import * as mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

async function dbConnect() {
  const opts = {
    bufferCommands: false,
    keepAlive: true,
  };

  const conn = mongoose
    .connect(MONGODB_URI as string, opts)
    .then((mongoose) => {
      return mongoose;
    });

  return { conn };
}

export default dbConnect;
