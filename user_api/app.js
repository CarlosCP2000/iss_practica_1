const express = require("express")
const uri = 'mongodb+srv://carlos1404:RE5ZviZdJPVhpgOV@clusterdb.mqn8rgo.mongodb.net/?retryWrites=true&w=majority&appName=ClusterDB'

const mongoose = require('mongoose');
mongoose.connect(uri);
const app = express()
app.use(express.json())
const port = 8080
const {userModel} = require('./models');
app.get('/', (req, res) => {
    res.send("I am alive User");
})

app.get('/user', async (req, res) => {
    const user = await userModel.find({});
    res.json(user);
});
app.get('/user/:dni', async (req, res) => {
    const user = await userModel.find({dni: req.params.dni});
    res.json(user);
});
app.post('/user', async (req, res) => {
    try {
        const dni = req.body.dni;
        const name = req.body.name;
        const lastname = req.body.lastname;
        const birthday = req.body.birthday;

        /*API de Validación - Mayor de edad*/


        const user = new userModel({dni, name, lastname, birthday});

        const data = await user.save();
        return res.status(201).json(data);
    } catch (error) {
        console.log('Error', error);
        return res.status(500).json({message: 'Internal server error'});
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

