var express = require('express');
var router = express.Router();

const ProductControl = require('../components/news/controller')


// // lấy tất cả
// router.get('/', async (req, res, next) => {
//     try {
//         const products = await ProductControl.getAll()
//         return res.status(200).json(products)
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({ message: "Lỗi lấy danh sách sản phẩm" })
//     }
// })

//lấy theo trang và số lượng
router.get('/', async (req, res, next) => {
    try {
        const { size, page } = req.query;
        console.log("Size:" + size + " Page:" + page);
        const products = await ProductControl.getAll(size, page)
        return res.status(200).json(products)
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Lỗi lấy danh sách sản phẩm" })
    }
})

// lấy theo id
router.get('/:id', async (req, res, next) => {

    try {
        const product = await ProductControl.getProductById(req.params.id)
        return res.status(200).json(product)
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Lỗi lấy thông tin sản phẩm " + req.params.id })
    }

})

// thêm mới
router.post('/', async (req, res, next) => {
    try {
        const product = await ProductControl.addProduct(req.body)
        return res.status(200).json({ message: "Thêm sản phẩm thành công" })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Lỗi thêm sản phẩm" })
    }
})

// sửa
router.put('/:id', async (req, res, next) => {
    try {
        const product = await ProductControl.editProduct(req.params.id, req.body)
        return res.status(200).json(product)
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Lỗi sửa sản phẩm" })
    }
})

// xóa
router.delete('/:id', async (req, res, next) => {
    try {
        const product = await ProductControl.deleteProduct(req.params.id)
        return res.status(200).json({ message: "Xóa sản phẩm thành công" })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Lỗi xóa sản phẩm" })
    }
})


module.exports = router;