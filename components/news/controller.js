const Model = require('./model')


const getAll = async (size, page) => {

    try {
        size = size ? parseInt(size) : 10;
        page = page ? parseInt(page) : 1;

        const skip = (page - 1) * size; // bỏ qua bao nhiêu sản phẩm đầu tiên
        console.log("Controller: " + "Size: " + size + " Page: " + page + " Skip: " + skip);
        const product = await Model.find().skip(skip).limit(size)
        return product
    } catch (error) {
        console.log(error);
        throw new Error("Đã có lỗi sảy ra")
    }
}

const getProductById = async (id) => {
    try {
        const product = await Model.findById(id)
        if (!product) { throw new Error("Không tìm thấy sản phẩm") }
        return product
    } catch (error) {
        throw new Error("Lây thông tin sản phẩ thất bại")
    }
}

const editProduct = async (id, data) => {

    try {
        const { name, price, quantity, description, image } = data
        const product = await Model.findById(id)
        if (!product) { throw new Error("Không tìm thấy sản phẩm") }
        product.name = name || product.name
        product.price = price || product.price
        product.quantity = quantity || product.quantity
        product.description = description || product.description
        product.image = image || product.image
        await product.save()
        return product
    } catch (error) {
        console.log(error);
        throw new Error("Sửa thông tin sản phẩm thất bại")
    }

}
const deleteProduct = async (id) => {

    try {
        const product = await Model.findByIdAndDelete(id)
        return product
    } catch (error) {
        throw new Error("Xóa thông tin sản phẩm thất bại")
    }

}

const addProduct = async (data) => {
    try {
        const { name, price, quantity, description, image, category_id } = data
        const product = new Model({ name, price, quantity, description, image, category_id })
        await product.save()
        return product
    } catch (error) {
        throw new Error("Thêm sản phẩm thất bại")
    }
}

module.exports = { getAll, getProductById, editProduct, deleteProduct, addProduct }