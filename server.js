const { createServer } = require('https');
const { parse } = require('url');
const next = require('next');
const fs = require('fs');
const path = require('path');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const certsDir = path.join(__dirname, 'certs');
const options = {
  key: fs.readFileSync(path.join(certsDir, 'localhost-key.pem')),
  cert: fs.readFileSync(path.join(certsDir, 'localhost.pem')),
};

app.prepare().then(() => {
  createServer(options, (req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on https://web.cynx.buzz:3000');
  });
});