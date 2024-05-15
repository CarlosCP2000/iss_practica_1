const express = require("express")
const uri = 'mongodb+srv://carlos1404:RE5ZviZdJPVhpgOV@clusterdb.mqn8rgo.mongodb.net/?retryWrites=true&w=majority&appName=ClusterDB'
const validations_service = require("./services/validations_service");

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
    const discount = validations_service.post(5000, 3);
    console.log(discount);
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
        const discountPromise = validations_service.post(price, gif_card);
        const discount = await discountPromise;

        const product = new productModel({name, price, gif_card, discount});

        const data = await product.save();
        return res.status(201).json(data);
    } catch (error) {
        console.log('Error', error);
        return res.status(500).json({message: 'Internal server error'});
    }
});

app.delete('/product/:id', async (req, res) => {
    try {
        const productId = req.params.id;

        const existingProduct = await productModel.findById(productId);
        if (!existingProduct) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        await existingProduct.remove();

        return res.status(200).json({ message: 'Producto eliminado correctamente' });
    } catch (error) {
        console.log('Error:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

