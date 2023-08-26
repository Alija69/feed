const { port} = require('./src/config/vars');
const app = require('./src/config/express');

// listen to requests
app.listen(3003, () => console.info(`server started on port ${port}`));

/**
 * Exports express
 * @public
 */
module.exports = app;
