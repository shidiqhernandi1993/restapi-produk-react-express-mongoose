const { ObjectId } = require("mongodb");
const db = require("../../config/mongodb");

const index = async (req, res) => {
  const { search } = req.query;

  if (search) {
    try {
      const products = await db.collection("products").find().toArray();
      const filteredProducts = products.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );

      res.status(200).json(filteredProducts);
    } catch (error) {
      res.status(400).json(error);
    }
  } else {
    try {
      const products = await db.collection("products").find().toArray();
      res.status(200).json(products);
    } catch (error) {
      res.status(400).json(error);
    }
  }
};

const view = async (req, res) => {
  const { id } = req.params;
  try {
    const products = await db
      .collection("products")
      .findOne({ _id: new ObjectId(id) });
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json(error);
  }
};

const store = async (req, res) => {
  const { name, price, stock, status } = req.body;

  if (!name || !price || !status || !stock) {
    res.status(400).json("Your input not complate!");
  }

  try {
    await db.collection("products").insertOne({
      name,
      price: Number(price),
      stock: Number(stock),
      status: Boolean(status),
    });
    res.status(201).json("product created!");
  } catch (error) {
    console.log(error);
  }
};

const update = async (req, res) => {
  const { name, price, stock, status } = req.body;
  const { id } = req.params;

  if (!name || !price || !status || !stock) {
    res.status(400).json("Your input not complate!");
  }

  try {
    await db.collection("products").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          name,
          price: Number(price),
          stock: Number(stock),
          status: Boolean(status),
        },
      }
    );
    res.status(201).json("product updated!");
  } catch (error) {
    console.log(error);
  }
};

const destroy = async (req, res) => {
  const { id } = req.params;
  try {
    await db.collection("products").deleteOne({ _id: new ObjectId(id) });
    res.status(201).json("product deleted!!");
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  index,
  view,
  store,
  update,
  destroy,
};
