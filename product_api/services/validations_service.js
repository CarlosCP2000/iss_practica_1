const axios = require("axios");
module.exports={

    post: async function(price, discount) {
        try {
            const response = await axios.post("http://validations_api:8080/valid/discount/", { price, discount });
            return response.data;
        } catch (error) {
            console.error("Error en la solicitud POST:", error);
            throw error;
        }
    }

}