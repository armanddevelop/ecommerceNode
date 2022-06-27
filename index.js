const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');
const {
  errorHandler,
  logErrors,
  boomErrorHandler,
} = require('./midlewares/errorHandler');

const app = express();
const port = process.env.PORT || 3001;
app.use(express.json());

const whitelist = ['http:localhost:3001', 'http://127.0.0.1:5500'];
const options = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) >= 0 || !origin) return callback(null, true);
    callback(new Error(`Not allowed domain ${origin}`));
  },
};
app.use(cors(options));

routerApi(app);

//The middlewares of errors always are delcare before the routes and the position of the declare the middlewares aware for the next argument
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log('[AppRuningPORT]: ', port);
});
