const express = require('express');
const routerApi = require('./routes');
const {
  errorHandler,
  logErrors,
  boomErrorHandler,
} = require('./midlewares/errorHandler');

const app = express();
const port = 3001;
app.use(express.json());

routerApi(app);

//The middlewares of errors always are delcare before the routes and the position of the declare the middlewares aware for the next argument
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log('[AppRuningPORT]: ', port);
});
