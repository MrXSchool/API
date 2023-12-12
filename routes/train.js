var express = require('express');
var router = express.Router();
const Controller = require("../components/train/controller")


router.get("/get-players", async (req, res, next) => {

    try {
        const player = await Controller.test();
        res.json({ message: "lấy dữ liệu thành công", Player: player })
    } catch (error) {
        res.json({ message: error.message })
    }


})

router.post("/add-player", async (req, res, next) => {

    try {

        const player = await Controller.add(req.body);
        res.json({ message: "Thêm thành công", Player: player })
    } catch (error) {
        res.json({ message: error.message })
    }



})

module.exports = router;