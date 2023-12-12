var express = require('express');
var router = express.Router();
const { checkToken } = require('../components/helper/CheckToken')

const upload = require('../components/helper/Upload')

/* GET home page. */
router.get('/tinhtoan/:test', function (req, res, next) {
  //param 
  const { test } = req.params;
  const { dai, rong } = req.query;
  const chuvi = 0;
  const dientich = 0;
  switch (test) {
    case "chuvi":
      chuvi = (Number(dai) + Number(rong) * 2)
      res.send("chuvi: " + chuvi);
      break;
    case "dientich":
      dientich = Number(dai) * Number(rong)
      res.send("Diện tích là " + dientich);
      break;
    default:
      break;
  }
});
router.post('/upload-file', [upload.single('image')], (req, res, next) => {
  console.log(req.file);
  res.json({ message: "Upload thành công" })

})

//test token
router.post('/test-token', checkToken, (req, res, next) => {
  res.json({ message: "Thành công" })
})

router.get('/verify/:token', function (req, res, next) {
  const { token } = req.params;

}
);

module.exports = router;
