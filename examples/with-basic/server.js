const { Server } = require('aphid-server');

const app = new Server({ dev: true });

app.prepare().then(() => {});
