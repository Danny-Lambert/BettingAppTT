import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import {getCollectionDocuments, createCollectionDocument} from "./database.js";
import dotenv from "dotenv";


dotenv.config();
console.log(process.env);
const app = express()

app.use(cors())
app.use(bodyParser.json())


app.get('/', async (request, response) => {
    const returnedData = await getCollectionDocuments('Sports')
    response.send(returnedData);
})
app.post('/createsports', async (request, response) => {
    const newEntry = request.body;
    await createCollectionDocument('Sports', newEntry);
    response.send({message: "We created a new sports entry...."})
})
app.post('/createfixtures', async (request, response) => {
    const newEntry = request.body;
    await createCollectionDocument('Fixtures', newEntry);
    response.send({message: "We created a new fixtures entry...."})
})
app.listen(8080, () => {
    console.log("port running")
})