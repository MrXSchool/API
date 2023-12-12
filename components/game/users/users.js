const fs = require('fs');
const Model = require('./model');
const OTP = require('./modelOTP');
const { sendMail } = require('../../helper/NodeMailer');
const { route } = require('../../../routes/gameAPI');


let htmlContent = fs.readFileSync(`D:\\New_World\\API\\web-api\\components\\helper\\vfmail.html`, 'utf-8');


const register = async (data) => {
    //{"email":"email","password":"password","username":"username","confirmPassword":"re pass"}
    try {

        console.log(data);
        const { email, username, password, confirmPassword } = data;
        if (password !== confirmPassword) {
            throw new Error("Password không khớp")
        }
        const user = await Model.findOne({ email });
        const fusername = await Model.findOne({ username: username })
        if (user) {
            throw new Error("Email đã tồn tại")
        }
        if (fusername) {
            throw new Error("Username đã tồn tại")
        }
        const newUser = new Model({
            email,
            username,
            password
        })

        await newUser.save();
        const genOTP = Math.floor(Math.random() * 9000) + 1000;
        const newOTP = new OTP({
            email, OTP: genOTP
        })

        await newOTP.save();
        htmlContent = htmlContent.replace('{{OTP}}', newOTP.OTP);
        setTimeout(() => {
            sendMail({ email, subject: 'Welcome', content: htmlContent })
        }
            , 0);
        delete newUser._doc.password;
        // newUser._doc.data = JSON.parse(newUser._doc.data);
        return newUser;
    } catch (error) {
        throw error;
    }

}

const login = async (data) => {
    const { email, password } = data;
    try {
        const user = await Model.findOne({ email }) || await Model.findOne({ username: email })
        if (!user) {
            console.log(data);
            throw new Error("Tài khoản không tồn tại")
        }
        if (user.password !== password) {
            throw new Error("Password không đúng")
        }
        delete user._doc.password;
        if (user._doc.data != null) user._doc.data = JSON.parse(user._doc.data);
        return user;
    } catch (error) {
        throw error;
    }
}

const saveGame = async (username, data) => {

    try {
        const user = await Model.findOne({ username });
        //paser data to string
        const newData = JSON.stringify(data);
        user.data = newData;
        await user.save();
        user._doc.data = JSON.parse(user._doc.data);
        return user;
    } catch (error) {
        throw error;
    }

}


const verify = async (email, otp) => {

    try {
        const VF = await OTP.findOne({ email: email });

        if (!VF) { throw new Error("Tài khoản này chưa bao giờ yêo cầu otp") }
        if (VF.confirm) { throw new Error("Tài khoản này đã xác thực") }
        if (parseInt(VF.OTP) != otp) { throw new Error("OTP không đúng") }
        //xem thời gian tạo otp có quá 5 phút không
        if (Date.now() - VF.timeCre > 300000) {
            throw new Error("OTP đã hết hạn!");
        }
        VF.confirm = true;
        VF.save();
        return true;
    } catch (error) {
        throw error;
    }

}

const reSendOTP = async (email) => {

    try {
        const VF = await OTP.findOne({ email: email });
        if (!VF) { throw new Error("Tài khoản này chưa bao giờ yêo cầu otp") }
        if (VF.confirm) { throw new Error("Tài khoản này đã xác thực") }
        const genOTP = Math.floor(Math.random() * 9000) + 1000;
        VF.OTP = genOTP;
        VF.timeCre = Date.now();
        await VF.save();
        htmlContent = htmlContent.replace('{{OTP}}', genOTP);
        setTimeout(() => {
            sendMail({ email, subject: 'Welcome', content: htmlContent })
        }
            , 0);
        return true;
    } catch (error) {
        throw error;
    }

}

const getUserById = async (id) => {
    try {
        const user = await Model.findById(id);
        if (!user) { throw new Error("Không tìm thấy user") }
        delete user._doc.password;
        if (user._doc.data != null) user._doc.data = JSON.parse(user._doc.data);
        return user;
    } catch (error) {
        throw error;
    }
}








module.exports = { register, login, saveGame, verify, reSendOTP, getUserById }