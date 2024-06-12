const { MongoClient } = require('mongodb');

async function main() {
  const uri = "mongodb+srv://pedropaino:20032005@qrcode.plq0dcb.mongodb.net/?retryWrites=true&w=majority&appName=QRCODE";
  const client = new MongoClient(uri);

  try {
    // Conectar ao MongoDB
    await client.connect();
    console.log("Connected to MongoDB");

    const database = client.db("nomeDoBanco");
    const diplomas = database.collection("diplomas");

    // Adicionar um diploma
    const diplomaDoc = {
      nome: "Maria Silva",
      curso: "Engenharia de Software",
      dataConclusao: new Date("2024-06-15"),
      valid: true
    };

    const result = await diplomas.insertOne(diplomaDoc);
    console.log(`Diploma inserido com o _id: ${result.insertedId}`);

    // Buscar um diploma
    const query = { _id: result.insertedId };
    const diploma = await diplomas.findOne(query);
    console.log("Diploma encontrado:", diploma);

  } catch (e) {
    console.error(e);
  } finally {
    // Fechar a conexão com o MongoDB
    await client.close();
  }
}

main();
