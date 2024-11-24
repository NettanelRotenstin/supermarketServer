import ProductModel, { IProduct } from "../models/productModel";

export const addProduct = async (data: IProduct) => {
    try {
        const { name, img, price, quantity, description } = data
        const productInDB = await ProductModel.findOne({ name })
        if (productInDB) {
            productInDB.quantity += quantity
            productInDB.description = description
            productInDB.price = price
            productInDB.img = img
            await productInDB.save()
        }
        else {
            const newProduct = new ProductModel(data)
            await newProduct.save()
        }
    } catch {
        throw new Error('cant add product')
    }
}