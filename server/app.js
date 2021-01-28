import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import {getCollectionDocuments, createCollectionDocument} from "./database.js";


const app = express()

app.use(cors())
app.use(bodyParser.json())

//from dannysnodeapi file
let users = [];
// GET endpoint which returns/sends all our users in the response
app.get('/', async (request, response) => {
    const users = await getCollectionDocuments(' inPlay')
    response.send(users);
})
// POST endpoint which takes the user from the request body and saves it...
app.post('/create', async (request, response) => {
    const newUser = request.body;
    await createCollectionDocument(' inPlay', newUser);
    response.send({message: "We created this user...."})
})
// Finally! Listen on Port 8080
app.listen(8080, () => {
    console.log("port running")
})