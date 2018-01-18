var express = require('express');
var router = express.Router();
var crop = require('../util/crop');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("Face Fusion Antiwatermarking Service.");
});

router.post('/', function(req, res, next) {
  console.log(req.files.image);
  crop.cropImage(req.files.image.data, function(err, data) {
    if (err) throw err;
    res.send(data);
  });
});

module.exports = router;
