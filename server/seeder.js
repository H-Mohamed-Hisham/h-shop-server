import dotenv from "dotenv";

import products from "./sample-data/products.js";
// import users from "./data/users.js";
// import category from "./sample-data/category.js";

import Product from "./models/Product.js";
import Order from "./models/Order.js";
// import Category from "./models/Category.js";

import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    // await Product.deleteMany();
    // await Category.deleteMany();

    // const sampleCategory = category.map((category) => {
    //   return { ...category };
    // });

    // await Category.insertMany(sampleCategory);

    const sampleProducts = products.map((product) => {
      return {
        ...product,
        // createdAt: new Date().toISOString(),
        // updatedAt: new Date().toISOString(),
      };
    });

    await Product.insertMany(sampleProducts);

    console.log("Data Imported!");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    // await User.deleteMany();

    console.log("Data Destroyed!");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
