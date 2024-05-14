const express = require("express")
const uri = 'mongodb+srv://carlos1404:RE5ZviZdJPVhpgOV@clusterdb.mqn8rgo.mongodb.net/?retryWrites=true&w=majority&appName=ClusterDB'

const mongoose = require('mongoose');
mongoose.connect(uri);
const app = express()
app.use(express.json())
const port = 8080
const {productModel} = require('./models');
app.get('/', (req, res) => {
    res.send("I am alive Product");
})

app.get('/product', async (req, res) => {
    const product = await productModel.find({});
    res.json(product);
});
app.get('/product/:_id', async (req, res) => {
    const product = await productModel.find({_id: req.params._id});
    res.json(product);
});
app.post('/product', async (req, res) => {
    try {
        const name = req.body.name;
        const price = req.body.price;
        const gif_card = req.body.gif_card;

        /*API de Validación - Calculo del descuento*/


        const product = new productModel({name, price, gif_card});

        const data = await product.save();
        return res.status(201).json(data);
    } catch (error) {
        console.log('Error', error);
        return res.status(500).json({message: 'Internal server error'});
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

