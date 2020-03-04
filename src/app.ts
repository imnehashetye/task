import * as express from "express";
import * as bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json());

app.use('/api/teams', require('./routes/teams'));

const PORT = process.env.PORT || 3001;
app.listen(PORT, function() {
    console.log('server connected', PORT);
});