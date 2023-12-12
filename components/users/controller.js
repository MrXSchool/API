const UserModel = require('./model')
const PasswordResetModel = require('./modelPR')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
//passnodemailer:dxmh ruiz nxar lhxq
const { sendMail } = require('../helper/NodeMailer')
const { checkToken } = require('../helper/CheckToken')
const { set } = require('mongoose')

const verifyMail = (user) => {
    return (`<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
</head>

<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">

    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">

        <h2 style="color: #333;">Verify Your Email Address</h2>

        <p style="color: #666;">Dear ${user.username ? user.username : user.email},</p>

        <p style="color: #666;">Thank you for signing up! To complete your registration, please click on the following link:</p>

        <a href="http://172.16.104.197:3000/verify/${user._id}" target="_blank" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #ffffff; text-decoration: none; border-radius: 5px; margin-top: 10px;">Verify Email Address</a>

        <p style="color: #666;">If you did not sign up for this account, please disregard this email.</p>
        <p style="color: #666;">This link will expire in 10 minutes.</p>
        <p style="color: #666;">Best regards,<br>Your Company Name</p>

    </div>

</body>

</html>`
    )
}
const forgotPasswordMail = (users, token) => {
    return (`<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Forgot Password</title>
</head>

<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">

    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">

        <h2 style="color: #333;">Reset Your Password</h2>

        <p style="color: #666;">Dear ${users.username},</p>

        <p style="color: #666;">You are receiving this email because you (or someone else) have requested to reset your password. Please click on the following link to reset your password:</p>

        <p><a href="http://localhost:3000/reset-password/${token}" style="color: #007bff; text-decoration: none;">Reset Password</a></p>

        <p style="color: #666;">If you did not request this password reset, please ignore this email.</p>

        <p style="color: #666;">Best regards,<br>Your Company Name</p>

    </div>

</body>

</html>
`
    )
}

const register = async (data) => {

    try {
        const { email, password, confirmPassword, username } = data;
        const check = await UserModel.findOne({ email })
        if (check) { console.log(check); throw new Error("Email đã tồn tại") }
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        const user = new UserModel({ email, password: hash, username })
        await user.save()
        setTimeout(() => {
            sendMail({ email, subject: 'Welcome', content: verifyMail(user) })
        }
            , 0);


    } catch (error) {

        console.log(error);
        throw new Error("Đã có lỗi xảy ra")
    }
}


const login = async (data) => {
    try {
        const { email, password } = data;
        const users = await UserModel.findOne({ email }) || await UserModel.findOne({ username: email })
        if (!users) { console.log(users); throw new Error("Không tìm thấy tài khoản") }
        const isMatch = bcrypt.compareSync(password, users.password);
        if (!isMatch) { throw new Error("Mật khẩu không đúng") }
        // generate token expire in 10m
        //delete password before generate token
        delete users._doc.password
        const token = jwt.sign({ user: users }, 'test', { expiresIn: 60 * 10 })
        return { user: users, token }

    } catch (error) {
        // console.log(error)
        // throw new Error("Có lỗi xảy ra khi đăng nhập")
        throw error

    }
}

//forgot password

const forgotPassword = async (email) => {
    try {
        const users = await UserModel.findOne({ email })
        if (!users) { return false }

        //tao token
        const token = jwt.sign(
            { _id: users._id, email: users.email },
            'test',
            { expiresIn: 60 * 10 }
        )
        // lưu token vào db passwordResetToken
        const passwordReset = new PasswordResetModel({ email, token })
        await passwordReset.save()

        //gửi mail
        setTimeout(() => {
            sendMail({ email, subject: 'Reset password', content: forgotPasswordMail(users, token) })
        }
            , 0);
        return true
    }
    catch (error) {
        throw error
    }

}

//verify email
const verify = async (id) => {
    try {
        const user = await UserModel.findById(id)
        if (!user) { throw new Error("Không tìm thấy tài khoản") }
        if (user.verified) { throw new Error("Tài khoản đã được xác thực") }
        user.verified = true
        await user.save()
        return true
    } catch (error) {
        return false
    }
}

//check token reset password
const checkTokenResetPassword = async (token) => {
    try {
        const decoded = jwt.verify(token, 'test')
        if (decoded) {
            const { email } = decoded;
            const passwordReset = await PasswordResetModel.findOne({
                email,
                token,
                status: true,
                createdAt: { $gte: new Date(Date.now() - 10 * 60 * 1000) }
            })
            if (passwordReset) { return true }
            return false
        }
        return false
    } catch (error) {
        return false
    }
}

//reset password
const resetPassword = async (token, password) => {
    try {
        const decoded = jwt.verify(token, 'test')
        if (!decoded) { throw new Error("Token không hợp lệ") }
        const { email } = decoded;
        const passwordReset = await PasswordResetModel.findOne({
            email,
            token,
            status: true,
            createdAt: { $gte: new Date(Date.now() - 10 * 60 * 1000) }
        })
        if (!passwordReset) { throw new Error("Token không hợp lệ") }
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        const user = await UserModel.findOne({ email })
        user.password = hash
        await user.save()
        //xóa token
        await PasswordResetModel.updateOne({ email, token }, { status: false })
        return true
    } catch (error) {
        throw error
    }
}



module.exports = { register, login, forgotPassword, verify, checkTokenResetPassword, resetPassword }