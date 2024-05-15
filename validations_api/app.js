const express = require("express")

const app = express()
app.use(express.json())
const port = 8080
app.get('/', (req, res) => {
    res.send("I am alive Validations");
})

app.post('/valid/adult', async (req, res) => {
    const birthday = req.body.birthday;
    const dateBirthday =  new Date(birthday);
    const currentDate = new Date();
    const ageValidate = currentDate.getFullYear() - dateBirthday.getFullYear();

    res.json(ageValidate >= 18);
});

app.post('/valid/discount', async (req, res) => {
    try {
        const price = req.body.price;
        const discount = req.body.discount;

        if (discount < 0 || discount > 100) {
            return res.status(500).json({message: 'El porcentaje de descuento debe estar entre 0 y 100.'});
        }

        const priceDiscount = (price * discount) / 100;

        return res.status(201).json(priceDiscount);
    } catch (error) {
        console.log('Error', error);
        return res.status(500).json({message: 'Internal server error'});
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

