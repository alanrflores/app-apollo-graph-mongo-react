//esto apenas arranque la aplicación va a leer el archivo .env
require('dotenv').config();

const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs } = require('./typeDefs/typeDefs.js');
const { resolvers } = require('./resolvers/resolvers.js');
const { graphql } = require('graphql');
const { connectDb } = require('./db.js');
const auth = require('./utils/auth.js');
const AuthDirective = require('./utils/AuthDirective.js')
const { makeExecutableSchema } = require('@graphql-tools/schema');
const getUserFromRequest = require('./getRequestUser/getUserFromRequest.js');
const mercadopago = require('mercadopago');
const bodyParser = require('body-parser');
const { payment } = require('mercadopago');

const app = express();
connectDb();

//configure the SDK
mercadopago.configure({ access_token: process.env.MP_ACCESS_KEY});
app.use(bodyParser.urlencoded({ extended: true })); //extended por deprecación
app.use(bodyParser.json());
app.use((_req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
  
    next();
  });
app.get('/', (req, res) => res.send('Welcome to my api'));


app.use('/create-payment', async(req, res) => {
const prod = req.body
console.log('prod', prod)

let preference = {
    back_urls: {
       success: 'http://localhost:3000/success',
       failure: '',
       pending: '',
    },
    items: [
    {   
        title: prod.title,
        description: prod.description,
        picture_url: prod.images,
        quantity: 1,
        currency_id: 'USD',
        unit_price:200,
    }
],
    auto_return: 'approved',
    binary_mode: true,
    notification_url: 'https://2418-181-45-230-62.sa.ngrok.io/notificacion'
}
mercadopago.preferences
.create(preference)
.then(response => res.send({response}))
.catch(error => res.status(400).send({error: error.message}))
});

app.get('/success', (req, res) => {
    res.status(200).send('Felicidades por tu compra!')
});
app.use('/notificacion/:userId/:productoId', async(req, res) => {
    console.log('notificar');
    const { query } = req;
    const { params } = req;
    // console.log({body, query});
    const topic = query.topic || query.type;
    // console.log({ topic })
    console.log({ params })
    switch (topic) {
        case "payment":
            const paymentId = query.id || query['data.id'];
            // console.log(topic, 'getting payment', paymentId);
            const payment = await mercadopago.payment.findById(paymentId);
             console.log('paymentAlan', payment.body);
            var { body } = await mercadopago.merchant_orders.findById(payment.body.order.id);
            break;
        case "merchant_order":
            const orderId = query.id;
            // console.log(topic, 'getting merchant order', orderId);
            var { body } = await mercadopago.merchant_orders.findById(orderId);
            break;
    }
     console.log('merchartBodyAlan', body.payments);
    //suma de las transacciones aprobadas
    let paymentAmount = 0;
    body.payments.forEach(payment => {
     if(payment.status === 'approved'){
        paymentAmount += payment.transaction_amount;
     }
    });
    if(paymentAmount >= body.total_amount){
        console.log('Pago realizado!!');
        // console.log(`user with ID: ${params.userId}, buy product: ${body.payments.id}`)
    }else{
        console.log('Pago NO realizado!!')
    }
    res.send();
  });


const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});

async function start() {
    
    const server = new ApolloServer({
        schema,
        context: ({req}) => ({
            user: getUserFromRequest(req),
        }),
    });

    await server.start();
    server.applyMiddleware({app, path: '/graphql'})
   
    app.listen(process.env.PORT, () => {
        console.log(`Server running on ${process.env.PORT}`);
      });  
};

start();


