import productModel from "../models/productModel.js";

interface ProductDto {
        title: string;
    image: string;
    price: number;
    stock: number;
}


export const getAllProduct = async () => {
   return await productModel.find();
    
}

export const seedProducts = async () => { 
    const products = [
        {
            title: "Laptop Pro 15",
            image: "https://picsum.photos/300/300?1",
            price: 35000,
            stock: 10,
        },
        {
            title: "Wireless Headphones",
            image: "https://picsum.photos/300/300?2",
            price: 2500,
            stock: 25,
        },
        {
            title: "Smart Watch",
            image: "https://picsum.photos/300/300?3",
            price: 4200,
            stock: 15,
        },
        {
            title: "Gaming Mouse",
            image: "https://picsum.photos/300/300?4",
            price: 1200,
            stock: 40,
        },
        {
            title: "Mechanical Keyboard",
            image: "https://picsum.photos/300/300?5",
            price: 2800,
            stock: 20,
        },
        {
            title: "4K Monitor",
            image: "https://picsum.photos/300/300?6",
            price: 9000,
            stock: 8,
        },
        {
            title: "External SSD 1TB",
            image: "https://picsum.photos/300/300?7",
            price: 6500,
            stock: 12,
        },
        {
            title: "Bluetooth Speaker",
            image: "https://picsum.photos/300/300?8",
            price: 1800,
            stock: 30,
        },
        {
            title: "Webcam HD",
            image: "https://picsum.photos/300/300?9",
            price: 1600,
            stock: 18,
        },
        {
            title: "Power Bank 20000mAh",
            image: "https://picsum.photos/300/300?10",
            price: 1400,
            stock: 35,
        },
    ];
    const allProducts = await getAllProduct();

    if (allProducts.length === 0) {
        await productModel.insertMany(products)
        
    }
}


 export const creatProduct = async (data: ProductDto) => {
    
    const newProduct = await new productModel(data);
    await newProduct.save();
    return { data: newProduct, statusCode: 201 };
    
}

const updateProduct = async (data: ProductDto) => {
    const findProduct = productModel.findByIdAndUpdate(data);
    if (!findProduct) {
        return {data:"product not found", statusCode:400}
    }
    return {data:findProduct,statusCode:200}
}
const deleteProduct = async (data: ProductDto) => {
    const findProduct = productModel.findByIdAndDelete(data);
    if (!findProduct) {
        return {data:"product not found", statusCode:400}
    }
    return {data:"product deleted successfully",statusCode:200}
}