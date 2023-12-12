const CategoryModel = require('./model');
const ProductModel = require('../news/model');

const getAll = async () => {
    try {
        const categories = await CategoryModel.find({});
        return categories;
    }
    catch (error) {
        console.log('error', error);
        throw new Error("error");
    }
}

const getById = async (id) => {
    try {
        const categories = await CategoryModel.findById(id)
        if (!categories) {
            throw new Error("Không tìm thấy danh mục")
        }
        return categories;
    }
    catch (error) {
        console.log('error', error);
        throw new Error("error");
    }
}

const addNewData = async (data) => {
    try {
        const { name, description } = data;
        const categories = new CategoryModel({ name, description })
        await categories.save();
    }
    catch (error) {
        console.log('error', error);
        throw new Error("error");
    }
}

const editNewsById = async (id, body) => {
    try {
        const { name, description } = body
        const categories = await CategoryModel.findById(id)
        if (categories) {
            categories.name = name || categories.name
            categories.description = description || categories.description
            await categories.save()
        }
        else {
            throw new Error("Khong tim thay")
        }
    } catch (error) {
        throw new Error("loi")
    }
}

const deleteCategory = async (id) => {
    try {
        const categories = await CategoryModel.findById(id)
        if (categories) {
            //kiểm tra xem danh mục có sản phẩm nào không
            const products = await ProductModel.find({ category_id: id })
            if (products.length > 0) {
                throw new Error("Danh mục này có sản phẩm, không thể xóa")
            }
            await categories.deleteOne();
        }
        else {
            throw new Error("Không tìm thấy danh mục")
        }
    } catch (error) {
        console.log(error);
        throw new Error("Có lỗi xảy ra")
    }
}

module.exports = { getAll, getById, addNewData, editNewsById, deleteCategory }