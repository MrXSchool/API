var express = require('express');
var router = express.Router();
const upload = require('../components/helper/Upload')
// http://localhost:8686/

/**
 * http://localhost:8686/upload-file
 * method: POST
 * upload hình ảnh lên server
 */

router.post('/', [upload.single('image')], (req, res, next) => {
    if (req.file) {
        let Fistpath = req.file.path.replace(/\\/g, "/").substring(6)
        let path = "http://localhost:6969" + Fistpath

        res.json({ message: "Upload thành công", path })
    }
    else {
        res.json({ message: "Upload thất bại" })
    }

})



module.exports = router;