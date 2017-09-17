const sharp = require('sharp');
const query = require('micro-query');
const fetch = require('node-fetch');

const endpoint = async (req, res) => {
  const {u, w, t} = query(req);

  if (typeof u === 'undefined' || typeof w === 'undefined') {
    res.end('');
  } else {
    try {
      const response = await fetch(u.toString());
      const buffer = await response.buffer();
      const image = await sharp(buffer);
      const meta = await image.metadata();
      const format = t || meta.format;
      const output = await image.resize(Number(w))[format]().toBuffer();

      res.writeHead(200, {'content-type': `image/${format}`});
      res.end(output, 'binary');
    } catch (err) {
      console.error(err);
    }
  }
};

module.exports = endpoint;
