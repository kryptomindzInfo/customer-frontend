const argv = require('./argv');

//for local
//module.exports = parseInt(argv.port || process.env.PORT || '5001', 10);

//for server
module.exports = parseInt(argv.port || process.env.PORT || '5001', 10);
