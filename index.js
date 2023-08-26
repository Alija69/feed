const { port, env} = require('./src/config/vars');
const app = require('./src/config/express');

// listen to requests
app.listen(3003, () => console.info(`${env} server started on port ${port}`));

/**
 * Exports express
 * @public
 */
module.exports = app;
