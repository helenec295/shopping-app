const { MongoClient } = require('mongodb');
const uri =
  'mongodb+srv://helenec:dRG2Oh2QJZB4E7Wm@cluster0.ligbkpb.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(uri);

const database = client.db('test');
const products = database.collection('products');
const orders = database.collection('orders');

module.exports = {
  products,
  orders
};