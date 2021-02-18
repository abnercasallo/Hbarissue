//para usar variables de control se usa dotenv
//1.instalamos en el terminal con: npm i dotenv, previamente: npm init --yes, //ojo el name no debe tener mayúscula
//2.npm i @hashgraph/sdk@^2 para la versión2
// CORRER: node index.js
require('dotenv').config();

const {Client, AccountId, PrivateKey, TokenCreateTransaction}= require("@hashgraph/sdk");

async function main(){

    //configurando a nuestro cliente
    const operatorKey= PrivateKey.fromString(process.env.PRIVATE_KEY);
    const operatorId= AccountId.fromString(process.env.ACCOUNT_ID);
    let client= Client.forTestnet();
    client.setOperator(operatorId, operatorKey);

    //Crear un nuevo HTS Token
    var createTokenTx = await new TokenCreateTransaction()
     .setTokenName("ejemplo1")
     .setTokenSymbol('ej.1')
     .setDecimals(0)
     .setInitialSupply(100) //100 tokens iniciales
     .setTreasuryAccountId(operatorId)
     .execute(client);

     var createReceipt= await createTokenTx.getReceipt(client);
     var newTokenId= createReceipt.newTokenId;

     console.log('new token id:', newTokenId.toString());

}
main();