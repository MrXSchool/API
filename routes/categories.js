var express = require('express');
var router = express.Router();
const CategoryController = require('../components/categories/controller')
// http://localhost:8686/categories

/**
 * http://localhost:8686/categories
 * method: GET
 * lấy danh sách danh mục
 */

router.get("/", async (req, res, next) => {

    try {
        const categories = await CategoryController.getAll();
        return res.status(200).json(categories);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Có lỗi xảy ra" })
    }
})

/**
 * http://localhost:8686/categories/1
 * method: GET
 * lấy chi tiết 1 danh mục có id = 1
 */

router.get("/:id", async (req, res, next) => {
    const { id } = req.params;

    try {
        const categories = await CategoryController.getById(id);
        return res.status(200).json(categories);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Có lỗi xảy ra" })
    }
})

/**
 * http://localhost:8686/categories
 * method: POST
 * thêm mới 1 danh mục
 */

router.post("/", async (req, res, next) => {
    try {
        const categories = await CategoryController.addNewData(req.body);
        return res.status(200).json({ message: "Thêm thành công" });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Có lỗi xảy ra" })
    }
})

/**
 * http://localhost:8686/categories/1
 * method: PUT
 * sửa danh mục có id = 1
 */

router.put("/:param", async (req, res, next) => {
    const { param } = req.params;


    try {
        const categories = await CategoryController.editNewsById(param, req.body)
        return res.status(200).json({ message: "Sửa thành công" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Có lỗi xảy ra" })
    }
})

/**
 * http://localhost:8686/categories/1
 * method: DELETE
 * xóa danh mục có id = 1
 */
router.delete("/:param", async (req, res, next) => {
    const { param } = req.params;

    try {
        const categories = await CategoryController.deleteCategory(param);
        return res.status(200).json({ message: "Xóa thành công" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Có lỗi xảy ra" })
    }
})

module.exports = router;