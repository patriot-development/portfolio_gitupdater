//Initializing the environment variables.
require('dotenv').config();
const chalk = require('chalk');
import "core-js/stable";
import "regenerator-runtime/runtime";
//Importing packages.
const app = require('express')();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
app.set('trust proxy', true)

//Adding body-parser and cookie-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));
app.use(cookieParser())


//
app.post('/', (req, res) => {
    console.log(req.body.commits)
    console.log(req.body.commits[0].added)
    res.send('fak')
})
app.get('/', (req, res) => {
  res.send('Henlo ALenks')
})

//Starting the server
app.listen({ port: 9001 }, () => {
  console.log(chalk.black.bgGreen(`🚀 Server ready at http://localhost:9001 ✨`));
})