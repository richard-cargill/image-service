const sharp = require('sharp');
const query = require('micro-query');
const fetch = require('node-fetch');

const endpoint = async (req, res) => {
  const {u, w} = query(req);
  if (typeof u !== 'undefined' || typeof w !== 'undefined') {
    try {
      res.writeHead(200, {'content-type': 'image/png'});

      const response = await fetch(u.toString());
      const buffer = await response.buffer();
      const img = await sharp(buffer).resize(Number(w)).toBuffer();

      res.end(img, 'binary');
    } catch (err) {
      console.error(err);
    }
  } else {
    res.end();
  }
};

module.exports = endpoint;
