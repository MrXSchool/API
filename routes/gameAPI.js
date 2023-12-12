var express = require('express');
var router = express.Router();
const gameController = require('../components/game/users/users');


router.post('/users/login', async (req, res, next) => {
    try {
        const user = await gameController.login(req.body);
        return res.status(200).json({ status: true, message: "Đăng nhập thành công", user: user });
    } catch (error) {
        console.log(error)
        return res.json({ status: false, message: error.message })
    }
})

router.post('/users/register', async (req, res, next) => {
    try {
        const user = await gameController.register(req.body);

        return res.status(200).json({ status: true, message: "Đăng ký thành công", user: user });
    } catch (error) {
        console.log(error)
        return res.json({ status: false, message: error.message })
    }
}
)

router.post('/users/saveGame/:username', async (req, res, next) => {
    try {
        const { username } = req.params;
        const user = await gameController.saveGame(username, req.body);
        return res.status(200).json({ status: true, message: "Lưu thành công", user: user });
    } catch (error) {
        console.log(error)
        return res.json({ status: false, message: error.message })
    }

}
)

router.get('/verify/:otp', async (req, res, next) => {
    try {

        const { otp } = req.params;
        const { email } = req.query;
        console.log("OTP: " + otp + " email: " + email)
        const veryfi = await gameController.verify(email, parseInt(otp));
        return res.json({ status: true, message: "Xác thực thành công" })
    } catch (error) {
        console.log(error)
        return res.json({ status: false, message: error.message })
    }


})

router.get('/reSendOTP/:email', async (req, res, next) => {
    try {
        const { email } = req.params;
        const user = await gameController.reSendOTP(email);
        return res.json({ status: true, message: "Gửi lại OTP thành công" })
    } catch (error) {
        console.log(error)
        return res.json({ status: false, message: error.message })
    }
})


//get data by id
router.get('/users/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await gameController.getUserById(id);
        return res.json({ status: true, message: "Lấy thông tin thành công", user: user })
    } catch (error) {
        console.log(error)
        return res.json({ status: false, message: error.message })
    }
})

module.exports = router

