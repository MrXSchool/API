var express = require('express');
var router = express.Router();
// http://localhost:8686/news

/**
 * http://localhost:8686/news
 * method: GET
 * lấy danh sách bài viết
 *  */

router.get("/", function (req, res, next) {
    res.send(req.headers.authorization)


})

/**
 * http://localhost:8686/news/search?keyword=abc
 * method: GET
 * tìm kiếm các bài viết có chứa từ khóa
 *  */
router.get("/search", function (req, res, next) {
    const { keyword } = req.query;

    res.send(keyword);
})

/**
 * http://localhost:8686/news/1
 * method: GET
 * lấy chi tiết bài viết có id = 1
 */

router.get("/:params", function (req, res, next) {
    const { params } = req.params

    res.send(params);
})


/**
 * http://localhost:8686/news
 * method: POST
 * thêm mới 1 bài viết
 */

router.post("/", function (req, res, next) {
    const { title, content, image } = req.body;

    res.json({ title, content, image });
})


/**
 * http://localhost:8686/news/1
 * method: PUT
 * cập nhật bài viết có id = 1
*/

router.put("/:params", function (req, res, next) {
    const { params } = req.params;

    const { title, content, image } = req.body;

    res.json({ params, title, content, image });

})

/**
 * http://localhost:8686/news/1
 * method: DELETE
 * xóa bài viết có id = 1
 */

router.delete("/:params", function (req, res, next) {
    const { params } = req.params;

    res.send(params);
})

module.exports = router;