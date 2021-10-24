import * as mongoDB from 'mongodb';
import * as dotenv from 'dotenv';

export const collections: { fileData?: mongoDB.Collection } = {};

export async function connectToDatabase(): Promise<void> {
  dotenv.config();

  const client: mongoDB.MongoClient = new mongoDB.MongoClient(
    process.env.DB_CONN_STRING as string
  );

  await client.connect();

  const db: mongoDB.Db = client.db(process.env.DB_NAME as string);

  const fileDataCollection: mongoDB.Collection = db.collection(
    process.env.FILE_DATA_COLLECTION_NAME as string
  );

  collections.fileData = fileDataCollection;

  console.log(
    `Successfully connected to database: ${db.databaseName} and collection: ${fileDataCollection.collectionName}`
  );
}
