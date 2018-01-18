const url = require('url');
const http = require('http');

const sharp = require('sharp');
const sizeOf = require('image-size');

// image cropping parameters
const WIDTH_CROP_RATIO = 0.9;
const HEIGHT_CROP_RATIO = 0.82;

exports.cropImage = (imageUrl, callback) => {
  http.get(url.parse(imageUrl), response => {
    var chunks = [];
    response.on('data', chunk => {
      chunks.push(chunk);
    }).on('end', () => {
      const buffer = Buffer.concat(chunks);

      // get the demensions of the original image
      const origDimensions = sizeOf(buffer);

      // calculate the width and height of the cropped image
      const croppedWidth = Math.round(origDimensions.width * WIDTH_CROP_RATIO);
      const croppedHeight = Math.round(origDimensions.height * HEIGHT_CROP_RATIO);

      sharp(buffer)
        .resize(croppedWidth, croppedHeight)
        .crop(sharp.gravity.north)
        .toBuffer()
        .then(data => callback(null, data))
        .catch(err => callback(err));
    });
  });
};
