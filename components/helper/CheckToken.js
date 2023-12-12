const jwt = require('jsonwebtoken');


const checkToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) { throw new Error("Không tìm thấy token") }
        jwt.verify(token, 'test', (err, decoded) => {
            if (err) { throw new Error("Token không hợp lệ") }
            req.user = decoded.user
            next()
        }
        )
    } catch (error) {
        return res.status(401).json({ status: false, message: error.message })
    }
}
module.exports = { checkToken }