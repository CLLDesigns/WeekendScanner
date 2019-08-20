const express = require('express')
const app = express()
const port = 3001
const bodyParser = require('body-parser')
const routes = require('./src/routes/index')

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
routes(app);

app.listen(port, () => console.log(`App listening on port ${port}!`))
