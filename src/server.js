require('dotenv').config()
const express = require('express')
const configViewEngine = require('./config/viewEngine')
const webRoutes = require('./routes/web')
const connection = require('./config/database.js')
const Kitten = require('./models/Kitten.js')


const app = express()
const port = process.env.PORT || 3001
const hostname = process.env.HOST_NAME

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//cấu hình view engine EJS
configViewEngine(app);

app.use("/", webRoutes);

const silence = new Kitten({ name: 'hellooooooo bro , im hansoo' });

silence.save();

(async () => {
    await connection();
    app.listen(port, hostname, () => {
        console.log(`App listening on http://localhost:${port}`)
    })
})()



