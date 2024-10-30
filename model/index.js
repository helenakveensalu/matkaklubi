const { MongoClient } = require("mongodb")

const andmebaas = "matkaklubi"
const salasona = "jfAobl7uo6mAJQNW"
const mongoUrl = `mongodb+srv://matkaklubi:${salasona}@cluster0.izk37.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
const client = new MongoClient(mongoUrl);

async function lisaMatk(uusMatk) {
    try {
        await client.connect();
        const database = client.db(andmebaas);
        const matkad = database.collection("matkad");
        const result = await matkad.insertOne(uusMatk)
        console.log(`A document was inserted with the _id: ${result.insertedId}`)
      } finally {
        await client.close();
      }
     
}

async function loeMatkad() {
    try {
        await client.connect();
        const database = client.db(andmebaas);
        const matkad = database.collection("matkad");
        const result = await matkad.find({}).toArray()
        return result
      } finally {
        await client.close();
      }
     
}

async function lisaRegistreerumine(uusRegistreerumine) {
    try {
        await client.connect();
        const database = client.db(andmebaas);
        const registreerumised = database.collection("registreerumised");
        const result = await registreerumised.insertOne(uusRegistreerumine)
        console.log(`document was inserted with the _id: ${result.insertedId}`)
    } finally {
        await client.close();
    }
}

module.exports = {
    lisaMatk
}

module.exports = {
    lisaRegistreerumine,
    loeMatkad
}