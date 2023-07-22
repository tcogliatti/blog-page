// ficher de configuracion de Mongoose para conectarnos con nuestra DB de mongo en la nube

const mongoose = require("mongoose");
const {
    DB_USER,
    DB_PASS,
    DB_HOST,
    API_VERSION,
    IP_SERVER
} = require("./constants");
const app = require("./app");
const PORT = process.env.POST || 3977;

async function connectToDataBase() {
    try {
        await mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/`, {
            // await mongoose.connect('mongodb://localhost:27017/mydatabase', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        // mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASS}>@${DB_HOST}/`);
        console.log("database connection successful");

        app.listen(PORT, () => {
            console.log("########################");
            console.log("####### API REST #######");
            console.log("########################");
            console.log(`http://${IP_SERVER}:${PORT}/api/${API_VERSION}`);
        })

    } catch (error) {

        if (error) throw error;
    }
}
connectToDataBase();