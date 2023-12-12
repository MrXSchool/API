var express = require('express');
var router = express.Router();

const UserController = require('../components/users/controller')
// http://localhost:8686/users

/**
 * http://localhost:8686/users/login
 * method: POST
 * đăng nhập bằng email và password
 */

router.post("/login", async (req, res, next) => {
    try {
        const user = await UserController.login(req.body)
        return res.status(200).json({ status: true, data: user });
    } catch (error) {
        console.log('>>>>>>>>>>>>>>>>' + error);
        return res.status(500).json({ status: false, error: error.message });
    }
})

/**
 * http://localhost:8686/users/register
 * method: POST
 * đăng ký bằng email và password
 */

const validate = (req, res, next) => {
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    const { email, password, confirmPassword } = req.body
    if (email.match(regexEmail)) {
        if (password == confirmPassword) {
            next();
        }
        else {
            return res.json({ message: "Mật khẩu không trùng khớp!" })
        }
    }
    else {
        return res.json({ message: "Email không đúng định dạng" })
    }


}
router.post("/register", [validate], async (req, res, next) => {

    try {
        await UserController.register(req.body)
        const data = req.body
        return res.status(200).json({ status: true })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: false, message: error.message })
    }
})

/**
 * http://localhost:8686/users/update-profile
 * method: POST
 * cập nhật thông tin cá nhân
 */
router.post("/update-profile", function (req, res, next) {
    const { name, address, phone, avatar, dob } = req.body

    if (req.body != null) {
        res.send(req.body)
    }
    else {
        res.send("Null")
    }
})

/**
 * http://localhost:8686/users/logout
 * method: GET
 * thoát tài khoản
 */
router.get("/logout", function (req, res, next) {
    res.send("Oke")
})

/**
 * http://localhost:8686/users/change-password
 * method: POST
 * cập nhật mật khẩu
 */

router.post("/change-password", function (req, res, next) {
    const { password } = req.body

    if (req.body != null) {
        res.send(req.body)
    }
    else {
        res.send("Null")
    }
})

/**
 * http://localhost:8686/users/forgot-password
 * method: POST
 * quên mật khẩu
 */

router.post("/forgot-password", async (req, res, next) => {
    const { email } = req.body
    try {
        const user = await UserController.forgotPassword(email)
        return res.status(200).json({ status: true });
    } catch (error) {
        console.log('>>>>>>>>>>>>>>>>' + error);
        return res.status(500).json({ status: false, error: error.message });
    }
}
)


/**
 * http://localhost:8686/users/verify/:token
 * method: GET
 * xác thực email
 */
router.get("/verify/:id", async (req, res, next) => {
    const { id } = req.params
    try {
        const result = await UserController.verify(id)
        if (result) { return res.status(200).json({ status: true }) }
        return res.status(500).json({ status: false })
    } catch (error) {
        return res.status(500).json({ status: false })
    }
}
)

/**
 * http://localhost:8686/users/check-token-reset-password/:token
 * method: GET
 * kiểm tra token reset password
 */

router.get("/check-token-reset-password/:token", async (req, res, next) => {
    const { token } = req.params
    try {
        const result = await UserController.checkTokenResetPassword(token)
        return res.status(200).json({ status: true, email: result.email })
    } catch (error) {
        return res.status(500).json({ status: false })
    }
}
)

/**
 * http://localhost:8686/users/reset-password
 * method: POST
 * reset password
 */

router.post("/reset-password", async (req, res, next) => {
    const { token, password } = req.body
    try {
        const result = await UserController.resetPassword(token, password)
        return res.status(200).json({ status: true })
    } catch (error) {
        return res.status(500).json({ status: false })
    }
}
)

module.exports = router;