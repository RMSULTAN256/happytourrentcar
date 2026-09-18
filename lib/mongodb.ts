import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!uri) {
  // Lazy rejection so build step succeeds without unhandledRejection noise when env var is absent
  clientPromise = Promise.reject(new Error('Please add your Mongo URI to .env.local'));
  clientPromise.catch(() => {});
} else if (process.env.NODE_ENV === 'development') {
  // Memberitahu TypeScript bahwa objek global memiliki properti _mongoClientPromise
  const globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;