const startServer = require('./src/app');
const io = require('./src/io');

const server = startServer();
io(server);
