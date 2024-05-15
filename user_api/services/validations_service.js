const axios = require("axios");
module.exports={

    post: async function(birthday) {
        try {
            const response = await axios.post("http://validations_api:8080/valid/adult/", { birthday });
            return response.data;
        } catch (error) {
            console.error("Error en la solicitud POST:", error);
            throw error;
        }
    }

}