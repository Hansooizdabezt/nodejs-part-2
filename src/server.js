require('dotenv').config()
const express = require('express')
const configViewEngine = require('./config/viewEngine')
const webRoutes = require('./routes/web')
const apiRoutes = require('./routes/api')
const connection = require('./config/database.js')


const app = express()
const port = process.env.PORT || 3001
const hostname = process.env.HOST_NAME

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//cấu hình view engine EJS
configViewEngine(app);

app.use("/", webRoutes);
app.use("/v1/api", apiRoutes);

(async () => {
    await connection();
    app.listen(port, hostname, () => {
        console.log(`App listening on http://localhost:${port}`)
    })
})()



