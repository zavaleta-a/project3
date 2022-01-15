const db = require("./connection");
const { User, Parts, Category } = require("../models");

db.once("open", async () => {
  await Category.deleteMany();

  const categories = await Category.insertMany([
    { name: "Food" },
    { name: "Household Supplies" },
    { name: "Electronics" },
    { name: "Books" },
    { name: "Toys" },
  ]);

  console.log("categories seeded");

  await Parts.deleteMany();

  const products = await Parts.insertMany([
    {
      name: "Air Filter",
      description: "STP-Air-Filter for Toyota RAV4",
      image: "STP-Air-Filter.jpg",
      category: categories[0]._id,
      price: 15.99,
      quantity: 10,
    },
    {
      name: "Brake Pads",
      description: "Duralast-Brake-Pads-D1879.",
      image: "Duralast-Brake-Pads-D1879.jpg",
      category: categories[0]._id,
      price: 24.99,
      quantity: 20,
    },
    {
      name: "Oil Filter",
      category: categories[1]._id,
      description: "STP-Extended-Life-Oil-Filter-S2878XL.",
      image: "STP-Extended-Life-Oil-Filter-S2878XL.jpg",
      price: 9.99,
      quantity: 15,
    },
    {
      name: "Shock Absorber",
      category: categories[1]._id,
      description: "Rancho-RS9000XL-RS999355-Shock-Absorber.",
      image: "Rancho-RS9000XL-RS999355-Shock-Absorber.jpg",
      price: 129.99,
      quantity: 8,
    },
    {
      name: "Alternator",
      category: categories[1]._id,
      description: "Duralast-Alternator-14084",
      image: "Duralast-Alternator-14084.jpg",
      price: 164.99,
      quantity: 5,
    },
  ]);

  console.log("products seeded");

  await User.deleteMany();

  await User.create({
    firstName: "Pamela",
    lastName: "Washington",
    email: "pamela@testmail.com",
    password: "password12345",
    orders: [
      {
        products: [products[0]._id, products[0]._id, products[1]._id],
      },
    ],
  });

  await User.create({
    firstName: "Elijah",
    lastName: "Holt",
    email: "eholt@testmail.com",
    password: "password12345",
  });

  console.log("users seeded");

  process.exit();
});
