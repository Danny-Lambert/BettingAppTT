import mongodb from "mongodb";


const mongoClient = mongodb.MongoClient;

let dbName = "BetMe"; 

const uri = "mongodb+srv://danny:Danny12345@bettingcluster.n04jv.mongodb.net/BetMe?retryWrites=true&w=majority";

export const getCollectionDocuments = async (collectionName) => {
    const mongo = await mongoClient.connect(uri);
    const dataCollection = await mongo.db(dbName).collection(collectionName).find({}).toArray();
    console.log(dataCollection)
    mongo.close() 
    return dataCollection;
}
export const createCollectionDocument = async (collectionName, data) => {
    const mongo = await mongoClient.connect(uri, { useUnifiedTopology: true })
    if (!data._id) {
        data._id = new mongodb.ObjectID().toString();
        await mongo.db(dbName).collection(collectionName).insertOne(data)
    } else {
        updateCollectionDocument(collectionName, data);
    }
    mongo.close();
}
